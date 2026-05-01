const logger = require("../logger");
const errorHandler = require("../error-handler");

class AuthService {
  constructor() {
    this.sessions = {};
  }

  login(userId, password) {
    logger.info(`Login attempt for user: ${userId}`);
    if (!userId || !password) {
      errorHandler.handle(new Error(`Missing credentials for user: ${userId}`), "auth-service");
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
      errorHandler.handle(new Error(`Logout failed - no active session for user: ${userId}`), "auth-service");
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

const instance = new AuthService();

if (require.main === module) {
  console.log("--- AuthService standalone test ---");
  const token = instance.login("alice", "secret");
  console.log("Token:", token);
  console.log("Is authenticated:", instance.isAuthenticated("alice"));
  instance.logout("alice");
  console.log("After logout:", instance.isAuthenticated("alice"));
  instance.logout("ghost"); // triggers error-handler
  console.log("Errors logged:", errorHandler.getErrors("auth-service"));
}

module.exports = instance;
