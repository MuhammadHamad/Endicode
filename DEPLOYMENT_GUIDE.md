# 🚀 Production Deployment Guide - Endicode

This guide will walk you through deploying your Endicode project to production using Vercel's free tier with your custom Beehost domain.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ A Vercel account (free tier)
- ✅ Your Beehost domain credentials
- ✅ A Resend account (free tier - 100 emails/day)
- ✅ Git installed on your computer
- ✅ Your project pushed to GitHub/GitLab/Bitbucket

---

## 🎯 Step-by-Step Deployment Process

### **Phase 1: Set Up Email Service**

#### Step 1.1: Create Resend Account
1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address
3. You'll get **100 free emails per day** - perfect for contact forms!

#### Step 1.2: Get Your API Key
1. In Resend dashboard, go to **"API Keys"**
2. Click **"Create API Key"**
3. Give it a name (e.g., "Endicode Production")
4. Click **"Add"**
5. **Copy the API key** (starts with `re_`) - you'll need it for Vercel
6. **Save it securely** - you won't be able to see it again!

#### Step 1.3: Add Your Domain (Optional but Recommended)
1. In Resend, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow the DNS verification steps
5. Once verified, you can send emails from `noreply@yourdomain.com`

**For now, you can skip Step 1.3 and use the default `onboarding@resend.dev` sender**

---

### **Phase 2: Deploy to Vercel**

#### Step 2.1: Connect Your Repository to Vercel
1. Go to [vercel.com](https://vercel.com) and login
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository:
   - Click **"Import Git Repository"**
   - Select your repository (GitHub/GitLab/Bitbucket)
   - Click **"Import"**

#### Step 2.2: Configure Build Settings
Vercel should auto-detect your settings, but verify:
- **Framework Preset:** Other
- **Build Command:** `npm run vercel-build`
- **Output Directory:** `dist/public`
- **Install Command:** `npm install`

#### Step 2.3: Add Environment Variables
1. In the project configuration, scroll to **"Environment Variables"**
2. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `RESEND_API_KEY` | Your Resend API key (starts with `re_`) | Production |
   | `CONTACT_EMAIL` | Your email where you want to receive contact form submissions | Production |
   | `RESEND_FROM_EMAIL` | `onboarding@resend.dev` (or your verified domain email) | Production |
   | `NODE_ENV` | `production` | Production |

3. Click **"Add"** for each variable
4. Click **"Deploy"**

#### Step 2.4: Wait for Deployment
- Vercel will build and deploy your project (takes 2-5 minutes)
- You'll see a success message with a URL like: `your-project.vercel.app`
- Click the URL to verify your site works
- **Test the contact form** to make sure emails are being sent!

---

### **Phase 3: Connect Your Beehost Domain**

#### Step 3.1: Add Domain in Vercel
1. In your Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `yourdomain.com`)
4. Click **"Add"**
5. Vercel will show you DNS records to configure

#### Step 3.2: Configure DNS in Beehost
1. Login to your **Beehost control panel**
2. Navigate to **"Domain Management"** or **"DNS Settings"**
3. Find your domain and click **"Manage DNS"** or **"DNS Zone Editor"**

#### Step 3.3: Add DNS Records
Add these records in Beehost:

**For Root Domain (yourdomain.com):**
- **Type:** A Record
- **Name/Host:** `@` (or leave blank)
- **Value/Points to:** `76.76.21.21`
- **TTL:** 3600 (or default)

**For WWW Subdomain (www.yourdomain.com):**
- **Type:** CNAME Record
- **Name/Host:** `www`
- **Value/Points to:** `cname.vercel-dns.com`
- **TTL:** 3600 (or default)

4. **Save** the DNS records

#### Step 3.4: Verify Domain in Vercel
1. Go back to Vercel → **"Settings"** → **"Domains"**
2. Wait for the domain status to change from "Invalid Configuration" to "Valid Configuration"
   - This can take **5 minutes to 48 hours** (usually 10-30 minutes)
3. Once verified, Vercel will automatically provision an SSL certificate

---

### **Phase 4: Final Checks**

#### Step 4.1: Test Your Website
1. Visit your domain: `https://yourdomain.com`
2. Check that it loads correctly
3. **Test the contact form** - submit a test message
4. Check your email inbox for the notification
5. Verify all pages work

#### Step 4.2: Force HTTPS
1. In Vercel, go to **"Settings"** → **"Domains"**
2. Ensure **"Redirect to HTTPS"** is enabled (should be automatic)

---

## 🔄 Updating Your Production Site

Whenever you make changes:
1. Commit your changes to Git:
   ```powershell
   git add .
   git commit -m "Your update message"
   git push
   ```
2. Vercel will **automatically** rebuild and deploy your site
3. Changes will be live in 2-5 minutes

---

## 🛠️ Troubleshooting

### Domain Not Working?
- **Wait longer:** DNS propagation can take up to 48 hours
- **Check DNS:** Use [whatsmydns.net](https://www.whatsmydns.net) to verify DNS propagation
- **Clear cache:** Clear your browser cache or try incognito mode

### Build Failing?
- Check Vercel build logs in the **"Deployments"** tab
- Verify all environment variables are set correctly
- Ensure your code builds locally: `npm run build`

### Contact Form Not Sending Emails?
- Verify `RESEND_API_KEY` is correct in Vercel environment variables
- Check Resend dashboard for error logs
- Make sure you haven't exceeded the free tier limit (100 emails/day)
- Verify `CONTACT_EMAIL` is a valid email address

### SSL Certificate Not Working?
- Wait 10-15 minutes after domain verification
- Ensure DNS records are correct
- Contact Vercel support if issue persists after 24 hours

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **DNS Help:** Check Beehost support documentation

---

## ✅ Deployment Checklist

Use this checklist to track your progress:

- [ ] Created Resend account
- [ ] Copied Resend API key
- [ ] Connected repository to Vercel
- [ ] Added environment variables
- [ ] First deployment successful
- [ ] Tested contact form (received email)
- [ ] Added domain in Vercel
- [ ] Configured DNS in Beehost
- [ ] Domain verified in Vercel
- [ ] SSL certificate active
- [ ] Website accessible via custom domain
- [ ] Contact form tested on live domain

---

## 🎉 Congratulations!

Your Endicode website is now live in production with your custom domain!

**Your site is accessible at:**
- `https://yourdomain.com`
- `https://www.yourdomain.com`

**Contact form submissions will be sent to:** `your-email@example.com`
