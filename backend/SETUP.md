# 🚀 Backend Setup Guide for Play Flow

## Step-by-Step Installation

### Step 1: Install Node.js
Download from [nodejs.org](https://nodejs.org) (LTS version recommended)

### Step 2: Navigate to Backend Folder
```bash
cd "i:\Ready apps\Play Flow\backend"
```

### Step 3: Install Dependencies
```bash
npm install
```

This will install:
- `express` - web framework
- `nodemailer` - email sending
- `cors` - cross-origin requests
- `dotenv` - environment variables

### Step 4: Set Up Gmail (5 minutes)

1. **Enable 2-Factor Authentication:**
   - Go to [myaccount.google.com/security](https://myaccount.google.com/security)
   - Enable 2-Step Verification if not already enabled

2. **Get App Password:**
   - Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Select "Mail" 
   - Select "Windows Computer"
   - Google will generate a 16-character password
   - Copy this password

3. **Create `.env` file:**
   - Copy `.env.example` to `.env`
   - Edit `.env` and replace:
     - `EMAIL_USER=` with your Gmail address
     - `EMAIL_PASSWORD=` with the 16-character password you just copied
     - `ADMIN_EMAIL=` with where you want to receive feedback

### Step 5: Start the Server

**Option A: Normal mode**
```bash
npm start
```

**Option B: Development mode (auto-reload on changes)**
```bash
npm run dev
```

You should see:
```
🚀 Play Flow Feedback Server running on port 3000
📧 Admin email: your-email@gmail.com
⚙️  Environment: development
```

### Step 6: Test It Works

Open your terminal and run:

```bash
curl -X POST http://localhost:3000/api/feedback ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test\",\"email\":\"test@example.com\",\"rating\":5,\"message\":\"This is a test feedback message.\"}"
```

You should receive two emails:
- ✅ Confirmation email at your feedback email
- ✅ Admin notification at ADMIN_EMAIL

### Step 7: Keep Server Running

Keep this terminal window open while using your website. The server must be running for feedback to work.

---

## 🔧 Configuration

### Change Port Number

Edit `.env`:
```
PORT=3001
```

### Use Different Email Service

Instead of Gmail, you can use:
- Outlook
- Yahoo Mail
- SendGrid
- Mailgun

Ask me to help if needed!

### Change Admin Email

Edit `.env`:
```
ADMIN_EMAIL=newemail@example.com
```

---

## ✅ Verify Setup

Test with a curl command or by:
1. Open http://localhost:3000/api/health
2. Should see: `{"status":"Server is running","timestamp":"..."}`

---

## 📍 Frontend URL Configuration

If your website is hosted on a different URL (not localhost), update:

In `index.html`, find this line in the JavaScript:
```javascript
fetch('http://localhost:3000/api/feedback', {
```

Change to your server's URL:
```javascript
fetch('https://your-server.com:3000/api/feedback', {
```

---

## 🆘 Troubleshooting

### "npm: command not found"
→ Node.js not installed. Download from nodejs.org

### "Port 3000 already in use"
→ Change PORT in .env to 3001, 3002, etc.

### "Email not sending"
→ Check:
- Gmail 2FA is enabled
- App password is 16 characters
- EMAIL_USER and EMAIL_PASSWORD are correct in .env
- Try a different email service

### "Cannot GET /"
→ Normal! The server only handles `/api/feedback` and `/api/health` endpoints

---

## 📦 Deployment (Later)

When ready to go live, deploy to:
- **Heroku** (free tier available)
- **Railway.app**
- **Render.com**
- **AWS / DigitalOcean**

See `backend/README.md` for deployment instructions.

---

**Setup complete! Your feedback system is now ready!** 🎉
