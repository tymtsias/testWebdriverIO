import { $ } from "@wdio/globals";
import checkoutFormValues from "../fixtures/checkoutFormValues.json";
import urls from "../fixtures/urls.json";
import LoginPage from "./login.page.js";
import Page from "./page.js";
class ShopPage extends Page {
  get burgerButton() {
    return $('button[id="react-burger-menu-btn"]');
  }

  get bmMenuList() {
    return $('nav[class="bm-item-list"]');
  }

  get bmMenuItems() {
    return $$('nav[class="bm-item-list"] > a');
  }

  get cartButton() {
    return $('[id="shopping_cart_container"]');
  }
  get cartButtonBadge() {
    return $('[class="shopping_cart_badge"]');
  }
  get checkuotButton() {
    return $('button[class="btn btn_action btn_medium checkout_button "]');
  }
  get checkoutFormFirstName() {
    return $('input[placeholder="First Name"]');
  }
  get checkoutFormLastName() {
    return $('input[placeholder="Last Name"]');
  }
  get checkoutFormPostalCode() {
    return $('input[placeholder="Zip/Postal Code"]');
  }
  get checkoutContinueButton() {
    return $('input[id="continue"]');
  }
  get checkoutFinishButton() {
    return $('button[id="finish"]');
  }

  get inventoryList() {
    return $('[class="inventory_list"]');
  }

  get logoutButton() {
    return $('a[id="logout_sidebar_link"]');
  }

  get sortOptionListButton() {
    return $('select[class="product_sort_container"]');
  }

  get baseContainer() {
    return $('div[class="inventory_item"]:nth-child(1)');
  }

  get firstItemAddButton() {
    return this.baseContainer.$("div:nth-child(2) > div:nth-child(2) > button");
  }

  get firstItemTitle() {
    return $('div[class="inventory_item"]:nth-child(1) > div[class="inventory_item_description"] > div > a > div');
  }
  get firstItemDescription() {
    return $(
      'div[class="inventory_item"]:nth-child(1) > div[class="inventory_item_description"] > div:nth-child(1) > div'
    );
  }
  get firstItemPrice() {
    return $(
      'div[class="inventory_item"]:nth-child(1) > div[class="inventory_item_description"] > div:nth-child(2) > div'
    );
  }

  get cartItemTitle() {
    return $('div[class="inventory_item_name"]');
  }
  get cartItemDescription() {
    return $('div[class="inventory_item_desc"]');
  }
  get cartItemPrice() {
    return $('div[class="inventory_item_price"]');
  }
  get checkoutHeader() {
    return $('span[class="title"]');
  }
  get completeHeader() {
    return $('h2[class="complete-header"]');
  }
  get backHomeButton() {
    return $('button[class="btn btn_primary btn_small"]');
  }

  get twitterButton() {
    return $('li[class="social_twitter"]');
  }
  get facebookButton() {
    return $('li[class="social_facebook"]');
  }
  get linkedinButton() {
    return $('li[class="social_linkedin"]');
  }

  async verifyLogout() {
    await this.openAndCheckBurgerButtonContent();
    await this.logoutButton.click();
    await LoginPage.verifyLoginPage();
    await expect(LoginPage.inputUsername).toHaveValue("");
    await expect(LoginPage.inputPassword).toHaveValue("");
  }

  async verifyAddedItemToCartBadge() {
    await expect(this.cartButtonBadge).toHaveText("1");
  }

  async verifyCartAfterLogout() {
    await this.firstItemAddButton.click();
    await this.verifyAddedItemToCartBadge();
    await this.openAndCheckBurgerButtonContent();
    await this.logoutButton.click();

    await LoginPage.login(process.env.VALID_LOGIN, process.env.VALID_PASSWORD);
    await this.verifyAddedItemToCartBadge();
  }

  async verifyCheckoutWithoutItems() {
    await this.cartButton.click();
    await this.checkuotButton.click();
    await this.checkoutContinueButton.click();
    // there is no Error message after clicking checkout button with empty cart
  }

