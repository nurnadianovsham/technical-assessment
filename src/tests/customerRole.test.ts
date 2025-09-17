import { test, expect } from '@playwright/test';
import { CustomerPage } from '../pages/customerPage';
import { LoginPage } from '../pages/loginPage';


test.describe('Customer Role Tests', () => {

  let loginPage: LoginPage;
  let customerPage: CustomerPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    customerPage = new CustomerPage(page);
  });
  
  test("Question 2", async ({ page }) => {
    await loginPage.goto();
    await customerPage.loginCustomer('Hermoine Granger');
    await customerPage.selectAccount('1003');
    await customerPage.revealBalance();

   // Get initial balance
  let currentBalance = await customerPage.getBalance();

  const transactions = [
    { amount: 50000, type: 'Credit' },
    { amount: 3000, type: 'Debit' },
    { amount: 2000, type: 'Debit' },
    { amount: 5000, type: 'Credit' },
    { amount: 10000, type: 'Debit' },
    { amount: 15000, type: 'Debit' },
    { amount: 1500, type: 'Credit' },
  ];

   // Perform transactions and verify balance after each
  for (const tx of transactions) {
    if (tx.type === 'Debit') {
      await customerPage.withdraw(tx.amount);
      currentBalance -= tx.amount;
    } else {
      await customerPage.deposit(tx.amount);
      currentBalance += tx.amount;
    }

    const displayedBalance = await customerPage.getBalance();
    expect(displayedBalance).toBe(currentBalance);
    console.log(`After ${tx.type} of ${tx.amount}, expected balance: ${currentBalance}, displayed balance: ${displayedBalance}`);
  }

   // Close page
    await page.close();
});

});