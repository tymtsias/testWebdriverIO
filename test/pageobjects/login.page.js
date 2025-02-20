import { $ } from "@wdio/globals";
import urls from "../fixtures/urls.json";
import Page from "./page.js";

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('input[placeholder="Username"]');
  }

  get inputPassword() {
    return $('input[placeholder="Password"]');
  }

  get btnSubmit() {
    return $('input[id="login-button');
  }

  get loginAndPassErrorButtons() {
    return $$('svg[data-icon="times-circle"]');
  }
  get errorMessageContainerButton() {
    return $('button[class="error-button"] > svg[data-icon="times"]');
  }
  get errorrMessageContainerText() {
    return $('h3[data-test="error"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await expect(this.inputUsername).toHaveAttribute("value"); // VERIFY ENTERED value
    await this.inputPassword.setValue(password);
    await expect(this.inputPassword).toHaveAttribute("value");
    await expect(this.inputPassword).toHaveAttribute("type", expect.stringContaining("password"));
    await this.btnSubmit.click();
  }

  async verifyLoginPage() {
    await this.verifyUrl(urls.mainUrl);
    await expect(browser).toHaveTitle(expect.stringContaining("Swag Labs"));
  }

  async verifyAllErrorButtonsAndErrorMessage() {
    await expect(this.loginAndPassErrorButtons).checkArray("error buttons");
    await this.loginAndPassErrorButtons.forEach((element) => {
      element.isDisplayed();
    });
    expect(this.errorMessageContainerButton).toBeDisplayed();
    expect(this.errorrMessageContainerText).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }

  async openMainUrlAndVerifyLoginPage() {
    await this.open();
    await this.verifyLoginPage();
  }

  /**
   * overwrite specific options to adapt it to page object
   */

  open() {
    return super.open();
  }
}

export default new LoginPage();
