export class Button {
  constructor(label) {
    this.label = label;
    this.clickCount = 0;
  }

  click() {
    this.clickCount++;
    console.log(`Button "${this.label}" clicked ${this.clickCount} times`);
  }

  render() {
    return `[ Button: ${this.label} ]`;
  }
}