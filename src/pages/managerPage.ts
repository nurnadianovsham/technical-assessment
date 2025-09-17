import { expect, Page, Locator, Dialog } from "@playwright/test";
import { time } from "console";

export class ManagerPage {

  readonly page: Page;
  readonly addCustomerButton: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly postCodeField: Locator;
  readonly submitCustomerButton: Locator;
  readonly customersButton: Locator;
  readonly customerTable: Locator;
  readonly deleteFrankButton: Locator;
  readonly deleteConnelyButton: Locator;

  
  constructor(page: Page) {
    this.page = page;
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer" }).first();
    this.firstNameField = page.getByPlaceholder("First Name");
    this.lastNameField = page.getByPlaceholder("Last Name");
    this.postCodeField = page.getByPlaceholder("Post Code");
    this.submitCustomerButton = page.getByRole("form").getByRole("button", { name: "Add Customer" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    this.customerTable = page.locator("table");

    this.deleteFrankButton = page.getByRole('row', { name: 'Jackson Frank L789C349 Delete' }).getByRole('button');
    this.deleteConnelyButton = page.getByRole('row', { name: 'Christopher Connely L789C349 Delete' }).getByRole('button');
  }
    //Helper method to dynamically get a customer row
  getCustomerRow(firstName: string, lastName: string, postCode: string) {
    return this.page.locator("tr", { hasText: `${firstName} ${lastName}` });
  }

  // Method to add a customer
  async addCustomer(firstName: string, lastName: string, postCode: string) {
    await this.addCustomerButton.click();
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postCodeField.fill(postCode);
    await this.page.waitForTimeout(1000);
    this.page.once("dialog", (dialog: Dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.submitCustomerButton.click();
  }

  // Method to verify a customer was added
  async verifyCustomerAdded(firstName: string, lastName: string, postCode: string) {
    await this.customersButton.click();
    const customerRow = this.getCustomerRow(firstName, lastName, postCode);
    await expect(customerRow).toBeVisible({ timeout: 5000 });
    await this.page.screenshot({ path: 'screenshots/allCustomersAdded.png', fullPage: true });
  }

  // Method to delete customer by name
  async deleteCustomerByName(firstName: string, lastName: string, postCode: string) {
    await this.customersButton.click();
    // Locate row dynamically
    const customerRow = this.getCustomerRow(firstName, lastName, postCode);
    await expect(customerRow).toBeVisible();
    await customerRow.getByRole('button', { name: 'Delete' }).click();
    console.log(`Deleted customer: ${firstName} ${lastName} (${postCode})`);
  }

  
}

