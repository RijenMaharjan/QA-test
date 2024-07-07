const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test.describe("Valid login test", () => {
  test("login", async ({ page }) => {
    await page.locator("#username").fill(testData.validUser.username);
    await page.locator("#password").fill(testData.validUser.password);
    await page.locator("#submit").click();

    await expect(page.locator(".post-title")).toHaveText(
      /Logged In Successfully/
    );
  });
});

test.describe("Invalid login test", () => {
  // test("negativeUsername", async ({ page }) => {
  //   await page.locator("#username").fill(testData.validUser.username);
  //   await page.locator("#password").fill(testData.validUser.password);
  //   await page.locator("#submit").click();
  //   const errorMessage = await page.locator("#error").textContent();
  //   expect(errorMessage).toContain("Your username is invalid!");
  // });

  test("negativePassword", async ({ page }) => {
    await page.locator("#username").fill("student");
    await page.locator("#password").fill("Password12345");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });

  test("emptyField", async ({ page }) => {
    await page.locator("#username").fill("");
    await page.locator("#password").fill("");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("emptyUsername", async ({ page }) => {
    await page.locator("#username").fill("");
    await page.locator("#password").fill("Password123");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("emptyPassword", async ({ page }) => {
    await page.locator("#username").fill("student");
    await page.locator("#password").fill("");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });

  test("Username with leading spaces", async ({ page }) => {
    await page.locator("#username").fill("     student");
    await page.locator("#password").fill("");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your username is invalid!");
  });

  test("Password with leading spaces", async ({ page }) => {
    await page.locator("#username").fill("student");
    await page.locator("#password").fill("    Password123");
    await page.locator("#submit").click();
    const errorMessage = await page.locator("#error").textContent();
    expect(errorMessage).toContain("Your password is invalid!");
  });
});
