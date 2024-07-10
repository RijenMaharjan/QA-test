const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.v2.json");
const { LoginPage } = require("../../pageObjects/login.v2.po");
const { DashboardPage } = require("../../pageObjects/contactTest.dashboard.po");
const { createEntity, authenticateUser1 } = require("../../utils/helper.spec");
const { access } = require("fs");

let interceptId;

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
//   const login = new LoginPage(page);
//   await login.login(testData.validUser.email, testData.validUser.password);
//   await login.verifyValidLogin();
// });

test.describe.skip("Dashboard crud check", () => {
  test("crud", async ({ page }) => {
    await page.locator('//*[@id="add-contact"]').click();

    const dashboard = new DashboardPage(page);
    await dashboard.fillForm();
    await dashboard.validFill();
    await dashboard.editData();
    await dashboard.validEdit();
    await dashboard.deleteData();
    await dashboard.validDelete();
    await dashboard.logout();
    await dashboard.validLogout();

    await page.waitForTimeout(10000);
  });

  test("contact edit test", async ({ context, page, request }) => {
    const dashboardPage = new DashboardPage(page);
    const Data = { firstName: "Rijen", lastName: "Maharjan" };
    const accessToken = await authenticateUser1({ request });
    const entityId = await createEntity(Data, accessToken, "contacts", {
      request,
    });
    await intercept("https://thinking-tester-contact-list.herokuapp.com/", {
      context,
      page,
    });
    page.reload();
    page.waitForTimeout(5000);
    await dashboardPage.editData();
    await page.waitForTimeout(5000);
    await deleteEntity(accessToken, "contacts/$(interceptId)", { request });
    await validEntity(accessToken, "contacts/$(interceptId)", { request });
  });
});

async function intercept(module, { context, page }) {
  await context.route(module, async (route) => {
    await route.continue();
    const response = await page.waitForResponse(module);
    const responseBody = await response.json();
    interceptId = responseBody._id;
  });
}
