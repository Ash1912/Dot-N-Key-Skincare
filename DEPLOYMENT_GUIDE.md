# 🚀 Deployment & Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Git (for version control)

## Local Development

### 1. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 2. Run Development Server
```bash
npm run dev
# or
pnpm dev
```

The app will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
# or
pnpm build
```

## Environment Setup

Create a `.env` file in the root directory:

```env
# Payment Gateways
VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXX
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXX

# Analytics
VITE_META_PIXEL_ID=XXXXXXXXXX
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_ADS_ID=AW-XXXXXXXXX

# Backend (Optional - for Supabase)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxxx
```

## Deployment Options

### Option 1: Vercel (Recommended) ⭐

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Set Environment Variables**
   - Go to Vercel Dashboard
   - Project Settings → Environment Variables
   - Add all variables from `.env`

5. **Production Deploy**
```bash
vercel --prod
```

**Custom Domain:**
- Go to Vercel Dashboard → Domains
- Add your custom domain
- Update DNS records

---

### Option 2: Netlify

1. **Install Netlify CLI**
```bash
npm i -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Initialize**
```bash
netlify init
```

4. **Deploy**
```bash
netlify deploy --prod
```

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

**Environment Variables:**
- Site Settings → Build & Deploy → Environment
- Add all variables

---

### Option 3: AWS Amplify

1. **Install Amplify CLI**
```bash
npm install -g @aws-amplify/cli
```

2. **Configure Amplify**
```bash
amplify configure
```

3. **Initialize App**
```bash
amplify init
```

4. **Add Hosting**
```bash
amplify add hosting
amplify publish
```

**Build Settings (amplify.yml):**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

### Option 4: GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/repo-name"
}
```

3. **Deploy**
```bash
npm run deploy
```

---

## Post-Deployment Setup

### 1. Configure Payment Gateways

#### Razorpay
1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API Keys from Dashboard
3. Add webhook URL: `https://yoursite.com/api/razorpay-webhook`
4. Update environment variables

#### Stripe
1. Create account at [stripe.com](https://stripe.com)
2. Get Publishable Key
3. Set up webhooks
4. Update environment variables

### 2. Set Up Analytics

#### Meta Pixel
1. Create Business Manager account
2. Create Pixel in Events Manager
3. Copy Pixel ID
4. Add to environment variables
5. Verify installation with Meta Pixel Helper extension

#### Google Analytics
1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Copy Measurement ID
3. Add to environment variables

#### Google Ads
1. Set up Google Ads account
2. Create conversion action
3. Copy Conversion ID and Label
4. Update in `/src/app/utils/analytics.ts`

### 3. SEO Configuration

#### Update Sitemap
Edit `/public/sitemap.xml`:
- Replace `https://yourstore.com` with your actual domain
- Add all product URLs
- Update last modified dates

#### Update Robots.txt
Edit `/public/robots.txt`:
- Update sitemap URL
- Configure crawl directives

#### Meta Tags
Update default meta tags in `/src/app/utils/seo.tsx`:
- Site name
- Default description
- Default OG image URL

### 4. Email Integration

Recommended services:
- **SendGrid** - For transactional emails
- **Mailchimp** - For newsletters
- **AWS SES** - Cost-effective option

### 5. Domain & SSL

#### Custom Domain
- Purchase domain from Namecheap, GoDaddy, or Google Domains
- Point DNS to your hosting provider
- Enable SSL (automatic with Vercel/Netlify)

#### SSL Certificate
Most modern hosts provide free SSL via Let's Encrypt automatically.

### 6. Performance Optimization

#### CDN Setup
- Enable CDN on Vercel/Netlify (automatic)
- Or use Cloudflare for additional caching

#### Image Optimization
- Use WebP format
- Implement lazy loading (already done)
- Consider using imgix or Cloudinary

### 7. Monitoring & Analytics

#### Error Tracking
Install Sentry:
```bash
npm install @sentry/react
```

Configure in `App.tsx`:
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

#### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- Lighthouse

### 8. Security Checklist

- [ ] Enable HTTPS
- [ ] Set up CSP headers
- [ ] Configure CORS
- [ ] Implement rate limiting
- [ ] Add authentication token rotation
- [ ] Enable 2FA for admin
- [ ] Regular security audits

### 9. Backup Strategy

- Database backups (if using Supabase/MongoDB)
- Environment variables backup
- Code repository (GitHub)
- User data export functionality

### 10. Legal Pages

Create and add links to:
- Terms & Conditions
- Privacy Policy
- Refund/Return Policy
- Shipping Policy
- Cookie Policy

---

## Common Issues & Solutions

### Build Errors

**Issue:** Module not found
```bash
# Solution: Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Memory issues during build
```bash
# Solution: Increase Node memory
NODE_OPTIONS=--max_old_space_size=4096 npm run build
```

### Runtime Errors

**Issue:** 404 on page refresh
- For Vercel: Automatic
- For Netlify: Add `_redirects` file:
  ```
  /*    /index.html   200
  ```

**Issue:** Environment variables not working
- Ensure variables start with `VITE_`
- Rebuild after adding variables
- Clear browser cache

### Payment Gateway Issues

**Issue:** Razorpay not loading
- Check API key is correct
- Ensure script is loaded before initialization
- Verify domain is whitelisted in Razorpay dashboard

---

## Performance Benchmarks

Expected metrics:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: 90+

---

## Support & Maintenance

Regular tasks:
1. Weekly: Check error logs
2. Monthly: Review analytics
3. Monthly: Update dependencies
4. Quarterly: Security audit
5. Quarterly: Performance review

---

## Scaling Considerations

When traffic grows:
1. Implement Redis caching
2. Use database read replicas
3. Enable CDN for static assets
4. Implement lazy loading for images
5. Consider microservices architecture
6. Set up load balancing

---

**🎉 Your store is now ready for production!**

For questions or issues, refer to PROJECT_DOCUMENTATION.md
