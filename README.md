# Delta-Neutral Market Making System

![CodeRabbit Pull Request Reviews](https://img.shields.io/coderabbit/prs/github/Baconutd/Delta_Hedge?utm_source=oss&utm_medium=github&utm_campaign=Baconutd%2FDelta_Hedge&labelColor=171717&color=FF570A&link=https%3A%2F%2Fcoderabbit.ai&label=CodeRabbit+Reviews)

A sophisticated automated trading system that executes market-making strategies on BitMart while maintaining delta-neutral positions through real-time hedging on Bybit.

## Project Overview

This system provides:
- Automated market making on BitMart
- Delta-neutral hedging on Bybit
- Real-time risk management
- Performance analytics and monitoring

## Setup

1. Make sure you have Node.js installed
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## Task Organization

The project uses Taskmaster for task automation. Here are the main task categories:

### Setup Tasks
- `npm run setup` - Initial project setup
- `npm run setup:init` - Install dependencies
- `npm run setup:config` - Configure exchange settings
- `npm run setup:infra` - Set up AWS infrastructure

### Development Tasks
- `npm run dev` - Start development environment
- `npm run test` - Run test suite
- `npm run build` - Build for production
- `npm run deploy` - Deploy to production

### Trading System Tasks
- `npm run market-making` - Start market making engine
- `npm run market-making:bitmart` - Run BitMart component
- `npm run market-making:bybit` - Run Bybit hedging
- `npm run risk` - Start risk management
- `npm run analytics` - Start analytics platform
- `npm run data` - Run data pipeline
- `npm run monitor` - Start system monitoring

### Utility Tasks
- `npm run clean` - Clean build artifacts

## Project Structure

```
├── src/
│   ├── market-making/    # Market making engine
│   ├── hedging/         # Hedging system
│   ├── risk/            # Risk management
│   ├── analytics/       # Analytics platform
│   └── data/            # Data pipeline
├── config/              # Configuration files
├── tests/              # Test suite
├── docs/               # Documentation
├── taskmaster.json     # Task configuration
└── package.json        # Project dependencies
```

## Configuration

The project uses several configuration files:
- `taskmaster.json` - Task automation configuration
- `.env` - Environment variables
- `config/exchanges.json` - Exchange API configurations
- `config/risk.json` - Risk management parameters

## Development Workflow

1. Set up development environment:
   ```bash
   npm run setup
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm run test
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Deploy:
   ```bash
   npm run deploy
   ```

## Monitoring and Maintenance

- Use `npm run monitor` to start system monitoring
- Check analytics dashboard for performance metrics
- Review logs for system health
- Monitor risk metrics and exposure

## Security

- API keys are stored securely in environment variables
- All communications are encrypted
- Regular security audits are performed
- Emergency kill switches are implemented

## Support

For technical support or questions, please contact the development team. 