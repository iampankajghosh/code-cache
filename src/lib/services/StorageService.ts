class StorageService {
  public setItem(key: string, value: string) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`❌ StorageService: Error setting key "${key}"`, error);
    }
  }

  public getItem(key: string) {
    try {
      const serialized = localStorage.getItem(key);
      return serialized ? JSON.parse(serialized) : null;
    } catch (error) {
      console.error(`❌ StorageService: Error reading key "${key}"`, error);
      return null;
    }
  }

  public removeItem(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`🗑️ StorageService: Error removing key "${key}"`, error);
    }
  }

  public clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`🧹 StorageService: Error clearing storage`, error);
    }
  }

  public has(key: string) {
    try {
      return localStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`🔍 StorageService: Error checking key "${key}"`, error);
      return false;
    }
  }
}

const storageService = new StorageService();
export default storageService;
