# 👋 Your Personal Step-by-Step Deployment Walkthrough

I'll hold your hand through every single step. Let's deploy your Endicode website to your custom Beehost domain!

---

## 🎬 Before We Start

### What You'll Need (Open These in New Tabs)
1. [Resend.com](https://resend.com) - For email service
2. [Vercel.com](https://vercel.com) - For hosting
3. Your Beehost control panel login
4. Your GitHub/GitLab account (where your code is)

### Time Required
- **Total:** About 20-30 minutes
- **Active work:** 10 minutes
- **Waiting:** 10-20 minutes (for DNS to propagate)

---

## 📝 STEP 1: Push Your Code to Git (5 minutes)

### 1.1 Open PowerShell in Your Project Folder
```powershell
cd "C:\Users\King Computer\Desktop\Endicode"
```

### 1.2 Install Dependencies
```powershell
npm install
```
**Wait for this to complete** (might take 2-3 minutes)

### 1.3 Commit Your Changes
```powershell
git add .
git commit -m "Remove database, add email notifications"
git push
```

**✅ Checkpoint:** Your code is now on GitHub/GitLab!

---

## 📧 STEP 2: Set Up Email Service with Resend (3 minutes)

### 2.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Click **"Sign Up"** (top right)
3. Enter your email and create a password
4. Check your email and click the verification link
5. You'll be redirected to the Resend dashboard

### 2.2 Get Your API Key
1. In the Resend dashboard, look at the left sidebar
2. Click **"API Keys"**
3. Click the **"Create API Key"** button
4. In the popup:
   - **Name:** Type `Endicode Production`
   - **Permission:** Leave as "Full Access"
5. Click **"Add"**
6. **IMPORTANT:** A key will appear (starts with `re_`)
7. Click the **"Copy"** button
8. Open Notepad and paste it there - **YOU WON'T SEE THIS AGAIN!**

**Example:** `re_123abc456def789ghi` (yours will be different)

**✅ Checkpoint:** You have your Resend API key saved in Notepad!

---

## 🚀 STEP 3: Deploy to Vercel (5 minutes)

### 3.1 Sign Up / Login to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** (or "Login" if you have an account)
3. Choose **"Continue with GitHub"** (or GitLab/Bitbucket)
4. Authorize Vercel to access your repositories

### 3.2 Import Your Project
1. You'll see the Vercel dashboard
2. Click the **"Add New..."** button (top right)
3. Select **"Project"** from the dropdown
4. You'll see a list of your repositories
5. Find **"Endicode"** in the list
6. Click **"Import"** next to it

### 3.3 Configure Your Project
You'll see a configuration screen:

**1. Project Name:**
- Leave it as is or change it (e.g., `endicode-production`)

**2. Framework Preset:**
- Should say "Other" - that's correct!

**3. Root Directory:**
- Leave as `./` (default)

**4. Build and Output Settings:**
- **Build Command:** Should show `npm run vercel-build` ✅
- **Output Directory:** Should show `dist/public` ✅
- **Install Command:** Should show `npm install` ✅

### 3.4 Add Environment Variables (IMPORTANT!)
Scroll down to the **"Environment Variables"** section:

**Add these 4 variables one by one:**

**Variable 1:**
- **Name:** `RESEND_API_KEY`
- **Value:** Paste your Resend API key from Notepad (starts with `re_`)
- Click **"Add"**

**Variable 2:**
- **Name:** `CONTACT_EMAIL`
- **Value:** Your email where you want to receive contact form submissions (e.g., `your-email@gmail.com`)
- Click **"Add"**

**Variable 3:**
- **Name:** `RESEND_FROM_EMAIL`
- **Value:** `onboarding@resend.dev`
- Click **"Add"**

**Variable 4:**
- **Name:** `NODE_ENV`
- **Value:** `production`
- Click **"Add"**

### 3.5 Deploy!
1. Click the big **"Deploy"** button at the bottom
2. You'll see a deployment screen with logs
3. **Wait 2-5 minutes** - grab a coffee! ☕

### 3.6 Test Your Deployment
1. Once it says **"Congratulations!"** or shows a success message
2. You'll see a preview image and a URL like: `endicode-production.vercel.app`
3. Click **"Visit"** or copy the URL to your browser
4. Your website should load! 🎉

### 3.7 Test the Contact Form
1. On your deployed site, go to the Contact page
2. Fill out the form with test data
3. Submit it
4. **Check your email** (the one you put in `CONTACT_EMAIL`)
5. You should receive an email with the form submission!

**✅ Checkpoint:** Your website is live on Vercel and emails are working!

---

## 🌐 STEP 4: Connect Your Beehost Domain (10-30 minutes)

### 4.1 Add Domain in Vercel
1. In your Vercel dashboard, find your project
2. Click on it to open the project page
3. Click the **"Settings"** tab (top menu)
4. In the left sidebar, click **"Domains"**
5. You'll see a text box that says "yourdomain.com"
6. Type your Beehost domain (e.g., `yourdomain.com`)
7. Click **"Add"**

**Vercel will show you a message about DNS configuration**

### 4.2 Login to Beehost
1. Open a new tab and go to your Beehost control panel
2. Login with your credentials
3. Find your domain in the dashboard

### 4.3 Access DNS Settings
**Look for one of these options:**
- "DNS Management"
- "DNS Zone Editor"
- "Domain Management" → "DNS Settings"
- "Advanced DNS"

Click on it to open the DNS editor.

### 4.4 Add DNS Records

**You need to add 2 records:**

#### Record 1: A Record (for yourdomain.com)
1. Click **"Add Record"** or **"Add New Record"**
2. Fill in these details:
   - **Type:** Select `A` or `A Record`
   - **Name/Host:** Type `@` (or leave blank if it says "root")
   - **Value/Points to/IP Address:** `76.76.21.21`
   - **TTL:** `3600` (or leave as default)
3. Click **"Save"** or **"Add Record"**

#### Record 2: CNAME Record (for www.yourdomain.com)
1. Click **"Add Record"** again
2. Fill in these details:
   - **Type:** Select `CNAME` or `CNAME Record`
   - **Name/Host:** Type `www`
   - **Value/Points to/Target:** `cname.vercel-dns.com`
   - **TTL:** `3600` (or leave as default)
3. Click **"Save"** or **"Add Record"**

### 4.5 Save and Wait
1. Make sure both records are saved
2. You might see a "Changes saved" message
3. **Now we wait!** ⏰

**DNS propagation can take:**
- **Minimum:** 5-10 minutes
- **Average:** 30 minutes
- **Maximum:** 48 hours (rare)

### 4.6 Check Domain Status in Vercel
1. Go back to Vercel → Your Project → Settings → Domains
2. You'll see your domain listed
3. It might say **"Invalid Configuration"** - that's normal!
4. **Refresh the page every 5-10 minutes**
5. When it changes to **"Valid"** with a green checkmark, you're good! ✅

### 4.7 SSL Certificate (Automatic)
- Once the domain is verified, Vercel automatically creates an SSL certificate
- This takes about 5-10 minutes
- You'll see a padlock icon 🔒 next to your domain when ready

---

## ✅ STEP 5: Final Testing (2 minutes)

### 5.1 Visit Your Domain
1. Open a new browser tab
2. Type your domain: `https://yourdomain.com`
3. Your website should load! 🎊

### 5.2 Test Everything
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Contact form loads
- [ ] Submit a test contact form
- [ ] Check your email for the submission
- [ ] Try `www.yourdomain.com` - should also work

---

## 🎉 YOU'RE DONE!

**Congratulations!** Your Endicode website is now live at:
- ✅ `https://yourdomain.com`
- ✅ `https://www.yourdomain.com`
- ✅ Contact form sends emails to your inbox
- ✅ SSL certificate active (secure HTTPS)
- ✅ Free hosting on Vercel
- ✅ 100 free emails per day with Resend

---

## 🔄 How to Update Your Site Later

Whenever you make changes to your code:

```powershell
cd "C:\Users\King Computer\Desktop\Endicode"
git add .
git commit -m "Describe your changes here"
git push
```

**That's it!** Vercel will automatically rebuild and deploy in 2-5 minutes.

---

## 🆘 Troubleshooting

### "Domain not working after 1 hour"
1. Check DNS at [whatsmydns.net](https://www.whatsmydns.net)
2. Enter your domain and select "A" record
3. Should show `76.76.21.21` in multiple locations
4. If not, double-check your Beehost DNS settings

### "Contact form not sending emails"
1. Go to Vercel → Your Project → Settings → Environment Variables
2. Make sure `RESEND_API_KEY` is correct
3. Check Resend dashboard for error logs
4. Verify you haven't exceeded 100 emails/day

### "Build failed in Vercel"
1. Go to Vercel → Your Project → Deployments
2. Click on the failed deployment
3. Read the error logs
4. Usually it's a missing dependency - run `npm install` locally first

---

## 📞 Need Help?

If you get stuck at any step:
1. Check the error message carefully
2. Google the specific error
3. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
4. Check Resend documentation: [resend.com/docs](https://resend.com/docs)

---

**Good luck! You've got this! 💪**
