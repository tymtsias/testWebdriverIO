import urls from "../../fixtures/urls.json";
import LoginPage from "../../pageobjects/login.page.js";
import ShopPage from "../../pageobjects/shop.page.js";

describe("Swag Labs Tests", () => {
  before(async () => {
    await LoginPage.openMainUrlAndVerifyLoginPage();
    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
    await LoginPage.verifyUrl(urls.inventoryUrl);
  });

  it("Checkout without products", async () => {
    await ShopPage.verifyCheckoutWithoutItems();
  });
});
