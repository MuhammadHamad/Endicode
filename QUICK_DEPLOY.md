# ⚡ Quick Deploy Reference Card

## 🎯 What You Need

1. **Neon Database URL** → Get from [neon.tech](https://neon.tech)
2. **Vercel Account** → Sign up at [vercel.com](https://vercel.com)
3. **Beehost Domain** → Your custom domain credentials

---

## 🚀 5-Minute Deploy Steps

### 1️⃣ Database (2 min)
```
1. Go to neon.tech → Create project
2. Copy connection string
3. Save it securely
```

### 2️⃣ Vercel Deploy (2 min)
```
1. vercel.com → Import repository
2. Add environment variables:
   - DATABASE_URL = [your Neon URL]
   - SESSION_SECRET = [random 32+ chars]
   - NODE_ENV = production
3. Click Deploy
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

## 🔑 Generate SESSION_SECRET

**PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Online:** [randomkeygen.com](https://randomkeygen.com)

---

## ✅ Quick Checklist

- [ ] Neon database created
- [ ] Vercel deployed with env vars
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

**Database error?**
→ Verify DATABASE_URL in Vercel env vars

---

📖 **Full Guide:** See `DEPLOYMENT_GUIDE.md` for detailed instructions
