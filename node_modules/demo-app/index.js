import { Button } from "../../components/ui-components/index.js";
import { DataService } from "../../components/data-components/index.js";

async function main() {
  const button = new Button("Load Users");
  const dataService = new DataService();

  console.log(button.render());

  // Simulate user clicking button
  button.click();

  // Fetch data when button is clicked
  const data = await dataService.fetchData();

  console.log("Displaying data:");
  data.forEach(user => console.log("- " + user));

  // Click again
  button.click();
}

main();