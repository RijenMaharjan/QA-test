const { test, expect } = require("@playwright/test");
const LoginTestData = require("../../Fixtures/Login.fixtures.json");
const dashboardTestDataTestData = require("../../Fixtures/Dashboard.fixtures.json");
const { DashboardPage } = require("../../pageObjects/dashboard.po.js");
const { LoginPage } = require("../../pageObjects/login.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(
    LoginTestData.validUser.email,
    LoginTestData.validUser.password
  );
  await login.verifyValidLogin();
});

test.describe("Post Delete and Edit blog", () => {
  test.describe.configure({ mode: "serial" });
  test("create Blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.postBlog();
    // await dashboard.validatePosting();
  });

  test("edit blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.editPost();
    // await dashboard.verifyEdit();
  });

  test("delete blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.deletePost();
    // await dashboard.verifyEdit();
  });

  test("edit profile", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.profileEdit();
    await dashboard.profileEditVerify();
  });

  test("logout", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    await dashboard.logoutVerify();
  });
});
