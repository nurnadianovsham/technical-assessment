import { test, expect, Page, Locator } from '@playwright/test';


export class CustomerPage {

  readonly page: Page;
  readonly homebutton: Locator;
  readonly nameButton: Locator;
  readonly customerloginButton: Locator;
  readonly loginButton: Locator;
  readonly userSelectDropdown: Locator; 
  readonly accountSelectDropdown: Locator;
  readonly welcomeText: Locator;
  readonly transactionButton: Locator;
  readonly backButton: Locator;
  readonly depositButton: Locator;
  readonly depositFormButton: Locator;
  readonly amountInput: Locator;
  readonly withdrawlButton: Locator;
  readonly withdrawButton: Locator;
  readonly amountToDepositText: Locator;
  readonly amountToWithdrawText: Locator;
  readonly depositSuccessText: Locator;
  readonly withdrawalSuccessText: Locator;
  readonly balanceText: Locator;
  readonly resetButton: Locator;

  constructor(page: Page) {

    this.page = page;
    this.homebutton = page.getByRole('button', { name: 'Home' });
    this.nameButton = page.getByText('Your Name : ---Your Name---');
    this.customerloginButton = page.getByRole('button', { name: 'Customer login' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.userSelectDropdown =  page.locator('select#userSelect');
    this.accountSelectDropdown = page.locator('select#accountSelect');
    this.welcomeText = page.getByText('Welcome Hermoine Granger !!')
    this.transactionButton = page.getByRole('button', { name: 'Transactions' });
    this.backButton = page.getByRole('button', { name: 'Back' });
    this.depositButton = page.getByRole('button', { name: 'Deposit'}); 
    this.depositFormButton = page.getByRole('form').getByRole('button', { name: 'Deposit' })
    this.amountInput= page.getByPlaceholder('amount');
    this.withdrawlButton = page.getByRole('button', { name: 'Withdrawl' });
    this.withdrawButton = page.getByRole('button', { name: 'Withdraw', exact: true });
    this.amountToDepositText = page.getByText('Amount to be Deposited :');
    this.depositSuccessText = page.getByText('Deposit Successful');
    this.amountToWithdrawText = page.getByText('Amount to be Withdrawn :');
    this.withdrawalSuccessText = page.getByText('Transaction successful');
    this.balanceText = page.locator('div.center >> text=Balance').locator('strong').nth(1);
    this.resetButton = page.getByRole('button', { name: 'Reset' });
  }
  
  // Login customer method
  async loginCustomer(customerName: string) {
    await this.customerloginButton.click();
    await this.userSelectDropdown.selectOption({ label: customerName });
    await this.loginButton.click();
  }

  // Select account method
  async selectAccount(accountNumber: string) {
    await this.accountSelectDropdown.selectOption(accountNumber);
  }

// Reveal balance method
 async revealBalance() {
    // Click Deposit tab (or Withdraw) to reveal balance field, wait for it visible
    await this.depositButton.click();
    await this.balanceText.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Get balance method
  async getBalance(): Promise<number> {
    const balanceTextContent = await this.balanceText.textContent();
    const balanceMatch = balanceTextContent?.match(/\d+/);
    return balanceMatch ? parseInt(balanceMatch[0], 10) : 0;
  }

  // Deposit method
  async deposit(amount: number) {
    await this.depositButton.click();
    await this.amountToDepositText.waitFor({ state: 'visible', timeout: 5000 });
    await this.amountInput.fill(amount.toString());
    await this.depositFormButton.click();
    await this.depositSuccessText.waitFor({ state: 'visible', timeout: 5000 });
  }

  // Withdraw method
  async withdraw(amount: number) {
    await this.withdrawlButton.click();
    await this.amountToWithdrawText.waitFor({ state: 'visible', timeout: 5000 });
    await this.amountInput.fill(amount.toString());
    await this.withdrawButton.click();
    await this.withdrawalSuccessText.waitFor({ state: 'visible', timeout: 5000 });
  }

};