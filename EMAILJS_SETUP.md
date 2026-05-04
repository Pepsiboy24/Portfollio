# EmailJS Setup Guide

Your contact form is now integrated with EmailJS for real email functionality! Follow these steps to activate it:

## Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account
5. Note your **Service ID** (it will look like: `service_xxxxxxxxx`)

## Step 3: Create an Email Template
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact Form Message from {{from_name}}

**Message Content:**
```
Hello {{to_name}},

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

Please reply to {{from_email}} at your convenience.

Best regards,
Portfolio Contact Form
```

4. Save the template and note your **Template ID** (it will look like: `template_xxxxxxxxx`)

## Step 4: Get Your Public Key
1. Go to "Account" → "API Keys" in EmailJS dashboard
2. Copy your **Public Key** (it will look like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

## Step 5: Update Your JavaScript
Open `script.js` and replace these placeholders:

```javascript
// In initializeEmailJS function
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

// In initializeContactForm function
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace with:
```javascript
// In initializeEmailJS function
emailjs.init("your_actual_public_key_here");

// In initializeContactForm function  
emailjs.send('your_actual_service_id', 'your_actual_template_id', templateParams)
```

## Step 6: Test Your Form
1. Open your portfolio website
2. Fill out the contact form with real information
3. Click "Send Message"
4. Check your email inbox for the message!

## Free Plan Limits
EmailJS free plan includes:
- **200 emails per month**
- **2 email services**
- **Unlimited templates**
- **No credit card required**

## Troubleshooting
- **"Failed to send message"**: Check your Service ID, Template ID, and Public Key
- **No email received**: Check your spam folder
- **API errors**: Ensure your template variables match exactly (`{{from_name}}`, `{{from_email}}`, etc.)

## Security Notes
- Your Public Key is safe to expose in frontend code
- EmailJS handles the secure email delivery
- No backend server required!

That's it! Your contact form will now send real emails to your inbox. 🎉
