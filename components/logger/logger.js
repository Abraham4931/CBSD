class Logger {
  logInfo(message) {
    console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
  }

  logError(error) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${error}`);
  }

  logDebug(message) {
    console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
  }
}

const logger = new Logger();

if (require.main === module) {
  logger.logInfo("Logger module standalone test passed.");
  logger.logDebug("Logger is running independently.");
}

module.exports = logger;