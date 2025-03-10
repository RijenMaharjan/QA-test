const { expect } = require("@playwright/test");
const dashboardTestData = require("../Fixtures/Dashboard.fixtures.json");
const exp = require("constants");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.postCotent =
      '//*[@id="gabsocial"]/div/div[2]/div[2]/div/main/div/div[1]/div/div[2]/div[1]/div[2]/div/div/div/div/div[2]/div/div/div/div';
    this.postButton =
      '//*[@id="gabsocial"]/div/div[2]/div[2]/div/main/div/div[1]/div/div[2]/div[3]/div/div/button';

    //profile visit link
    this.profile =
      '//*[@id="gabsocial"]/div/div[2]/div[2]/header/div/div/div/nav/aside/div/a';
    //////////

    this.editHover =
      '//*[@id="gabsocial"]/div/div[2]/main/div[1]/div/div/div[2]/div[2]/div/div[2]/div[2]/div[1]/div/div/div/div/div/div[1]/div/div/div[1]/button';
    this.editButton =
      '//*[@id="gabsocial"]/div/div[4]/div[2]/div/div/div/div/button[5]';
    this.deleteButton =
      '//*[@id="gabsocial"]/div/div[4]/div[2]/div/div/div/div/button[4]';
    this.pressDelete =
      '//*[@id="gabsocial"]/div/div[3]/div[2]/div/div/div/div/div/div/button[2]';
    this.editField =
      '//*[@id="gabsocial"]/div/div[3]/div[2]/div/div/div[2]/div/div[1]/div[2]/div/div/div/div/div/div/div/div/div';
    this.savechanges =
      '//*[@id="gabsocial"]/div/div[3]/div[2]/div/div/div[2]/div/div[3]/div/div/button';

    //logout
    this.logoutHover = '//*[@id="nav-container"]/div/div[3]/button[3]';
    this.logoutPress =
      '//*[@id="gabsocial"]/div/div[4]/div[2]/div/div/div[3]/a/span';
    this.verifyLogout = '//*[@id="new_user"]/div[3]/button';

    //Edit Profile
    this.editBtn =
      '//*[@id="gabsocial"]/div/div[2]/main/div[1]/div/div/div[1]/div/div/div/div[2]/div[2]/div[2]/div[3]/button';
    this.bioEdit =
      '//*[@id="gabsocial"]/div/div[3]/div[2]/div/div/div[2]/div/div[3]/div[2]/div/div[2]/textarea';
    this.saveProfile =
      '//*[@id="gabsocial"]/div/div[3]/div[2]/div/div/div[1]/button[2]';
  }

  async postBlog() {
    await this.page
      .locator(this.postCotent)
      .fill(dashboardTestData.post.postCotent);
    await this.page.locator(this.postButton).click();
  }

  async editPost() {
    await this.page.locator(this.profile).click();
    await this.page.locator(this.editHover).click();
    await this.page.locator(this.editButton).click();
    await this.page.waitForTimeout(3000);
    await this.page
      .locator(this.editField)
      .fill(dashboardTestData.post.editContent);
    await this.page.locator(this.savechanges).click();
  }

  async deletePost() {
    await this.page.locator(this.profile).click();
    await this.page.locator(this.editHover).click();
    await this.page.locator(this.deleteButton).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.pressDelete).click();
  }

  async profileEdit() {
    await this.page.locator(this.profile).click();
    await this.page.locator(this.editBtn).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.bioEdit).fill(dashboardTestData.editBio.bio);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.saveProfile).click();
  }

  async profileEditVerify() {
    await expect(this.page).toHaveURL("https://gab.com/Rijen");
  }

  async logout() {
    await this.page.locator(this.logoutHover).click();
    await this.page.locator(this.logoutPress).click();
  }

  async logoutVerify() {
    await expect(this.page).toHaveURL("https://gab.com/");
  }
};
