const logger = require("../logger");

class NotificationService {
  sendEmail(to, subject, message) {
    logger.info(`Sending email to ${to}`);
    logger.debug(`Email payload: subject=${subject}, message=${message}`);
    // Simulated email sending
    const result = `[EMAIL] To: ${to} | Subject: ${subject} | Message: ${message}`;
    logger.info(result);
    return true;
  }

  sendSMS(number, message) {
    logger.info(`Sending SMS to ${number}`);
    logger.debug(`SMS payload: message=${message}`);
    // Simulated SMS sending
    const result = `[SMS] To: ${number} | Message: ${message}`;
    logger.info(result);
    return true;
  }

  sendPush(userId, message) {
    logger.info(`Sending push notification to ${userId}`);
    logger.debug(`Push payload: message=${message}`);
    // Simulated push notification
    const result = `[PUSH] User: ${userId} | Message: ${message}`;
    logger.info(result);
    return true;
  }
}

module.exports = new NotificationService();