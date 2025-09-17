import { test, expect, Page, Locator } from "@playwright/test";

export class LoginPage {

  readonly page: Page;
  readonly homebutton: Locator;
  readonly bankManagerButton: Locator;
  readonly customerButton: Locator;
  readonly bankName: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.homebutton = page.getByRole('button', { name: 'Home' });
    this.bankManagerButton = page.getByRole('button', { name: 'Bank Manager Login' })
    this.customerButton = page.getByRole('button', { name: 'Customer Login' })
    this.bankName = page.getByText('XYZ Bank');
  }

  // Method to navigate to login page
  async goto() {
    await this.page.goto("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login");
    await expect(this.page).toHaveURL(/.*login/);
    await expect(this.bankName).toBeVisible();
  }

  // Method to login as manager
  async loginAsManager() {
    await expect(this.bankManagerButton).toBeVisible();
    await this.bankManagerButton.click();
  }

  // Method to login as customer
  async loginAsCustomer() {
    await expect(this.customerButton).toBeVisible();
    await this.customerButton.click();
  }
}