  async verifyValidCheckout() {
    await this.firstItemAddButton.click();
    await this.verifyAddedItemToCartBadge();

    const [itemTitle, itemDescription, itemPrice] = await this.saveAddedItemValues();

    await this.cartButton.click();
    await this.verifyCartAndOverviewItem(itemTitle, itemDescription, itemPrice);

    await this.checkuotButton.click();
    await this.verifyAndFillCheckoutInfoFields();

    await this.checkoutContinueButton.click();
    await this.verifyCartAndOverviewItem(itemTitle, itemDescription, itemPrice);
    await this.verifyUrl(urls.checkoutOwerview);

    await expect(this.checkoutHeader).toHaveText("Checkout: Overview");

    await this.checkoutFinishButton.click();
    await this.verifyUrl(urls.checkoutCompleteUrl);
    await expect(this.completeHeader).toHaveText("Thank you for your order!");

    await this.backHomeButton.click();
    await this.verifyUrl(urls.inventoryUrl);

    await expect(this.inventoryList).toBeDisplayed();
    await expect(this.cartButtonBadge).not.toExist();
  }

  async verifySortingOptions(optionButton, sortingOption) {
    await this.sortOptionListButton.click();
    await this.sortOptionListButton.$(`option[value="${optionButton}"]`).click();
    let items = null;
    if (optionButton === "az" || optionButton === "za") {
      items = await this.getArrayOfNames();
    } else if (optionButton == "lohi" || optionButton == "hilo") {
      items = await this.getArrayOfPrices();
    } else {
      throw new Error("there is no such option");
    }
    let sortedItems = await items.toSorted(sortingOption);
    await expect(items).toStrictEqual(sortedItems);
  }

  async verifySocialsRedirections() {
    const socialsRedirectionsButtons = [this.twitterButton, this.facebookButton, this.linkedinButton];
    const socialsUrls = [urls.twitterUrl, urls.facebookUrl, urls.linkedinUrl];

    for (let i = 0; i < socialsRedirectionsButtons.length; i++) {
      await socialsRedirectionsButtons[i].click();
      await this.redirectToNewWindowAndVerifyUrl(socialsUrls[i]);
    }
  }

  async verifyInventoryPage() {
    await this.verifyUrl(urls.inventoryUrl);
    await expect(this.cartButton).toBeDisplayed();
    await expect(this.inventoryList).toBeDisplayed();
  }

  async saveAddedItemValues() {
    const itemTitle = await this.firstItemTitle.getText();
    const itemDescription = await this.firstItemDescription.getText();
    const itemPrice = await this.firstItemPrice.getText();
    return [itemTitle, itemDescription, itemPrice];
  }
  async verifyCartAndOverviewItem(itemTitle, itemDescription, itemPrice) {
    await expect(this.cartItemTitle).toHaveText(itemTitle);
    await expect(this.cartItemDescription).toHaveText(itemDescription);
    await expect(this.cartItemPrice).toHaveText(itemPrice);
  }

  async verifyAndFillCheckoutInfoFields() {
    await this.checkoutFormFirstName.isDisplayed();
    await this.checkoutFormLastName.isDisplayed();
    await this.checkoutFormPostalCode.isDisplayed();

    await this.checkoutFormFirstName.setValue(checkoutFormValues.firstName);
    await this.checkoutFormLastName.setValue(checkoutFormValues.lastName);
    await this.checkoutFormPostalCode.setValue(checkoutFormValues.postCode);

    await expect(this.checkoutFormFirstName).toHaveValue(checkoutFormValues.firstName);
    await expect(this.checkoutFormLastName).toHaveValue(checkoutFormValues.lastName);
    await expect(this.checkoutFormPostalCode).toHaveValue(checkoutFormValues.postCode);
  }

  async openAndCheckBurgerButtonContent() {
    await this.burgerButton.click();
    await expect(this.bmMenuList).toHaveChildren({ eq: 4 });
    await this.bmMenuItems.forEach((element) => {
      element.isDisplayed();
    });
  }

  async getArrayOfNames() {
    const itemNames = await $$('div[class="inventory_item_name "]').map((element) => element.getText());
    return itemNames;
  }

  async getArrayOfPrices() {
    const itemPrices = await $$('div[class="inventory_item_price"]')
      .map((element) => element.getText())
      .map((price) => price.replace(/^./, ""))
      .map((prices) => parseFloat(prices));
    return itemPrices;
  }

  async redirectToNewWindowAndVerifyUrl(url) {
    let handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
    await this.verifyUrl(expect.stringContaining(url));
    await browser.closeWindow();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open();
  }
}

export default new ShopPage();
