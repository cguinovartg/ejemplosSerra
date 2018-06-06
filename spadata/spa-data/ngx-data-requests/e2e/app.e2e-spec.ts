import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('allianz-seed App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Load angular App inside iframe', async() => {
    const angularAppLink = await page.navigateToAppInContainer();
    angularAppLink.click();
    browser.sleep(2000);

    page.getIntoIframe();

    const link = page.getFirstMenuLink();
    expect(link.getText()).toContain('DGS');
  });

  it('Check mediator ID', async() => {
    page.getFirstMenuLink().click();
    browser.sleep(2000);

    const mediatorInput = page.getMediatorId();
    expect(mediatorInput.getAttribute('value')).toBe('9510278');
  });

  it('Crate DGS petition', async() => {
    page.getDropdown().click();
    browser.sleep(1000);

    const option = page.getFirstOption();
    expect(option.getText()).toContain('0000000-0000');
  });
});
