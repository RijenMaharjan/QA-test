const { test, expect } = require("@playwright/test");
const twitterData = require("../../fixture/twitterLogin.json");
import { LoginPage } from "../../pageObjects/twitterLogin.po";
const { twitterDashboard } = require("../../pageObjects/twitterDashboard.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(
    twitterData.validUser.username,
    twitterData.validUser.password
  );
  // await login.verifyValidLogin();
});

test.describe("twitter dashboard check", () => {
  test("post", async ({ page }) => {
    const tdashboard = new twitterDashboard(page);
    await tdashboard.press();
    await tdashboard.search();
  });
});
