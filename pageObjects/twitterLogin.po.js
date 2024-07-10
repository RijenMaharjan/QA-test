const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput =
      "(//span[contains(text(),'or')])[1]//following::input[1]";
    this.passwordInput =
      "(//span[contains(text(),'Enter your password')])[1]//following::input[1]//following::input[1]";
    this.signButton =
      '//*[@id="react-root"]/div/div/div[2]/main/div/div/div[1]/div/div/div[3]/div[4]/a';
    this.nextButton =
      "(//span[contains(text(),'or')])[1]//following::input[1]//following::button[1]";

    //////////------------Email--------------/////
    // If asks for email due to multiple login fail

    this.emailInput =
      "(//span[contains(text(),'Enter your phone number or email address')])[1]//following::span[1]//following::input[1]";
    this.EmailnextButton =
      "(//span[contains(text(),'Enter your phone number or email address')])[1]//following::span[1]//following::input[1]//following::button[1]";
    ///////////////////////////////////////////////////////////

    this.loginButton =
      "(//span[contains(text(),'Enter your password')])[1]//following::input[1]//following::input[1]//following::button[1]//following::span[contains(text(),'Forgot password?')]//following::button[1]";
    this.validLoginValidation =
      "(//span[contains(text(),'Home')]//following::span[contains(text(),'For you')])";
    this.errorMessage = "#error";
    this.crud = "";
  }

  async login(username, password, email) {
    await this.page.locator(this.signButton).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.nextButton).click();

    //////////------------Email--------------/////
    // If asks for email due to multiple login fail

    await this.page.waitForTimeout(2000);
    await this.page.locator(this.emailInput).fill("rijenmaharjan0@gmail.com");
    await this.page.locator(this.EmailnextButton).click();

    ///////////////////////////////////////////////////////////
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page.locator(this.validLoginValidation)).toHaveText(
      "For you"
    );
  }

  async errorLogin(error) {
    await expect(this.page.locator(this.errorMessage)).toHaveText(error);
  }
};
