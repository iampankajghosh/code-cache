class LoggerService {
  private readonly prefix;
  private readonly levels;
  private currentLevel;
  constructor(prefix = "App", level = "debug") {
    this.prefix = prefix;
    this.levels = ["error", "warn", "info", "debug"];
    this.currentLevel = level;
  }

  public shouldLog(level: string) {
    return this.levels.indexOf(this.currentLevel) >= this.levels.indexOf(level);
  }

  public error(...args: []) {
    if (this.shouldLog("error")) {
      console.error(`[${this.prefix}][ERROR]`, ...args);
    }
  }

  public warn(...args: []) {
    if (this.shouldLog("warn")) {
      console.warn(`[${this.prefix}][WARN]`, ...args);
    }
  }

  public info(...args: []) {
    if (this.shouldLog("info")) {
      console.info(`[${this.prefix}][INFO]`, ...args);
    }
  }

  public debug(...args: []) {
    if (this.shouldLog("debug")) {
      console.debug(`[${this.prefix}][DEBUG]`, ...args);
    }
  }

  public setLevel(level: string) {
    if (this.levels.includes(level)) {
      this.currentLevel = level;
    }
  }
}

const logger = new LoggerService();
export default logger;
