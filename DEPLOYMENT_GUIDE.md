# 🚀 Production Deployment Guide - Endicode

This guide will walk you through deploying your Endicode project to production using Vercel's free tier with your custom Beehost domain.

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ A Vercel account (free tier)
- ✅ Your Beehost domain credentials
- ✅ A Neon Database account (for PostgreSQL)
- ✅ Git installed on your computer
- ✅ Your project pushed to GitHub/GitLab/Bitbucket

---

## 🎯 Step-by-Step Deployment Process

### **Phase 1: Prepare Your Database**

#### Step 1.1: Create Neon Database
1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click **"Create a project"**
3. Choose a project name (e.g., "endicode-production")
4. Select the **free tier** region closest to your users
5. Click **"Create project"**

#### Step 1.2: Get Database Connection String
1. In your Neon dashboard, click on your project
2. Find the **"Connection string"** section
3. Copy the connection string (it looks like: `postgresql://user:password@host/database`)
4. **Save this securely** - you'll need it for Vercel

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
   | `DATABASE_URL` | Your Neon connection string | Production |
   | `SESSION_SECRET` | Generate a random 32+ character string | Production |
   | `NODE_ENV` | `production` | Production |

   **To generate a secure SESSION_SECRET:**
   - Open PowerShell and run:
     ```powershell
     -join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
     ```

3. Click **"Add"** for each variable
4. Click **"Deploy"**

#### Step 2.4: Wait for Deployment
- Vercel will build and deploy your project (takes 2-5 minutes)
- You'll see a success message with a URL like: `your-project.vercel.app`
- Click the URL to verify your site works

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
3. Test the contact form
4. Verify all pages work

#### Step 4.2: Force HTTPS
1. In Vercel, go to **"Settings"** → **"Domains"**
2. Ensure **"Redirect to HTTPS"** is enabled (should be automatic)

#### Step 4.3: Setup Database Schema
Run this command locally to push your database schema to Neon:
```powershell
npm run db:push
```

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

### Database Connection Issues?
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check Neon database is active and not suspended
- Ensure database schema is pushed: `npm run db:push`

### SSL Certificate Not Working?
- Wait 10-15 minutes after domain verification
- Ensure DNS records are correct
- Contact Vercel support if issue persists after 24 hours

---

## 📞 Need Help?

- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Neon Docs:** [neon.tech/docs](https://neon.tech/docs)
- **DNS Help:** Check Beehost support documentation

---

## ✅ Deployment Checklist

Use this checklist to track your progress:

- [ ] Created Neon database
- [ ] Copied database connection string
- [ ] Connected repository to Vercel
- [ ] Added environment variables
- [ ] First deployment successful
- [ ] Added domain in Vercel
- [ ] Configured DNS in Beehost
- [ ] Domain verified in Vercel
- [ ] SSL certificate active
- [ ] Website accessible via custom domain
- [ ] Contact form tested
- [ ] Database schema pushed

---

## 🎉 Congratulations!

Your Endicode website is now live in production with your custom domain!

**Your site is accessible at:**
- `https://yourdomain.com`
- `https://www.yourdomain.com`
