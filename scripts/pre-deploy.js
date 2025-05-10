#!/usr/bin/env node

console.log('🚀 Running pre-deployment checks...\n');

const { execSync } = require('child_process');

function runCommand(command, message) {
    console.log(`⏳ ${message}...`);
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`✅ ${message} completed successfully!\n`);
        return true;
    } catch (error) {
        console.error(`❌ ${message} failed!`);
        console.error(error.message);
        return false;
    }
}

// Check TypeScript compilation
if (!runCommand('tsc --noEmit', 'Checking TypeScript compilation')) {
    process.exit(1);
}

// Run environment variable checks
if (!runCommand('node scripts/check-deploy.js', 'Checking environment variables')) {
    process.exit(1);
}

// Run linting
if (!runCommand('next lint', 'Running linter checks')) {
    process.exit(1);
}

// Generate database migrations if needed
if (!runCommand('npm run db:generate', 'Generating database migrations')) {
    process.exit(1);
}

// Push database schema
if (!runCommand('npm run db:push', 'Pushing database schema')) {
    process.exit(1);
}

// Run database migrations
if (!runCommand('npm run db:migrate', 'Running database migrations')) {
    process.exit(1);
}

// Run database setup
if (!runCommand('npm run db:setup', 'Setting up database')) {
    process.exit(1);
}

console.log('🎉 All pre-deployment checks passed! Ready to deploy.\n');
