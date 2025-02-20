import LoginPage from "../../pageobjects/login.page";
import ShopPage from "../../pageobjects/shop.page";

describe("Swag Labs Tests", () => {
  before(async () => {
    await LoginPage.openMainUrlAndVerifyLoginPage();
    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
  });

  it("Valid Checkout", async () => {
    await ShopPage.verifyValidCheckout();
  });
});
