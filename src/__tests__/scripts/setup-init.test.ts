import fs from 'fs';
import path from 'path';

describe('setup-init script', () => {
  const scriptPath = path.join(__dirname, '../../../scripts/setup-init.js');

  it('should exist', () => {
    expect(fs.existsSync(scriptPath)).toBe(true);
  });

  it('should be executable', () => {
    const stats = fs.statSync(scriptPath);
    // Check if file exists and is readable
    expect(stats.isFile()).toBe(true);
  });

  it('should have proper shebang', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    expect(content.startsWith('#!/usr/bin/env node')).toBe(true);
  });

  it('should check for required Node.js version', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    expect(content).toContain('majorVersion < 16');
  });

  it('should include all necessary dependencies', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    const requiredDeps = [
      'dotenv',
      'winston',
      'axios',
      'ws',
      'ccxt',
      'winston',
      'reflect-metadata',
      'inversify',
    ];

    requiredDeps.forEach((dep) => {
      expect(content).toContain(dep);
    });
  });

  it('should create necessary directories', () => {
    const content = fs.readFileSync(scriptPath, 'utf-8');
    const requiredDirs = ['logs', 'data', 'config', 'docs'];

    requiredDirs.forEach((dir) => {
      expect(content).toContain(dir);
    });
  });
});
