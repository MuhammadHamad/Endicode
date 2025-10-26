# ⚡ Quick Deploy Reference Card

## 🎯 What You Need

1. **Resend Account** → Get free API key from [resend.com](https://resend.com)
2. **Vercel Account** → Sign up at [vercel.com](https://vercel.com)
3. **Beehost Domain** → Your custom domain credentials

---

## 🚀 5-Minute Deploy Steps

### 1️⃣ Email Service (2 min)
```
1. Go to resend.com → Sign up
2. API Keys → Create API Key
3. Copy the key (starts with re_)
4. Save it securely
```

### 2️⃣ Vercel Deploy (2 min)
```
1. vercel.com → Import repository
2. Add environment variables:
   - RESEND_API_KEY = [your Resend key]
   - CONTACT_EMAIL = [your email]
   - RESEND_FROM_EMAIL = onboarding@resend.dev
   - NODE_ENV = production
3. Click Deploy
4. Test contact form!
```

### 3️⃣ Custom Domain (1 min setup + wait time)
```
1. Vercel → Settings → Domains → Add your domain
2. Beehost DNS → Add these records:
   
   A Record:     @ → 76.76.21.21
   CNAME Record: www → cname.vercel-dns.com

3. Wait 10-30 minutes for DNS propagation
```

---

## 📝 DNS Records Cheat Sheet

Copy these exact values into Beehost:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 76.76.21.21 | 3600 |
| CNAME | www | cname.vercel-dns.com | 3600 |

---

## 📧 Environment Variables

| Variable | Example Value |
|----------|---------------|
| RESEND_API_KEY | re_abc123xyz... |
| CONTACT_EMAIL | your-email@gmail.com |
| RESEND_FROM_EMAIL | onboarding@resend.dev |
| NODE_ENV | production |

---

## ✅ Quick Checklist

- [ ] Resend account created
- [ ] API key copied
- [ ] Vercel deployed with env vars
- [ ] Contact form tested (email received)
- [ ] DNS records added in Beehost
- [ ] Domain verified (wait 10-30 min)
- [ ] SSL active (automatic)
- [ ] Site live at your domain

---

## 🔄 Update Site

```powershell
git add .
git commit -m "Update message"
git push
```
Vercel auto-deploys in 2-5 minutes!

---

## 🆘 Quick Fixes

**Domain not working?**
→ Wait longer (up to 48h) or check DNS at [whatsmydns.net](https://www.whatsmydns.net)

**Build failed?**
→ Check Vercel logs in Deployments tab

**Emails not sending?**
→ Verify RESEND_API_KEY in Vercel env vars
→ Check Resend dashboard for errors

---

📖 **Full Guide:** See `DEPLOYMENT_GUIDE.md` for detailed instructions
