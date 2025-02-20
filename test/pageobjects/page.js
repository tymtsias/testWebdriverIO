import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  async verifyUrl(url) {
    await expect(browser).toHaveUrl(url);
  }

  /**
   * Opens a sub page of the page
   * @param path path of the sub page (e.g. /path/to/page.html)
   */
  open() {
    return browser.url(`https://www.saucedemo.com/`);
  }
}
