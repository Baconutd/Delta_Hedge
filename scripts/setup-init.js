#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Bitmart Trading System Setup...\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.split('.')[0].substring(1));
if (majorVersion < 16) {
  console.error('❌ Node.js version 16 or higher is required');
  process.exit(1);
}
console.log(`✅ Node.js version: ${nodeVersion}`);

// Install production dependencies
console.log('\n📦 Installing production dependencies...');
const productionDeps = [
  'dotenv@^16.0.3',
  'winston@^3.8.2',
  'axios@^1.3.4',
  'ws@^8.13.0',
  'ccxt@^4.0.0',
  'node-cache@^5.1.2',
  'p-queue@^7.3.4',
  'p-retry@^5.1.2',
  'uuid@^9.0.0',
  'joi@^17.9.1',
  'eventemitter3@^5.0.0',
  'reflect-metadata@^0.1.13',
  'inversify@^6.0.1',
  'decimal.js@^10.4.3',
  'date-fns@^2.29.3',
  'lodash@^4.17.21',
];

try {
  execSync(`npm install --save ${productionDeps.join(' ')}`, { stdio: 'inherit' });
  console.log('✅ Production dependencies installed');
} catch (error) {
  console.error('❌ Failed to install production dependencies');
  process.exit(1);
}

// Install dev dependencies (already in package.json)
console.log('\n📦 Installing development dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Development dependencies installed');
} catch (error) {
  console.error('❌ Failed to install development dependencies');
  process.exit(1);
}

// Create necessary directories
console.log('\n📁 Creating project directories...');
const directories = ['logs', 'data', 'config', 'docs', '.github/workflows'];

directories.forEach((dir) => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir}/`);
  }
});

// Create .env file from example if it doesn't exist
console.log('\n📄 Setting up environment configuration...');
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath) && !fs.existsSync(envExamplePath)) {
  const envContent = `# BitMart API Configuration
BITMART_API_KEY=your_bitmart_api_key_here
BITMART_SECRET_KEY=your_bitmart_secret_key_here
BITMART_MEMO=your_bitmart_memo_here

# Bybit API Configuration  
BYBIT_API_KEY=your_bybit_api_key_here
BYBIT_SECRET_KEY=your_bybit_secret_key_here

# Trading Configuration
TRADING_PAIR=BTC/USDT
QUOTE_SPREAD_BPS=30
QUOTE_SIZE_USD=1000

# System Configuration
NODE_ENV=development
LOG_LEVEL=info
`;
  fs.writeFileSync(envExamplePath, envContent);
  console.log('✅ Created .env.example');
}

// Initialize git hooks
console.log('\n🔧 Setting up git hooks...');
try {
  execSync('npx husky install', { stdio: 'inherit' });
  console.log('✅ Git hooks configured');
} catch (error) {
  console.warn('⚠️  Could not set up git hooks (this is okay if not in a git repository)');
}

// Create initial .gitignore if it doesn't exist
const gitignorePath = path.join(process.cwd(), '.gitignore');
if (!fs.existsSync(gitignorePath)) {
  const gitignoreContent = `node_modules/
dist/
logs/
data/
.env
.env.local
.DS_Store
*.log
coverage/
.vscode/
.idea/
*.swp
*.swo
.cache/
`;
  fs.writeFileSync(gitignorePath, gitignoreContent);
  console.log('✅ Created .gitignore');
}

console.log('\n✨ Setup complete! Next steps:');
console.log('1. Copy .env.example to .env and add your API keys');
console.log('2. Run "npm run setup:config" to create configuration files');
console.log('3. Run "npm run dev" to start the development server');
console.log('\nHappy trading! 📈');
