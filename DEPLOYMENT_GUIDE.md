# Broadcast Templates Demo System - Deployment Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [System Requirements](#system-requirements)
4. [Environment Setup](#environment-setup)
5. [Build Process](#build-process)
6. [Deployment Methods](#deployment-methods)
7. [Environment Configuration](#environment-configuration)
8. [Database Setup](#database-setup)
9. [Production Deployment](#production-deployment)
10. [Monitoring and Maintenance](#monitoring-and-maintenance)
11. [Troubleshooting](#troubleshooting)
12. [Security Considerations](#security-considerations)

## Overview

This guide provides comprehensive instructions for deploying the Broadcast Templates Demo System, a professional Next.js application featuring broadcast graphics templates including news tickers, weather alerts, sports score bugs, and lower third graphics.

### Key Features
- **5 Professional Broadcast Templates**: Breaking News Ticker, Professional News Ticker, Modern Lower Third, Weather Alert, Sports Score Bug
- **Real-time Customization**: Live preview with immediate control updates
- **Responsive Design**: Works across different screen sizes
- **Professional UI**: Built with Next.js 15, TypeScript, Tailwind CSS, and Shadcn UI
- **WebSocket Support**: Real-time communication capabilities

## Prerequisites

### Required Software
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Version 2.0 or higher
- **TypeScript**: Global installation recommended

### Development Tools
- **VS Code**: Recommended IDE with extensions:
  - ESLint
  - Prettier
  - TypeScript and JavaScript Nightly
  - Tailwind CSS IntelliSense
  - Auto Rename Tag

### Accounts and Services
- **GitHub/GitLab**: For source code repository
- **Vercel/Netlify/AWS**: For deployment platform
- **Domain Name**: For custom URL (optional)

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores or equivalent
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 10GB free space
- **Network**: Stable internet connection

### Recommended Requirements
- **CPU**: 4 cores or equivalent
- **RAM**: 16GB or more
- **Storage**: 50GB SSD storage
- **Network**: High-speed internet connection

### Platform Support
- **Development**: macOS, Windows, Linux
- **Production**: Linux (Ubuntu 20.04+, CentOS 8+, Debian 11+)
- **Container**: Docker 20.10+

## Environment Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>
cd broadcast-templates-demo

# Install dependencies
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME="Broadcast Templates Demo"
NEXT_PUBLIC_APP_URL="https://your-domain.com"

# Database Configuration (if using database)
DATABASE_URL="file:./dev.db"

# WebSocket Configuration
NEXT_PUBLIC_SOCKET_URL="wss://your-domain.com/api/socketio"

# Analytics and Monitoring (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-vercel-analytics-id"

# Security
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="https://your-domain.com"
```

### 3. Development Setup

```bash
# Install development dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

## Build Process

### 1. Production Build

```bash
# Build the application for production
npm run build

# Run the production server locally
npm start
```

### 2. Static Export (Optional)

If you need a static export:

```bash
# Install next export
npm install next export

# Export static files
npm run export
```

### 3. Build Optimization

The build process includes:
- **Code Splitting**: Automatic splitting of JavaScript bundles
- **Image Optimization**: Automatic image optimization and resizing
- **CSS Optimization**: PurgeCSS removes unused styles
- **Tree Shaking**: Eliminates unused code
- **Minification**: JavaScript and CSS minification

## Deployment Methods

### Method 1: Vercel (Recommended)

#### Step 1: Connect to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel
```

#### Step 2: Configure Vercel
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Set up custom domain (optional)
4. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Step 3: Deploy
```bash
# Deploy to production
vercel --prod

# Or use automatic deployment on git push
git push origin main
```

### Method 2: Netlify

#### Step 1: Connect to Netlify
```bash
# Install Netlify CLI
npm install netlify-cli -g

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy
```

#### Step 2: Configure Netlify
1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
3. Set up environment variables
4. Configure custom domain

#### Step 3: Deploy
```bash
# Deploy to production
netlify deploy --prod
```

### Method 3: AWS Deployment

#### Step 1: AWS EC2 Setup
```bash
# Launch EC2 instance (Ubuntu 20.04)
# Configure security groups (ports 22, 80, 443)
# Connect to instance via SSH
ssh -i your-key.pem ubuntu@your-ec2-ip
```

#### Step 2: Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2
```

#### Step 3: Deploy Application
```bash
# Clone repository
git clone <your-repository-url>
cd broadcast-templates-demo

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "broadcast-templates" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Step 4: Configure Nginx
```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/broadcast-templates
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/broadcast-templates /etc/nginx/sites-enabled/

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Method 4: Docker Deployment

#### Step 1: Create Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]
```

#### Step 2: Create docker-compose.yml
```yaml
version: '3.8'

services:
  broadcast-templates:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./public:/app/public:ro
```

#### Step 3: Deploy with Docker
```bash
# Build and run with Docker Compose
docker-compose up -d --build

# Or build and run with Docker
docker build -t broadcast-templates .
docker run -p 3000:3000 --name broadcast-templates broadcast-templates
```

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME="Broadcast Templates Demo"
NEXT_PUBLIC_APP_URL="https://your-domain.com"
NODE_ENV="production"

# Database Configuration
DATABASE_URL="file:./prod.db"

# WebSocket Configuration
NEXT_PUBLIC_SOCKET_URL="wss://your-domain.com/api/socketio"

# Security
NEXTAUTH_SECRET="your-production-secret-here"
NEXTAUTH_URL="https://your-domain.com"

# Analytics (optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-vercel-analytics-id"

# Error Tracking (optional)
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"
```

### Development Environment Variables

Create `.env.development`:

```env
# Application Configuration
NEXT_PUBLIC_APP_NAME="Broadcast Templates Demo (Dev)"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database Configuration
DATABASE_URL="file:./dev.db"

# WebSocket Configuration
NEXT_PUBLIC_SOCKET_URL="ws://localhost:3000/api/socketio"

# Security
NEXTAUTH_SECRET="your-development-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

## Database Setup

### SQLite Setup (Default)

The application uses SQLite by default. No additional setup is required for development.

### Production Database Setup

For production, consider using a more robust database:

#### PostgreSQL Setup

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createdb broadcast_templates
sudo -u postgres createuser broadcast_user

# Set password
sudo -u postgres psql -c "ALTER USER broadcast_user PASSWORD 'your-password';"

# Grant privileges
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE broadcast_templates TO broadcast_user;"

# Update DATABASE_URL in .env.production
DATABASE_URL="postgresql://broadcast_user:your-password@localhost:5432/broadcast_templates"
```

#### MySQL Setup

```bash
# Install MySQL
sudo apt install mysql-server

# Create database and user
mysql -u root -p
CREATE DATABASE broadcast_templates;
CREATE USER 'broadcast_user'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON broadcast_templates.* TO 'broadcast_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Update DATABASE_URL in .env.production
DATABASE_URL="mysql://broadcast_user:your-password@localhost:3306/broadcast_templates"
```

### Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database
npx prisma studio
```

## Production Deployment

### Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] Database is configured and accessible
- [ ] SSL certificate is configured (if using custom domain)
- [ ] Security headers are properly configured
- [ ] Backup strategy is in place
- [ ] Monitoring and logging are set up
- [ ] Performance optimization is complete

### Deployment Steps

#### 1. Final Build Test
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Test build
npm run build

# Test production server locally
npm start
```

#### 2. Security Hardening
```bash
# Update all dependencies
npm update

# Security audit
npm audit
npm audit fix

# Check for vulnerabilities
npm audit --production
```

#### 3. Performance Optimization
```bash
# Analyze bundle size
npm run analyze

# Optimize images (if needed)
npm run optimize-images
```

#### 4. Deploy
```bash
# Push to repository
git add .
git commit -m "Production deployment"
git push origin main

# Or deploy directly to platform
vercel --prod
# or
netlify deploy --prod
```

### Post-Deployment Tasks

#### 1. Verify Deployment
```bash
# Check application status
curl https://your-domain.com

# Check specific endpoints
curl https://your-domain.com/api/health
```

#### 2. Set Up Monitoring
```bash
# Install monitoring tools
npm install @sentry/nextjs

# Configure error tracking
# Add to next.config.js
```

#### 3. Set Up Backups
```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u broadcast_user -p your-password broadcast_templates > backup_$DATE.sql
```

## Monitoring and Maintenance

### Application Monitoring

#### 1. Health Checks
```bash
# Health check endpoint
GET /api/health

# Expected response
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

#### 2. Performance Monitoring
- **Vercel Analytics**: Built-in performance monitoring
- **Google Analytics**: User behavior tracking
- **Sentry**: Error tracking and performance monitoring

#### 3. Log Management
```bash
# View application logs
pm2 logs broadcast-templates

# System logs
journalctl -u nginx -f

# Application-specific logs
tail -f /var/log/broadcast-templates/app.log
```

### Regular Maintenance Tasks

#### 1. Weekly Tasks
- [ ] Check for security updates
- [ ] Review application logs
- [ ] Monitor performance metrics
- [ ] Test backup restoration

#### 2. Monthly Tasks
- [ ] Update dependencies
- [ ] Review and optimize database
- [ ] Check SSL certificate expiration
- [ ] Review user analytics

#### 3. Quarterly Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Backup strategy review
- [ ] Infrastructure scaling review

### Scaling Considerations

#### Horizontal Scaling
- **Load Balancer**: Distribute traffic across multiple instances
- **Auto-scaling**: Automatically adjust instance count based on load
- **CDN**: Use Content Delivery Network for static assets

#### Vertical Scaling
- **Instance Size**: Increase CPU/RAM resources
- **Database Optimization**: Optimize queries and indexes
- **Caching**: Implement Redis or similar caching solution

## Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

#### 2. Database Connection Issues
```bash
# Check database service status
sudo systemctl status postgresql

# Test database connection
psql -h localhost -U broadcast_user -d broadcast_templates

# Check database logs
sudo tail -f /var/log/postgresql/postgresql-12-main.log
```

#### 3. WebSocket Connection Issues
```bash
# Check WebSocket server status
curl -I http://localhost:3000/api/socketio

# Check WebSocket logs
pm2 logs broadcast-templates

# Test WebSocket connection
# Use browser developer tools to test WebSocket connection
```

#### 4. Performance Issues
```bash
# Check memory usage
pm2 monit

# Check CPU usage
top -p $(pgrep -f "node.*server.js")

# Analyze bundle size
npm run analyze
```

### Debug Mode

Enable debug logging:

```bash
# Set debug environment variable
export DEBUG=*

# Start application with debug logging
npm run dev
```

### Emergency Recovery

#### 1. Restore from Backup
```bash
# Restore database from backup
mysql -u broadcast_user -p broadcast_templates < backup_20240101_120000.sql

# Restore application files
git checkout main
git pull origin main
npm install
npm run build
```

#### 2. Rollback Deployment
```bash
# Rollback to previous commit
git log --oneline -10
git checkout <previous-commit-hash>
git push origin main --force
```

## Security Considerations

### Application Security

#### 1. Environment Variables
- Never commit `.env.local` to version control
- Use strong, randomly generated secrets
- Rotate secrets regularly
- Use different secrets for development and production

#### 2. Dependencies
```bash
# Regularly audit dependencies
npm audit

# Update dependencies
npm update

# Check for vulnerabilities
npm audit --production
```

#### 3. Headers and Security
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
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
}
```

### Infrastructure Security

#### 1. Server Security
```bash
# Update system regularly
sudo apt update && sudo apt upgrade -y

# Configure firewall
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https

# Disable root login
sudo passwd -l root
```

#### 2. SSL/TLS Configuration
```bash
# Install Let's Encrypt certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com

# Auto-renew certificates
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### 3. Backup Security
- Encrypt backup files
- Store backups in secure, off-site location
- Regularly test backup restoration
- Implement backup retention policy

### Compliance Considerations

#### 1. Data Privacy
- GDPR compliance for EU users
- CCPA compliance for California users
- Regular privacy policy updates
- Data processing agreements

#### 2. Accessibility
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- Color contrast compliance

## Conclusion

This deployment guide provides comprehensive instructions for deploying the Broadcast Templates Demo System in various environments. Following these guidelines will ensure a secure, performant, and maintainable deployment.

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Netlify Deployment Guide](https://docs.netlify.com/)
- [AWS Deployment Guide](https://aws.amazon.com/getting-started/)
- [Docker Documentation](https://docs.docker.com/)

### Support

For additional support:
- Check the project's GitHub Issues
- Review Next.js documentation
- Contact your hosting provider's support team
- Consult with a DevOps professional for complex deployments

---

*Last Updated: January 2024*
*Version: 1.0.0*