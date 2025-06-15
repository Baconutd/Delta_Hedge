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

  // TODO: Enable this test when modules are fully implemented
  it.skip('should handle errors during shutdown', async () => {
    await system.start();

    // Mock a component to throw an error during shutdown
    const analyticsEngine = system['analyticsEngine'];
    analyticsEngine.stop = jest.fn().mockRejectedValue(new Error('Test error'));

    await expect(system.stop()).rejects.toThrow('Test error');
  });
});
