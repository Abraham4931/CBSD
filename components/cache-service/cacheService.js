const logger = require("../logger");
const errorHandler = require("../error-handler");

class CacheService {
  constructor() {
    this.store = {};
    this.ttls = {};
  }

  set(key, value, ttlMs = null) {
    if (!key) {
      errorHandler.handle(new Error("Cache set called with no key"), "cache-service");
      return;
    }
    this.store[key] = value;
    if (ttlMs) {
      this.ttls[key] = setTimeout(() => {
        this.delete(key);
        logger.debug(`Cache expired: ${key}`);
      }, ttlMs);
    }
    logger.debug(`Cache set: ${key}`);
  }

  get(key) {
    const value = this.store[key];
    if (value === undefined) {
      logger.debug(`Cache miss: ${key}`);
      return null;
    }
    logger.debug(`Cache hit: ${key}`);
    return value;
  }

  delete(key) {
    if (!this.store[key] && !this.ttls[key]) {
      errorHandler.handle(new Error(`Cache delete called on missing key: ${key}`), "cache-service");
      return;
    }
    if (this.ttls[key]) {
      clearTimeout(this.ttls[key]);
      delete this.ttls[key];
    }
    delete this.store[key];
    logger.info(`Cache deleted: ${key}`);
  }

  clear() {
    Object.keys(this.ttls).forEach(key => clearTimeout(this.ttls[key]));
    this.store = {};
    this.ttls = {};
    logger.info("Cache cleared");
  }

  has(key) {
    return this.store[key] !== undefined;
  }
}

const instance = new CacheService();

if (require.main === module) {
  console.log("--- CacheService standalone test ---");
  instance.set("user:1", { name: "Alice" });
  console.log("Get user:1:", instance.get("user:1"));
  console.log("Has user:1:", instance.has("user:1"));
  instance.delete("user:1");
  console.log("After delete:", instance.get("user:1"));

  instance.set("temp", "expires soon", 2000);
  console.log("Temp set, will expire in 2s:", instance.get("temp"));
  setTimeout(() => console.log("After 2s:", instance.get("temp")), 2500);
}

module.exports = instance;
