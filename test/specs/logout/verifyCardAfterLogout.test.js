import LoginPage from "../../pageobjects/login.page.js";
import ShopPage from "../../pageobjects/shop.page.js";

describe("Swag Labs Tests", () => {
  before(async () => {
    await LoginPage.openMainUrlAndVerifyLoginPage();
    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
  });

  it("Saving the card after logout", async () => {
    await ShopPage.verifyCartAfterLogout();
  });
});
