export class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  public info(message: string, ...args: unknown[]): void {
    console.log(`[INFO] [${this.context}] ${message}`, ...args);
  }

  public error(message: string, error?: unknown): void {
    console.error(`[ERROR] [${this.context}] ${message}`, error);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(`[WARN] [${this.context}] ${message}`, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`[DEBUG] [${this.context}] ${message}`, ...args);
    }
  }
}
