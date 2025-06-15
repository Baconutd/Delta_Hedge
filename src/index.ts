import { MarketMakingEngine } from './market-making/engine';
import { HedgingEngine } from './hedging/engine';
import { RiskManager } from './risk/manager';
import { AnalyticsEngine } from './analytics/engine';
import { DataPipeline } from './data/pipeline';
import { Logger } from './utils/logger';

class DeltaHedgeSystem {
  private marketMakingEngine: MarketMakingEngine;
  private hedgingEngine: HedgingEngine;
  private riskManager: RiskManager;
  private analyticsEngine: AnalyticsEngine;
  private dataPipeline: DataPipeline;
  private logger: Logger;

  constructor() {
    this.logger = new Logger('DeltaHedgeSystem');
    this.marketMakingEngine = new MarketMakingEngine();
    this.hedgingEngine = new HedgingEngine();
    this.riskManager = new RiskManager();
    this.analyticsEngine = new AnalyticsEngine();
    this.dataPipeline = new DataPipeline();
  }

  public async start(): Promise<void> {
    try {
      this.logger.info('Starting Delta Hedge System...');

      // Initialize components
      await this.dataPipeline.initialize();
      await this.marketMakingEngine.initialize();
      await this.hedgingEngine.initialize();
      await this.riskManager.initialize();
      await this.analyticsEngine.initialize();

      // Start components
      await this.dataPipeline.start();
      await this.marketMakingEngine.start();
      await this.hedgingEngine.start();
      await this.riskManager.start();
      await this.analyticsEngine.start();

      this.logger.info('Delta Hedge System started successfully');
    } catch (error) {
      this.logger.error('Failed to start Delta Hedge System', error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    try {
      this.logger.info('Stopping Delta Hedge System...');

      // Stop components in reverse order
      await this.analyticsEngine.stop();
      await this.riskManager.stop();
      await this.hedgingEngine.stop();
      await this.marketMakingEngine.stop();
      await this.dataPipeline.stop();

      this.logger.info('Delta Hedge System stopped successfully');
    } catch (error) {
      this.logger.error('Failed to stop Delta Hedge System', error);
      throw error;
    }
  }
}

// Export for testing
export { DeltaHedgeSystem };

// Start the system if this is the main module
if (require.main === module) {
  const system = new DeltaHedgeSystem();
  system.start().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
