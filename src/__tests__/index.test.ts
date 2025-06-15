import { DeltaHedgeSystem } from '../index';

describe('DeltaHedgeSystem', () => {
  let system: DeltaHedgeSystem;

  beforeEach(() => {
    system = new DeltaHedgeSystem();
  });

  afterEach(async () => {
    await system.stop();
  });

  it('should start and stop successfully', async () => {
    await expect(system.start()).resolves.not.toThrow();
    await expect(system.stop()).resolves.not.toThrow();
  });

  it('should handle errors during startup', async () => {
    // Mock a component to throw an error
    jest.spyOn(system['dataPipeline'], 'initialize').mockRejectedValue(new Error('Test error'));

    await expect(system.start()).rejects.toThrow('Test error');
  });

  it('should handle errors during shutdown', async () => {
    await system.start();

    // Mock a component to throw an error during shutdown
    jest.spyOn(system['analyticsEngine'], 'stop').mockRejectedValue(new Error('Test error'));

    await expect(system.stop()).rejects.toThrow('Test error');
  });
});
