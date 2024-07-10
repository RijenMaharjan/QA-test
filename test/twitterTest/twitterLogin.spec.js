const { test, expect } = require("@playwright/test");
const twitterData = require("../../fixture/twitterLogin.json");
import { LoginPage } from "../../pageObjects/twitterLogin.po";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("X. It’s what’s happening / X");
});

test.describe("valid login tests", () => {
  test("login valid", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(
      twitterData.validUser.username,
      twitterData.validUser.password
    );
    await login.verifyValidLogin();
  });
});
