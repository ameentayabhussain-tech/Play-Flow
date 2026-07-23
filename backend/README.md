# Play Flow Feedback Backend

A simple Node.js/Express backend server for handling Play Flow app feedback submissions via email.

## 📋 Features

- ✅ Receives feedback from your website
- ✅ Sends confirmation email to user
- ✅ Sends notification email to admin
- ✅ Built-in validation and error handling
- ✅ CORS enabled for frontend integration
- ✅ HTML formatted emails

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

Edit `.env` with your email credentials:

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@playflow.com
PORT=3000
```

### 3. Get Gmail App Password (If Using Gmail)

1. Enable 2-Factor Authentication on your Google Account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the 16-character password
5. Paste it in `.env` as `EMAIL_PASSWORD`

**Note:** Gmail app passwords work only with 2FA enabled.

### 4. Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
🚀 Play Flow Feedback Server running on port 3000
📧 Admin email: admin@playflow.com
⚙️  Environment: development
```

### 5. Test the Server

```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rating": 5,
    "message": "Great app! Love the interface."
  }'
```

## 📝 API Endpoints

### POST `/api/feedback`

Submit feedback from your website.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "rating": 5,
  "message": "Your feedback here..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you! Your feedback has been sent successfully."
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

### GET `/api/health`

Check server status.

**Response:**
```json
{
  "status": "Server is running",
  "timestamp": "2026-07-22T10:30:00.000Z"
}
```

## 🌐 Frontend Integration

Update your `index.html` to point to your backend:

```javascript
async function handleFeedbackSubmit(event) {
    event.preventDefault();
    const messageDiv = document.getElementById('feedbackMessage');
    
    const feedbackData = {
        name: document.getElementById('feedbackName').value,
        email: document.getElementById('feedbackEmail').value,
        rating: document.getElementById('feedbackRating').value,
        message: document.getElementById('feedbackMessage').value
    };
    
    try {
        const response = await fetch('http://localhost:3000/api/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(feedbackData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            messageDiv.textContent = '✓ ' + data.message;
            messageDiv.classList.add('success');
            document.getElementById('feedbackForm').reset();
        } else {
            messageDiv.textContent = '✗ ' + data.error;
            messageDiv.classList.add('error');
        }
    } catch (error) {
        messageDiv.textContent = '✗ Network error. Please try again.';
        messageDiv.classList.add('error');
    }
}
```

## 🔧 Deployment Options

### Option 1: Heroku (Free)
```bash
heroku create playflow-feedback
git push heroku main
```

### Option 2: Railway.app
1. Push code to GitHub
2. Connect repository to Railway
3. Set environment variables in Railway dashboard

### Option 3: DigitalOcean / AWS
Deploy like any Node.js app with proper environment configuration.

### Option 4: Render.com
1. Connect your GitHub repo
2. Set up as Web Service
3. Add environment variables

## 📧 Email Provider Alternatives

If Gmail doesn't work, you can use:

**SendGrid:**
```javascript
// Replace nodemailer with SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
```

**AWS SES, Mailgun, or SendinBlue** also supported.

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep `EMAIL_PASSWORD` confidential
- Validate all inputs on both frontend and backend
- Use HTTPS in production
- Implement rate limiting for production

## 🐛 Troubleshooting

**Email not sending?**
- Check EMAIL_USER and EMAIL_PASSWORD in `.env`
- Verify email service credentials are correct
- Check "Less secure app access" settings if using Gmail

**CORS errors?**
- Add your frontend URL to CORS whitelist in `server.js`

**Port already in use?**
- Change PORT in `.env` to another number like 3001

## 📞 Support

For issues with:
- **Nodemailer:** Check [nodemailer.com](https://nodemailer.com)
- **Express:** Check [expressjs.com](https://expressjs.com)
- **Gmail:** Enable 2FA and get app password

## 📄 License

MIT

---

**Made for Play Flow** 🎬🎵
