const configService = require("./configService.js");

module.exports = {
  get: configService.get.bind(configService),
  set: configService.set.bind(configService),
  getAll: configService.getAll.bind(configService)
};
