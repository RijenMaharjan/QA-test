const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Add List", () => {
  test("Add", async ({ page }) => {});
});
