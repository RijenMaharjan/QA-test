const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput =
      "(//span[contains(text(),'or')])[1]//following::input[1]";
    this.passwordInput =
      '//*[@id="react-root"]/div/div/div/main/div/div/div/div[2]/div[2]/div[1]/div/div/div/div[3]/div/label/div/div[2]/div[1]/input';
    this.signButton =
      '//*[@id="react-root"]/div/div/div[2]/main/div/div/div[1]/div/div/div[3]/div[4]/a';
    this.nextButton =
      "(//span[contains(text(),'or')])[1]//following::input[1]//following::button[1]";
    this.loginButton =
      '//*[@id="react-root"]/div/div/div/main/div/div/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div/button';
    this.validLoginValidation =
      '//*[@id="react-root"]/div/div/div[2]/main/div/div/div/div/div/div[1]/div[1]/div[1]/div/div/div/div/div/div/h2/span';
    this.errorMessage = "#error";
    this.crud = "";
  }

  async login(username, password) {
    await this.page.locator(this.signButton).click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.nextButton).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "Home"
    );
  }

  async errorLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
