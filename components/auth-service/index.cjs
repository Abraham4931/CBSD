const authService = require("./authService.js");

module.exports = {
  login: authService.login.bind(authService),
  logout: authService.logout.bind(authService),
  isAuthenticated: authService.isAuthenticated.bind(authService),
  getToken: authService.getToken.bind(authService)
};
