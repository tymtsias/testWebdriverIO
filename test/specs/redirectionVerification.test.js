import LoginPage from "../pageobjects/login.page.js";
import ShopPage from "../pageobjects/shop.page.js";

describe("Swag Labs Tests", () => {
  it("Redirecting to socials", async () => {
    await LoginPage.openMainUrlAndVerifyLoginPage();
    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
    await ShopPage.verifySocialsRedirections();
  });
});
