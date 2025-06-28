class StorageService {
  private readonly storage;
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  public setItem(key: string, value: string) {
    try {
      const serialized = JSON.stringify(value);
      this.storage.setItem(key, serialized);
    } catch (error) {
      console.error(`StorageService: Error setting key "${key}"`, error);
    }
  }

  public getItem(key: string) {
    try {
      const serialized = this.storage.getItem(key);
      return serialized ? JSON.parse(serialized) : null;
    } catch (error) {
      console.error(`StorageService: Error reading key "${key}"`, error);
      return null;
    }
  }

  public removeItem(key: string) {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`StorageService: Error removing key "${key}"`, error);
    }
  }

  public clear() {
    try {
      this.storage.clear();
    } catch (error) {
      console.error(`StorageService: Error clearing storage`, error);
    }
  }

  public has(key: string) {
    try {
      return this.storage.getItem(key) !== null;
    } catch (error) {
      console.error(`StorageService: Error checking key "${key}"`, error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
