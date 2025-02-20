import { setExport } from "../../fixtures/customMatch.js";
import LoginPage from "../../pageobjects/login.page.js";

describe("Swag Labs Tests", () => {
  before(async () => {
    setExport();
    await LoginPage.openMainUrlAndVerifyLoginPage();
  });

  it("Login with invalid login", async () => {
    await LoginPage.login("cdcvdc", process.env.VALID_PASSWORD);
    await LoginPage.verifyAllErrorButtonsAndErrorMessage();
  });
});
