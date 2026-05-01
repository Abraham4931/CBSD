const logger = require("../logger");

class ErrorHandler {
  constructor() {
    this.errors = [];
  }

  handle(error, context = "unknown") {
    const entry = {
      context,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null,
      timestamp: new Date().toISOString()
    };

    this.errors.push(entry);
    logger.error(`[${context}] ${entry.message}`);

    return entry;
  }

  getErrors(context = null) {
    if (!context) return this.errors;
    return this.errors.filter(e => e.context === context);
  }

  hasErrors(context = null) {
    return this.getErrors(context).length > 0;
  }

  clear() {
    this.errors = [];
    logger.info("ErrorHandler: error log cleared");
  }
}

const instance = new ErrorHandler();

if (require.main === module) {
  console.log("--- ErrorHandler standalone test ---");
  instance.handle(new Error("Something went wrong"), "auth-service");
  instance.handle("Timeout occurred", "data-components");
  console.log("All errors:", instance.getErrors());
  console.log("Auth errors:", instance.getErrors("auth-service"));
  console.log("Has errors:", instance.hasErrors());
  instance.clear();
  console.log("After clear:", instance.hasErrors());
}

module.exports = instance;
