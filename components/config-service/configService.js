const logger = require("../logger");
const errorHandler = require("../error-handler");

class ConfigService {
  constructor() {
    this.config = {
      cache: {
        defaultTtlMs: 30000
      },
      auth: {
        demoUser: "demo-user",
        demoPassword: "password123"
      },
      notifications: {
        email: "team@example.com",
        sms: "+1234567890",
        pushUserId: "demo-user"
      },
      app: {
        name: "cbsd",
        env: "development"
      }
    };
  }

  get(key) {
    const keys = key.split(".");
    let value = this.config;
    for (const k of keys) {
      if (value[k] === undefined) {
        errorHandler.handle(new Error(`Config key not found: ${key}`), "config-service");
        return null;
      }
      value = value[k];
    }
    logger.debug(`Config get: ${key} = ${JSON.stringify(value)}`);
    return value;
  }

  set(key, value) {
    const keys = key.split(".");
    let target = this.config;
    for (let i = 0; i < keys.length - 1; i++) {
      if (target[keys[i]] === undefined) {
        target[keys[i]] = {};
      }
      target = target[keys[i]];
    }
    target[keys[keys.length - 1]] = value;
    logger.info(`Config set: ${key}`);
  }

  getAll() {
    return { ...this.config };
  }
}

const instance = new ConfigService();

if (require.main === module) {
  console.log("--- ConfigService standalone test ---");
  console.log("cache.defaultTtlMs:", instance.get("cache.defaultTtlMs"));
  console.log("auth.demoUser:", instance.get("auth.demoUser"));
  console.log("notifications.email:", instance.get("notifications.email"));
  instance.set("app.env", "production");
  console.log("app.env after set:", instance.get("app.env"));
  console.log("missing key:", instance.get("app.missing"));
}

module.exports = instance;
