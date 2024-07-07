const { expect } = require("@playwright/test");

exports.DashboardPage1 = class DashboardPage1 {
  constructor(page) {
    this.page = page;
    this.validLoginValidation = ".post-title";
    this.errorMessage = "#error";
    this.crud = "";
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Logged In Successfully"
    );
  }
};
