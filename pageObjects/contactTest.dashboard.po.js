const { test, expect } = require("@playwright/test");
const testData = require("../fixture/login.v2.json");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.firstName = '//*[@id="firstName"]';
    this.lastName = '//*[@id="lastName"]';
    this.dob = '//*[@id="birthdate"]';
    this.email = '//*[@id="email"]';
    this.phone = '//*[@id="phone"]';
    this.street1 = '//*[@id="street1"]';
    this.street2 = '//*[@id="street2"]';
    this.city = '//*[@id="city"]';
    this.state = '//*[@id="stateProvince"]';
    this.postalCode = '//*[@id="postalCode"]';
    this.country = '//*[@id="country"]';
    this.submitButton = '//*[@id="submit"]';
    this.cancelButton = '//*[@id="cancel"]';
    this.validateFormFilled = '(//td[contains(text(),"Rijen Maharjan")])';
    this.editButton = '//*[@id="edit-contact"]';
    this.editName = '//*[@id="firstName"]';
    this.editSubmit = '//*[@id="submit"]';
    this.deleteButton = '//*[@id="delete"]';
    this.logoutButton = '//*[@id="logout"]';
    this.loginPageHeading = "//html/body/h1";
    this.deleteValidation = "//html/body/div[1]/header/h1";
  }

  async fillForm() {
    await this.page.locator(this.firstName).fill(testData.fillForm.firstName);
    await this.page.locator(this.lastName).fill(testData.fillForm.lastName);
    await this.page.locator(this.dob).fill(testData.fillForm.dob);
    await this.page.locator(this.email).fill(testData.fillForm.email);
    await this.page.locator(this.phone).fill(testData.fillForm.phone);
    await this.page.locator(this.street1).fill(testData.fillForm.street1);
    await this.page.locator(this.street2).fill(testData.fillForm.street2);
    await this.page.locator(this.city).fill(testData.fillForm.city);
    await this.page.locator(this.state).fill(testData.fillForm.state);
    await this.page.locator(this.postalCode).fill(testData.fillForm.postalcode);
    await this.page.locator(this.country).fill(testData.fillForm.country);

    await this.page.waitForTimeout(2000);
    await this.page.locator(this.submitButton).click();
  }

  async validFill() {
    await this.page.waitForTimeout(2000);
    await expect(this.page.locator(this.validateFormFilled)).toHaveText(
      `${testData.fillForm.firstName} ${testData.fillForm.lastName}`
    );
  }

  async editData() {
    await this.page.locator(this.validateFormFilled).click();

    await this.page.locator(this.editButton).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.editName).fill(testData.fillForm.editName);
    await this.page.locator(this.editSubmit).click();
  }

  async validEdit() {
    await expect(this.page.locator('//*[@id="firstName"]')).toHaveText(
      testData.fillForm.editName
    );
  }

  async deleteData() {
    await this.page.locator(this.deleteButton).click();
    this.page.on("dialog", (dialog) => dialog.accept());
  }

  async validDelete() {
    await this.page.waitForTimeout(3000);
    await expect(this.page.locator(this.deleteValidation)).toHaveText(
      "Contact Details"
    );
  }

  async logout() {
    await this.page.locator(this.logoutButton).click();
  }

  async validLogout() {
    await expect(this.page.locator(this.loginPageHeading)).toHaveText(
      "Contact List App"
    );
  }
};
