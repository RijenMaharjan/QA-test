const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.v2.json");
import { LoginPage } from "../../pageObjects/login.v2.po";

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// });

// test("has title", async ({ page }) => {
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Contact List App/);
// });

test.describe.skip("valid login tests", () => {
  test("login valid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.email, testData.validUser.password);
    await login.verifyValidLogin();
  });
});
