import { test, expect } from '@playwright/test';
import { ManagerPage } from '../pages/managerPage';
import { LoginPage } from '../pages/loginPage';


test.describe('Manager Role Tests', () => {

  let loginPage: LoginPage;
  let managerPage: ManagerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    managerPage = new ManagerPage(page);
  });
  
  test("Question 1", async ({ page }) => {
    await loginPage.goto();
    await loginPage.loginAsManager();

    const customers = [
      { firstName: "Christopher", lastName: "Connely", postCode: "L789C349" },
      { firstName: "Frank", lastName: "Christopher", postCode: "A897N450" },
      { firstName: "Christopher", lastName: "Minka", postCode: "M098Q585" },
      { firstName: "Connely", lastName: "Jackson", postCode: "L789C349" },
      { firstName: "Jackson", lastName: "Frank", postCode: "L789C349" },
      { firstName: "Minka", lastName: "Jackson", postCode: "A897N450" },
      { firstName: "Jackson", lastName: "Connely", postCode: "L789C349" },
    ];

    for (const customer of customers) {
      await managerPage.addCustomer(
        customer.firstName,
        customer.lastName,
        customer.postCode
      );
    }
    
    // Verify a specific customer was added
    await managerPage.verifyCustomerAdded('Minka', 'Jackson', 'A897N450');
    const customerRow = managerPage.getCustomerRow('Jackson', 'Connely', 'L789C349');
    await page.waitForTimeout(2000);

    // Delete customers by name
    await managerPage.deleteCustomerByName("Jackson", "Frank", "L789C349");
    await managerPage.deleteCustomerByName("Christopher", "Connely", "L789C349");

    // Take screenshot after deletions
    await page.screenshot({
      path: `screenshots/afterDeleting.png`,
      fullPage: true,
    });

    // Close page
    await page.close();
  });
});