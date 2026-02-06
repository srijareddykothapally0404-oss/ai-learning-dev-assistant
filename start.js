#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Dev Learning Assistant...\n');

// Check if .env file exists
if (!fs.existsSync('.env')) {
  console.log('⚠️  Warning: .env file not found!');
  console.log('Please create a .env file with your OpenAI API key:');
  console.log('OPENAI_API_KEY=your_api_key_here\n');
}

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
  console.log('📦 Installing server dependencies...');
  const installServer = spawn('npm', ['install'], { stdio: 'inherit' });
  
  installServer.on('close', (code) => {
    if (code === 0) {
      checkClientDeps();
    } else {
      console.error('❌ Failed to install server dependencies');
      process.exit(1);
    }
  });
} else {
  checkClientDeps();
}

function checkClientDeps() {
  if (!fs.existsSync('client/node_modules')) {
    console.log('📦 Installing client dependencies...');
    const installClient = spawn('npm', ['install'], { 
      cwd: 'client',
      stdio: 'inherit' 
    });
    
    installClient.on('close', (code) => {
      if (code === 0) {
        buildAndStart();
      } else {
        console.error('❌ Failed to install client dependencies');
        process.exit(1);
      }
    });
  } else {
    buildAndStart();
  }
}

function buildAndStart() {
  console.log('🔨 Building client...');
  const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
  
  build.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Build complete!');
      console.log('🌟 Starting server on http://localhost:3000\n');
      
      const server = spawn('npm', ['start'], { stdio: 'inherit' });
      
      server.on('close', (code) => {
        console.log(`Server exited with code ${code}`);
      });
    } else {
      console.error('❌ Build failed');
      process.exit(1);
    }
  });
}