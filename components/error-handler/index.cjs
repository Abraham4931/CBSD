const errorHandler = require("./errorHandler.js");

module.exports = {
  handle: errorHandler.handle.bind(errorHandler),
  getErrors: errorHandler.getErrors.bind(errorHandler),
  hasErrors: errorHandler.hasErrors.bind(errorHandler),
  clear: errorHandler.clear.bind(errorHandler)
};
