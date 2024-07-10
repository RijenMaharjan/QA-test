const { test, expect } = require("@playwright/test");
const testData = require("../fixture/twitterLogin.json");

exports.twitterDashboard = class twitterDashboard {
  constructor(page) {
    this.page = page;
    this.searchButton = "//h1[1]//following::a[1]";
    this.searchPage = "//input[1]";
    this.searchedPage =
      "(//span[contains(text(),'Search for')])//following::button[2]";
  }

  async press() {
    await this.page.locator(this.searchButton).click();
  }

  async search() {
    await this.page.locator(this.searchPage).fill("@hellomag");
    await this.page.locator(this.searchedPage).click();
  }
};
