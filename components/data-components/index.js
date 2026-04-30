import { createRequire } from "module";
const require = createRequire(import.meta.url);
const cache = require("../cache-service");
const logger = require("../logger");

export class DataService {
  constructor() {
    this.data = [];
  }

  async fetchData(cacheKey = "data:users") {
    const cached = cache.get(cacheKey);
    if (cached) {
      logger.info("DataService: returning cached data");
      this.data = cached;
      return cached;
    }

    logger.info("DataService: cache miss, fetching data...");

    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = ["User1", "User2", "User3"];
        cache.set(cacheKey, this.data, 30000); // cache for 30s
        logger.info("DataService: data fetched and cached");
        resolve(this.data);
      }, 1000);
    });
  }

  getData() {
    return this.data;
  }
}
