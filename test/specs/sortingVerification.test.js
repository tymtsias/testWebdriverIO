import LoginPage from "../pageobjects/login.page.js";
import ShopPage from "../pageobjects/shop.page.js";

describe("Swag Labs Tests", () => {
  before(async () => {
    await LoginPage.openMainUrlAndVerifyLoginPage();
    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
  });
  it("Sorting", async () => {
    await ShopPage.verifySortingOptions("az", (a, b) => a.localeCompare(b));
    await ShopPage.verifySortingOptions("za", (a, b) => b.localeCompare(a));
    await ShopPage.verifySortingOptions("lohi", (a, b) => a - b);
    await ShopPage.verifySortingOptions("hilo", (a, b) => b - a);
  });
});
