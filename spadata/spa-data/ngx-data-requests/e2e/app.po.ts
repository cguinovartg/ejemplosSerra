import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateToAppInContainer() {
    browser.waitForAngularEnabled(false);
    this.navigateTo('/area-privada');
    expect(this.getLoginTitle()).toEqual('Iniciar Sesión');

    const user = this.getLoginInputUser();
    const password = this.getLoginInputPassword();
    const submitButton = this.getLoginSubmitButton();

    user.sendKeys('pa174990');
    password.sendKeys('despwd');
    submitButton.click();
    browser.sleep(2000);

    const newLoginButton = await this.getMediatorButton();
    expect(newLoginButton).toBeTruthy();
    browser.sleep(2000);

    return await this.getLinkToAngularApp();
  }

  navigateTo(url) {
    return browser.get(url);
  }

  getLoginTitle() {
    return element(by.css('.c-heading')).getText();
  }

  getLoginInputUser() {
    return element(by.id('usuario'));
  }

  getLoginInputPassword() {
    return element(by.id('password'));
  }

  getLoginSubmitButton() {
    return element(by.id('_58_login_button'));
  }

  async getMediatorButton() {
    await browser.driver.findElements(by.id('mediatorBoxInfoBtn'));
    return await element(by.id('mediatorBoxInfoBtn'));
  }

  async getLinkToAngularApp() {
    await this.getLinkMenu();
    browser.sleep(1000);
    await this.getLinkLevel1();
    browser.sleep(1000);
    return await this.getLinkLevel2();
  }
  async getLinkMenu() {
    await browser.driver.findElements(by.css('#menuPrincipal3 > a'));
    const menuLink = await element(by.css('#menuPrincipal3 > a'));
    menuLink.click();
  }

  async getLinkLevel1() {
    await browser.driver.findElements(by.css('#ulMenuPrincipal3 > li:first-child > a'));
    const menuLink = await element(by.css('#ulMenuPrincipal3 > li:first-child > a'));
    menuLink.click();
  }

  async getLinkLevel2() {
    await browser.driver.findElements(by.css('#ulMenuPrincipal3 > li:first-child > ul > li:first-child > a'));
    return await element(by.css('#ulMenuPrincipal3 > li:first-child > ul > li:first-child > a'));
  }

  getIntoIframe() {
    const driver = browser.driver;
    const loc = by.id('appArea');
    const el = driver.findElement(loc);
    browser.switchTo().frame(el);
  }

  getFirstMenuLink() {
    return browser.driver.findElement(by.className('c-subnavbar__link'));
  }

  getMediatorId() {
    return browser.driver.findElement(by.className('agent-display-field'));
  }

  getDropdown() {
    return browser.driver.findElement(by.tagName('nx-dropdown'));
  }

  getFirstOption() {
    return browser.driver.findElement(by.className('nx-dropdown-results__option-label'));
  }
}
