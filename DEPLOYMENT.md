# Deployment Guide

This guide will help you deploy the OJT Classroom application to Vercel.

## Prerequisites

1. A [Vercel](https://vercel.com) account
2. A [Clerk](https://clerk.dev) account
3. A PostgreSQL database (you can use Vercel Postgres)

## Environment Variables

Make sure to add these environment variables in your Vercel project settings:

\`\`\`
DATABASE_URL=your_postgres_connection_string # Required: PostgreSQL connection URL with SSL enabled
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key # Required: Clerk publishable key for authentication
CLERK_SECRET_KEY=your_clerk_secret_key # Required: Clerk secret key for backend operations
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret # Required: Webhook secret from Clerk dashboard
ADMIN_EMAIL=your_admin_email@example.com # Optional: Email for the initial admin user
NODE_ENV=production # Required: Set to 'production' in deployment
\`\`\`

## Database Setup

1. Create a new Postgres database in Vercel:
   - Go to your Vercel dashboard
   - Select "Storage" from the sidebar
   - Click "Create Database"
   - Choose "Postgres"
   - Follow the setup wizard

2. Copy the `DATABASE_URL` from Vercel and add it to your environment variables.

## Clerk Setup

1. Create a new application in Clerk:
   - Go to [Clerk Dashboard](https://dashboard.clerk.dev)
   - Click "Add Application"
   - Choose "Next.js"
   - Copy the required API keys

2. Configure Clerk webhooks:
   - In your Clerk dashboard, go to "Webhooks"
   - Add a new webhook endpoint: `https://your-domain.vercel.app/api/clerk-webhook`
   - Copy the webhook secret and add it to your environment variables

## Deployment Steps

1. Push your code to GitHub

2. Import your repository in Vercel:
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "Import Project"
   - Choose your repository
   - Select "Next.js" as the framework

3. Configure environment variables:
   - Add all required environment variables in your Vercel project settings
   - Make sure to use the production database URL

4. Deploy:
   - Click "Deploy"
   - The `predeploy` script will automatically:
     - Check environment variables
     - Push database schema
     - Set up initial data

## Post-Deployment

1. Verify your deployment:
   - Check the deployment logs for any errors
   - Test the application at your Vercel URL
   - Make sure the database is properly connected

2. Monitor your application:
   - Check Vercel analytics
   - Monitor database performance
   - Watch Clerk authentication logs

## Troubleshooting

If you encounter issues:

1. Check deployment logs in Vercel dashboard
2. Verify environment variables are correctly set
3. Ensure database connection is working
4. Check Clerk webhook logs for authentication issues

For more help, refer to:
- [Vercel Documentation](https://vercel.com/docs)
- [Clerk Documentation](https://clerk.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
