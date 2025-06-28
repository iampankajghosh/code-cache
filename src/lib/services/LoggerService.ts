type LogLevel = "error" | "warn" | "info" | "debug";

class LoggerService {
  private readonly prefix: string;
  private readonly levels: LogLevel[];
  private currentLevel: LogLevel;

  constructor(prefix: string = "App", level: LogLevel = "debug") {
    this.prefix = prefix;
    this.levels = ["error", "warn", "info", "debug"];
    this.currentLevel = level;
  }

  public shouldLog(level: LogLevel): boolean {
    return this.levels.indexOf(this.currentLevel) >= this.levels.indexOf(level);
  }

  public error(...args: unknown[]): void {
    if (this.shouldLog("error")) {
      console.error(` [${this.prefix}][ERROR]`, ...args);
    }
  }

  public warn(...args: unknown[]): void {
    if (this.shouldLog("warn")) {
      console.warn(` [${this.prefix}][WARN]`, ...args);
    }
  }

  public info(...args: unknown[]): void {
    if (this.shouldLog("info")) {
      console.info(` [${this.prefix}][INFO]`, ...args);
    }
  }

  public debug(...args: unknown[]): void {
    if (this.shouldLog("debug")) {
      console.debug(` [${this.prefix}][DEBUG]`, ...args);
    }
  }

  public setLevel(level: LogLevel): void {
    if (this.levels.includes(level)) {
      this.currentLevel = level;
    }
  }
}

export const logger = new LoggerService();
export default LoggerService;
