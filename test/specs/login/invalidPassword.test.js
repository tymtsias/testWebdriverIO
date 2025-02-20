import { setExport } from "../../fixtures/customMatch";
import LoginPage from "../../pageobjects/login.page.js";

describe("Swag Labs Tests", () => {
  before(async () => {
    setExport();
    await LoginPage.openMainUrlAndVerifyLoginPage();
  });

  it("Login with invalid password", async () => {
    await LoginPage.login(process.env.VALID_LOGIN, "sssdasd");
    await LoginPage.verifyAllErrorButtonsAndErrorMessage();
  });
});
