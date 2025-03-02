const { test, expect } = require("@playwright/test");
const testData = require("../../fixture/login.json");
import { LoginPage } from "../../pageObjects/login.po";
import { DashboardPage } from "../../pageObjects/dashboard.po";
const { getCurrrentDateTimeStamp } = require("../../utils/helper.spec");

// test.beforeEach(async ({ page }) => {
//   await page.goto("./");
// });

test.describe.skip("Dashboard crud check", () => {
  test("crud", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(testData.validUser.username, testData.validUser.password);

    await login.verifyValidLogin();
    await page.locator('//*[@id="menu-item-20"]/a').click();
    const nowdate = getCurrrentDateTimeStamp();
    console.log(nowdate);

    await expect(
      page.locator('//*[@id="loop-container"]/div/article/div[1]/h1')
    ).toHaveText("Practice");

    await page
      .locator('//*[@id="loop-container"]/div/article/div[2]/div[2]/div[1]/p/a')
      .click();

    await expect(page.locator('//*[@id="food_list"]/h2')).toHaveText(
      "Test Exceptions"
    );

    // await page.waitForTimeout(2000);

    await page.locator('//*[@id="add_btn"]').click();

    const inputElement = page.locator('//*[@id="row2"]/input');
    // await inputElement.waitFor({ state: "visible", timeout: 60000 });

    await inputElement.fill("MoMo");

    await page.waitForTimeout(2000);

    const savebtn = page.locator('//*[@id="save_btn"]').nth(1);

    await savebtn.click();
    await page.waitForTimeout(2000);

    await expect(page.locator('//*[@id="row2"]/input')).toHaveValue("MoMo");
    await expect(page.locator('//*[@id="confirmation"]')).toHaveText(
      "Row 2 was saved"
    );

    await page.locator('//*[@id="edit_btn"]').nth(1).click();

    await page.locator('//*[@id="row2"]/input').fill("Chowmein");
    const savebtnforedit = page.locator('//*[@id="save_btn"]').nth(1);
    savebtnforedit.click();
    await expect(page.locator('//*[@id="row2"]/input')).toHaveValue("Chowmein");

    await page.locator('//*[@id="remove_btn"]').click();

    await expect(page.locator('//*[@id="confirmation"]')).toHaveText(
      "Row 2 was removed"
    );
  });
});
