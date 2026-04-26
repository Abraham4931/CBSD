const logger = require("../logger");

class AuthService {
  constructor() {
    this.sessions = {};
  }

  login(userId, password) {
    logger.info(`Login attempt for user: ${userId}`);
    // Simulated credential check
    if (!userId || !password) {
      logger.error(`Login failed for user: ${userId} - missing credentials`);
      return null;
    }
    const token = `token_${userId}_${Date.now()}`;
    this.sessions[userId] = token;
    logger.info(`User ${userId} logged in successfully`);
    logger.debug(`Session token issued: ${token}`);
    return token;
  }

  logout(userId) {
    if (!this.sessions[userId]) {
      logger.error(`Logout failed - no active session for user: ${userId}`);
      return false;
    }
    delete this.sessions[userId];
    logger.info(`User ${userId} logged out`);
    return true;
  }

  isAuthenticated(userId) {
    const authenticated = !!this.sessions[userId];
    logger.debug(`Auth check for ${userId}: ${authenticated}`);
    return authenticated;
  }

  getToken(userId) {
    return this.sessions[userId] || null;
  }
}

module.exports = new AuthService();
