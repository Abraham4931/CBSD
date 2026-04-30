const cacheService = require("./cacheService.js");

module.exports = {
  set: cacheService.set.bind(cacheService),
  get: cacheService.get.bind(cacheService),
  delete: cacheService.delete.bind(cacheService),
  clear: cacheService.clear.bind(cacheService),
  has: cacheService.has.bind(cacheService)
};
