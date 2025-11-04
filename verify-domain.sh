#!/bin/bash
# Domain Verification Script for FoundryFlow

echo "🌐 FoundryFlow Domain Verification Tool"
echo "======================================"

# Get domain from user
read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo "❌ Please enter a valid domain name"
    exit 1
fi

echo ""
echo "🔍 Checking DNS configuration for: $DOMAIN"
echo ""

# Check A record
echo "Checking A record (root domain)..."
A_RECORD=$(dig +short $DOMAIN A)
if [ "$A_RECORD" = "76.76.21.21" ]; then
    echo "✅ A record is correctly configured"
else
    echo "❌ A record is not configured correctly"
    echo "   Expected: 76.76.21.21"
    echo "   Found: $A_RECORD"
fi

# Check CNAME record for www
echo ""
echo "Checking CNAME record (www subdomain)..."
WWW_CNAME=$(dig +short www.$DOMAIN CNAME)
if [ "$WWW_CNAME" = "cname.vercel-dns.com." ]; then
    echo "✅ WWW CNAME record is correctly configured"
else
    echo "❌ WWW CNAME record is not configured correctly"
    echo "   Expected: cname.vercel-dns.com"
    echo "   Found: $WWW_CNAME"
fi

echo ""
echo "🌍 Checking global DNS propagation..."
echo "Visit: https://www.whatsmydns.net/#A/$DOMAIN"
echo "Visit: https://www.whatsmydns.net/#CNAME/www.$DOMAIN"

echo ""
echo "📋 Next Steps:"
echo "1. If DNS records are correct, wait 5-30 minutes"
echo "2. Check your Vercel dashboard for domain verification status"
echo "3. Once verified, visit https://$DOMAIN to test your site"
echo "4. Test the contact form to ensure everything works"

