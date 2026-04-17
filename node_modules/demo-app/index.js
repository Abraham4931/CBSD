import { Button } from "../../components/ui-components/index.js";
import { DataService } from "../../components/data-components/index.js";

const { default: logger } = await import("../../components/logger/index.cjs");
const { default: notifier } = await import("../../components/notificationService/index.cjs");

async function main() {
  logger.info("Demo app starting...");

  const button = new Button("Load Users");
  const dataService = new DataService();

  logger.info(button.render());
  button.click();
  logger.info("Button clicked, fetching users...");

  const data = await dataService.fetchData();

  logger.info("Displaying data:");
  data.forEach(user => logger.info(`- ${user}`));

  logger.info("Sending demo notifications...");
  notifier.notifyEmail("team@example.com", "Demo Data Loaded", `Loaded users: ${data.join(", ")}`);
  notifier.notifySMS("+1234567890", "Demo data load complete");
  notifier.notifyPush("demo-user", "User data has been fetched and displayed.");

  button.click();
  logger.info("Demo app finished.");
}

main();