# Deployment Guide

This guide covers deploying your documentation site to various platforms.

## Table of Contents

- [Vercel](#vercel)
- [Netlify](#netlify)
- [Docker](#docker)
- [Static Export](#static-export)
- [Environment Variables](#environment-variables)

## Vercel

Vercel is the recommended platform for deploying Next.js applications.

### Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your documentation repository pushed to your git provider
- A [Vercel account](https://vercel.com/signup)

### Deployment Steps

1. **Import Your Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Import your repository

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**

   ```
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be available at `your-project.vercel.app`

### Custom Domain

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update your DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` to your custom domain

### Automatic Deployments

Vercel automatically deploys:

- **Production**: Commits to your main/master branch
- **Preview**: Pull requests and other branches

## Netlify

### Prerequisites

- A GitHub, GitLab, or Bitbucket account
- Your documentation repository pushed to your git provider
- A [Netlify account](https://app.netlify.com/signup)

### Deployment Steps

1. **Import Your Repository**
   - Go to [Netlify Dashboard](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose your git provider and select your repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Base directory: (leave empty)

3. **Set Environment Variables**
   - Go to Site settings → Build & deploy → Environment
   - Add:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app
     ```

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete

### Custom Domain

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the instructions to configure DNS
4. Update `NEXT_PUBLIC_SITE_URL` environment variable

### Deploy Hooks

Create deploy hooks for manual or automated deployments:

1. Go to Site settings → Build & deploy → Build hooks
2. Click "Add build hook"
3. Give it a name and select the branch
4. Use the webhook URL to trigger deployments

## Docker

Deploy using Docker for maximum control and portability.

### Dockerfile

Create a `Dockerfile` in your project root:

```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  docs:
    build: .
    ports:
      - '3000:3000'
    environment:
      - NEXT_PUBLIC_SITE_URL=https://docs.example.com
    restart: unless-stopped
```

### Build and Run

```bash
# Build the image
docker build -t docs-generator .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://docs.example.com \
  docs-generator

# Or use Docker Compose
docker-compose up -d
```

### Deploy to Production

**Docker Hub:**

```bash
# Tag and push
docker tag docs-generator yourusername/docs-generator:latest
docker push yourusername/docs-generator:latest
```

**Deploy on server:**

```bash
docker pull yourusername/docs-generator:latest
docker run -d \
  -p 80:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://docs.example.com \
  --restart unless-stopped \
  yourusername/docs-generator:latest
```

## Static Export

Generate a static site that can be hosted anywhere.

### Configuration

1. Update `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // ... other config
}
```

2. Build the static site:

```bash
npm run build
```

3. The static files will be in the `out/` directory

### Hosting Options

**GitHub Pages:**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**AWS S3 + CloudFront:**

```bash
# Install AWS CLI
npm install -g aws-cli

# Build
npm run build

# Upload to S3
aws s3 sync out/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

**Nginx:**

```nginx
server {
    listen 80;
    server_name docs.example.com;

    root /var/www/docs/out;
    index index.html;

    location / {
        try_files $uri $uri.html $uri/ =404;
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## Environment Variables

### Required Variables

```env
# Site URL - Used for absolute URLs in sitemap, RSS feed, and SEO
NEXT_PUBLIC_SITE_URL=https://docs.example.com
```

### Optional Variables

```env
# Analytics (if you add analytics integration)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=docs.example.com

# Build optimization
ANALYZE=true  # Enable bundle analyzer
```

### Setting Environment Variables

**Vercel:**

- Dashboard → Project → Settings → Environment Variables

**Netlify:**

- Site settings → Build & deploy → Environment

**Docker:**

- Use `-e` flag: `docker run -e VAR=value`
- Or use `.env` file with docker-compose

**Local Development:**

- Create `.env.local` in project root
- Variables are automatically loaded

## Post-Deployment Checklist

- [ ] Verify site loads correctly
- [ ] Test all navigation links
- [ ] Check search functionality
- [ ] Test dark mode toggle
- [ ] Verify mobile responsiveness
- [ ] Check sitemap.xml
- [ ] Verify robots.txt
- [ ] Test RSS feed
- [ ] Check Open Graph metadata
- [ ] Verify custom domain (if applicable)
- [ ] Set up monitoring/analytics
- [ ] Configure CDN (if applicable)

## Troubleshooting

### Build Failures

**"Module not found" errors:**

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**TypeScript errors:**

```bash
npm run type-check
```

**Linting errors:**

```bash
npm run lint -- --fix
```

### Runtime Issues

**404 errors:**

- Check your file structure matches the routing
- Verify slug handling in `[...slug]/page.tsx`

**Images not loading:**

- Ensure images are in the `public/` directory
- Check image paths in markdown files
- For static export, set `images.unoptimized: true`

**Search not working:**

- Check browser console for errors
- Verify search index is being built
- Clear browser cache

## Performance Optimization

### CDN Configuration

Use a CDN for better global performance:

**Cloudflare:**

1. Add your site to Cloudflare
2. Update DNS to Cloudflare nameservers
3. Enable caching and optimization features

**Vercel Edge Network:**

- Automatically enabled on Vercel deployments
- Global edge caching for static assets

### Caching Headers

For self-hosted deployments, configure caching:

```nginx
# Static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# HTML files
location ~* \.html$ {
    expires 1h;
    add_header Cache-Control "public, must-revalidate";
}
```

## Monitoring

### Vercel Analytics

Enable Vercel Analytics in your dashboard for:

- Page views
- Performance metrics
- Web vitals

### Custom Analytics

Add your analytics provider in `src/app/layout.tsx`:

```typescript
// Example: Google Analytics
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

## Security

### HTTPS

Always use HTTPS in production:

- Vercel and Netlify provide automatic HTTPS
- For self-hosted, use Let's Encrypt

### Security Headers

Add security headers in `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'Referrer-Policy',
          value: 'origin-when-cross-origin',
        },
      ],
    },
  ]
},
```

## Support

For deployment issues:

- Check [Next.js Deployment docs](https://nextjs.org/docs/deployment)
- Open an issue on GitHub
- Consult your hosting provider's documentation
