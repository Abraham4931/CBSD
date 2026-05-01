const logger = require("../logger");
const errorHandler = require("../error-handler");

class NotificationService {
  sendEmail(to, subject, message) {
    if (!to || !subject || !message) {
      errorHandler.handle(new Error("sendEmail missing required fields"), "notificationService");
      return false;
    }
    logger.info(`Sending email to ${to}`);
    logger.debug(`Email payload: subject=${subject}, message=${message}`);
    const result = `[EMAIL] To: ${to} | Subject: ${subject} | Message: ${message}`;
    logger.info(result);
    return true;
  }

  sendSMS(number, message) {
    if (!number || !message) {
      errorHandler.handle(new Error("sendSMS missing required fields"), "notificationService");
      return false;
    }
    logger.info(`Sending SMS to ${number}`);
    logger.debug(`SMS payload: message=${message}`);
    const result = `[SMS] To: ${number} | Message: ${message}`;
    logger.info(result);
    return true;
  }

  sendPush(userId, message) {
    if (!userId || !message) {
      errorHandler.handle(new Error("sendPush missing required fields"), "notificationService");
      return false;
    }
    logger.info(`Sending push notification to ${userId}`);
    logger.debug(`Push payload: message=${message}`);
    const result = `[PUSH] User: ${userId} | Message: ${message}`;
    logger.info(result);
    return true;
  }
}

module.exports = new NotificationService();