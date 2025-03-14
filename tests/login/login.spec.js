const { test, expect } = require("@playwright/test");
const testData = require("../../Fixtures/Login.fixtures.json");
const { LoginPage } = require("../../pageObjects/login.po");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login test", () => {
  test.describe("invalid login tests", () => {
    test.describe.configure({ mode: "serial" });
    test("login invalid", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.invalidCredentials.email,
        testData.invalidUser.invalidCredentials.password
      );

      await login.invalidLogin();
    });

    test("empty field", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyField.email,
        testData.invalidUser.emptyField.password
      );
      await login.invalidLogin();
    });

    test("email empty", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyEmail.email,
        testData.invalidUser.emptyEmail.password
      );
      await login.invalidLogin();
    });

    test("Password empty", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.emptyPassword.email,
        testData.invalidUser.emptyPassword.password
      );
      await login.invalidLogin();
    });

    // test("email with leading space", async ({ page }) => {
    //   const login = new LoginPage(page);
    //   await login.login(
    //     testData.invalidUser.emailLeadingSpace.email,
    //     testData.invalidUser.emailLeadingSpace.password
    //   );
    //   await page.waitForTimeout(3000);
    //   await login.verifyValidLogin();
    // });

    test("password with leading space", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.passwordLeadingSpace.email,
        testData.invalidUser.passwordLeadingSpace.password
      );
      await login.invalidLogin();
    });
  });
  test.describe.configure({ mode: "serial" });
  test.describe("valid login test", () => {
    test("valid login", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(testData.validUser.email, testData.validUser.password);
    });
  });
});
