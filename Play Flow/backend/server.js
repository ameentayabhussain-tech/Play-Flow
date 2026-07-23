require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const feedbackFilePath = path.join(__dirname, 'feedbacks.json');

function loadFeedbacks() {
    if (!fs.existsSync(feedbackFilePath)) {
        fs.writeFileSync(feedbackFilePath, '[]', 'utf8');
    }

    try {
        return JSON.parse(fs.readFileSync(feedbackFilePath, 'utf8') || '[]');
    } catch (error) {
        console.error('Unable to parse feedback file:', error);
        return [];
    }
}

function saveFeedbacks(feedbacks) {
    fs.writeFileSync(feedbackFilePath, JSON.stringify(feedbacks, null, 2), 'utf8');
}

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Test email connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.log('Email configuration error:', error);
    } else {
        console.log('✓ Email service ready');
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date() });
});

// Feedback list endpoint
app.get('/api/feedbacks', (req, res) => {
    try {
        const feedbacks = loadFeedbacks();
        const publicFeedbacks = feedbacks.map(({ id, name, rating, message, createdAt }) => ({
            id,
            name,
            rating,
            message,
            createdAt
        }));
        res.json({ success: true, feedbacks: publicFeedbacks });
    } catch (error) {
        console.error('Error loading feedbacks:', error);
        res.status(500).json({ success: false, error: 'Unable to load feedback list.' });
    }
});

// Feedback submission endpoint
app.post('/api/feedback', async (req, res) => {
    try {
        const { name, email, rating, message } = req.body;

        // Validation
        if (!name || !rating || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name, rating, and message are required.' 
            });
        }

        if (email && typeof email === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Please provide a valid email address if included.' 
            });
        }

        if (message.length < 10) {
            return res.status(400).json({ 
                success: false, 
                error: 'Feedback must be at least 10 characters' 
            });
        }

        const feedbackEntry = {
            id: Date.now(),
            name,
            rating: Number(rating),
            message,
            email: email || null,
            createdAt: new Date().toISOString()
        };

        const feedbacks = loadFeedbacks();
        feedbacks.unshift(feedbackEntry);
        saveFeedbacks(feedbacks);

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL || 'support@playflow.com',
            subject: `New Play Flow Feedback from ${name} (${rating}⭐)`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #45f3ff;">New Feedback Submission</h2>
                    <hr style="border: 1px solid #22272d;">
                    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
                    <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
                    <hr style="border: 1px solid #22272d;">
                    <h3>Message:</h3>
                    <p style="background: #16181c; padding: 15px; border-radius: 8px; color: #c5c6c7;">
                        ${escapeHtml(message).replace(/\n/g, '<br>')}
                    </p>
                    <hr style="border: 1px solid #22272d;">
                    <p style="font-size: 12px; color: #999;">
                        Submitted: ${new Date().toLocaleString()}
                    </p>
                </div>
            `
        };

        // Email to user (confirmation), only if address was provided
        if (email) {
            const userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'We received your feedback - Play Flow',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #45f3ff;">Thank You for Your Feedback!</h2>
                        <p>Hi ${escapeHtml(name)},</p>
                        <p>We have received your feedback and really appreciate you taking the time to share your thoughts with us.</p>
                        <p>Our team will review your message and get back to you if needed.</p>
                        <hr style="border: 1px solid #22272d;">
                        <p style="color: #999; font-size: 12px;">
                            If you have any questions, feel free to reply to this email.
                        </p>
                        <p style="color: #999; font-size: 12px;">
                            © 2026 Play Flow Media. All rights reserved.
                        </p>
                    </div>
                `
            };

            await transporter.sendMail(userMailOptions);
        }

        // Send admin email separately since user may not be available.
        await transporter.sendMail(adminMailOptions);

        console.log(`✓ Feedback received from ${name} (${email})`);

        res.json({ 
            success: true, 
            message: 'Thank you! Your feedback has been sent successfully.' 
        });

    } catch (error) {
        console.error('Error sending feedback:', error);
        res.status(500).json({ 
            success: false, 
            error: 'An error occurred while sending your feedback. Please try again later.' 
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Play Flow Feedback Server running on port ${PORT}`);
    console.log(`📧 Admin email: ${process.env.ADMIN_EMAIL || 'support@playflow.com'}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

// Utility function to escape HTML
function escapeHtml(text) {
    if (text == null) {
        return '';
    }

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}
