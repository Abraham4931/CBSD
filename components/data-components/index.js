export class DataService {
  constructor() {
    this.data = [];
  }

  async fetchData() {
    console.log("Fetching data...");

    return new Promise((resolve) => {
      setTimeout(() => {
        this.data = ["User1", "User2", "User3"];
        console.log("Data fetched:", this.data);
        resolve(this.data);
      }, 1000);
    });
  }

  getData() {
    return this.data;
  }
}