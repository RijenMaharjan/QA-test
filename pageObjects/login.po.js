const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = '//*[@id="user_email"]';
    this.password = '//*[@id="user_password"]';
    // this.loginButton =
    //   '//*[@id="root"]/div[1]/main/section/div[2]/div/div[2]/div/a[1]/button';
    this.loginButton = '//*[@id="new_user"]/div[3]/button';
    this.errorMessage = "xpath=//html/body/div/div[2]/div[1]/strong";
    this.dashboardLogingButton =
      '//*[@id="root"]/div[1]/main/section/div[2]/div/div[2]/div/a[1]/button';
    // this.dashboardLogingButton =
    //   '//*[@id="gabsocial"]/div/div[2]/div[1]/div/div/div/div[3]/div/a[1]/span';
  }

  async login(email, password) {
    await this.page.locator(this.dashboardLogingButton).click();
    await this.page.locator(this.email).fill(email);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.loginButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page).toHaveURL("https://gab.com/home");
  }
  async invalidLogin() {
    await expect(this.page.locator(this.errorMessage)).toHaveText(
      "Invalid Email or password."
    );
  }
};
