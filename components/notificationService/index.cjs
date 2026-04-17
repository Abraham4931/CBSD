const notificationService = require("./notificationService.js");

module.exports = {
  notifyEmail: notificationService.sendEmail,
  notifySMS: notificationService.sendSMS,
  notifyPush: notificationService.sendPush
};
