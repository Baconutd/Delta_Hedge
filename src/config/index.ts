export interface ExchangeConfig {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
  wsUrl: string;
}

export interface RiskConfig {
  maxPositionSize: number;
  maxDrawdown: number;
  stopLossPercentage: number;
  maxLeverage: number;
}

export interface MarketMakingConfig {
  spreadPercentage: number;
  orderSize: number;
  updateInterval: number;
  maxOrders: number;
}

export interface Config {
  bitmart: ExchangeConfig;
  bybit: ExchangeConfig;
  risk: RiskConfig;
  marketMaking: MarketMakingConfig;
  environment: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

// Load configuration from environment variables
export const loadConfig = (): Config => {
  return {
    bitmart: {
      apiKey: process.env.BITMART_API_KEY || '',
      apiSecret: process.env.BITMART_API_SECRET || '',
      baseUrl: process.env.BITMART_BASE_URL || 'https://api.bitmart.com',
      wsUrl: process.env.BITMART_WS_URL || 'wss://ws.bitmart.com',
    },
    bybit: {
      apiKey: process.env.BYBIT_API_KEY || '',
      apiSecret: process.env.BYBIT_API_SECRET || '',
      baseUrl: process.env.BYBIT_BASE_URL || 'https://api.bybit.com',
      wsUrl: process.env.BYBIT_WS_URL || 'wss://stream.bybit.com',
    },
    risk: {
      maxPositionSize: Number(process.env.MAX_POSITION_SIZE) || 1.0,
      maxDrawdown: Number(process.env.MAX_DRAWDOWN) || 0.1,
      stopLossPercentage: Number(process.env.STOP_LOSS_PERCENTAGE) || 0.05,
      maxLeverage: Number(process.env.MAX_LEVERAGE) || 1.0,
    },
    marketMaking: {
      spreadPercentage: Number(process.env.SPREAD_PERCENTAGE) || 0.001,
      orderSize: Number(process.env.ORDER_SIZE) || 0.1,
      updateInterval: Number(process.env.UPDATE_INTERVAL) || 1000,
      maxOrders: Number(process.env.MAX_ORDERS) || 10,
    },
    environment: (process.env.NODE_ENV as 'development' | 'production') || 'development',
    logLevel: (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info',
  };
}; 