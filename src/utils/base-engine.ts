export class NotImplementedError extends Error {
  constructor(methodName: string, className: string) {
    super(`${className}.${methodName}() is not implemented`);
    this.name = 'NotImplementedError';
  }
}

export abstract class BaseEngine {
  protected constructor(protected readonly engineName: string) {}

  public abstract initialize(): Promise<void>;
  public abstract start(): Promise<void>;
  public abstract stop(): Promise<void>;
} 