import { Button } from "../../components/ui-components/index.js";
import { DataService } from "../../components/data-components/index.js";
import { EventEmitter } from "../../components/event-emitter/index.js";

const { default: logger } = await import("../../components/logger/index.cjs");
const { default: notifier } = await import("../../components/notificationService/index.cjs");
const { default: auth } = await import("../../components/auth-service/index.cjs");
const { default: cache } = await import("../../components/cache-service/index.cjs");

async function main() {
  logger.info("Demo app starting...");

  const emitter = new EventEmitter();
  const button = new Button("Load Users");
  const dataService = new DataService();

  // Auth: login before doing anything
  const token = auth.login("demo-user", "password123");
  if (!auth.isAuthenticated("demo-user")) {
    logger.error("User not authenticated, aborting.");
    return;
  }
  logger.info(`Authenticated with token: ${token}`);

  // Event: listen for data loaded event
  emitter.on("data:loaded", (data) => {
    logger.info("Event received: data:loaded");
    notifier.notifyEmail("team@example.com", "Demo Data Loaded", `Loaded users: ${data.join(", ")}`);
    notifier.notifySMS("+1234567890", "Demo data load complete");
    notifier.notifyPush("demo-user", "User data has been fetched and displayed.");
  });

  // UI: render and click button
  logger.info(button.render());
  button.click();
  logger.info("Button clicked, fetching users...");

  // Data: fetch (cache-aware)
  const data = await dataService.fetchData();

  logger.info("Displaying data:");
  data.forEach(user => logger.info(`- ${user}`));

  // Emit data loaded event
  emitter.emit("data:loaded", data);

  // Second fetch: should hit cache
  logger.info("Fetching again (should hit cache)...");
  await dataService.fetchData();

  // Cache: manual check
  logger.info(`Cache has users: ${cache.has("data:users")}`);

  button.click();

  // Auth: logout
  auth.logout("demo-user");
  logger.info(`Still authenticated: ${auth.isAuthenticated("demo-user")}`);

  logger.info("Demo app finished.");
}

main();
