const logger = require("./logger.js");

module.exports = {
  info: logger.logInfo,
  error: logger.logError,
  debug: logger.logDebug
};
