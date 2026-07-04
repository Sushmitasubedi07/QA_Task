import { test, expect } from '@playwright/test';

test('agency partner can sign up and add payment details', async ({ page }) => {
  // test data
  const firstName = 'Sushmita';
const lastName = 'Subedi';
const email = `sushmita${Date.now()}@gmail.com`;
const phone = `98-${Math.floor(10000000 + Math.random() * 90000000)}`;
const password = 'Password7$#';

  const agency = {
    name: 'Leadahead consultancy',
    role: 'social media handler',
    email: 'info@leadahead7.com.np',
    website: 'www.leadaheadconsultancy.com',
    address: 'New baneshowr, kathmandu',
  };

  const payment = {
    accountHolder: 'sushmita subedi',
    branch: 'new baneshowr',
    bank: 'Laxmi sunrise bank',
    accountNumber: '120045678901',
  };

  // Signup 
  await page.goto('https://authorized-partner.vercel.app/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign Up' }).click();
  await page.getByRole('checkbox', { name: 'I agree to the Terms of' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();

  // account details
  await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
  await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
  await page.getByRole('textbox', { name: 'Email Address' }).fill(email);
  await page.getByRole('textbox', { name: 'Phone Number' }).fill(phone);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('input[name="confirmPassword"]').fill(password);
  await page.getByRole('button', { name: 'Next' }).click();

  // email verification
  await expect(page.getByRole('button', { name: 'Verify Code' })).toBeVisible();
  // Check the inbox for `email` above, get the real 6-digit code, then type it
  // into the OTP boxes in the browser window that pops open. Once typed,
  // click the "Resume" (▶) button in the Playwright Inspector toolbar to continue.
  await page.pause();
  await page.getByRole('button', { name: 'Verify Code' }).click();

  //Agency details
  await page.getByRole('textbox', { name: 'Name' }).fill(agency.name);
  await page.getByRole('textbox', { name: 'Role in Agency' }).fill(agency.role);
  await page.getByRole('textbox', { name: 'Email Address' }).fill(agency.email);
  await page.getByRole('textbox', { name: 'Website' }).fill(agency.website);
  await page.getByRole('textbox', { name: 'Address', exact: true }).fill(agency.address);
  await page.getByRole('combobox').click();
  await page.locator('div').filter({ hasText: /^Nepal$/ }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Experience details 
  await page.getByRole('combobox', { name: 'Years of Experience' }).click();
  await page.getByRole('option', { name: '1 year' }).click();
  await page.getByRole('spinbutton', { name: 'Number of Students Recruited' }).fill('10');
  await page.getByRole('textbox', { name: 'Focus Area' }).fill('Nepal');
  await page.getByRole('spinbutton', { name: 'Success Metrics' }).fill('99');
  await page.getByRole('checkbox', { name: 'Visa Processing' }).click();
  await page.getByRole('checkbox', { name: 'Career Counseling' }).click();
  await page.getByRole('checkbox', { name: 'Admission Applications' }).click();
  await page.getByRole('checkbox', { name: 'Test Prepration' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Business & certification details 
  await page.getByRole('textbox', { name: 'Business Registration Number' }).fill('100123456');
  await page.getByRole('combobox', { name: 'Preferred Countries' }).click();
  await page.getByText('Nepal').click();
  await page.getByRole('checkbox', { name: 'Universities' }).click();
  await page.getByRole('textbox', { name: 'Certification Details (' }).fill('IELTS');

  // file uploads
  await page.locator('input[type="file"]').first().setInputFiles('sushmitaQA.pdf');
  await page.locator('input[type="file"]').nth(1).setInputFiles('sushmitaQA.pdf');
  await page.getByRole('button', { name: 'Submit' }).click();

  // Payment details 
  await page.goto('https://authorized-partner.vercel.app/admin/profile');
  await page.getByText('Payment Details').click();
  await page.getByRole('textbox', { name: 'Account Holder Name' }).fill(payment.accountHolder);
  await page.getByRole('textbox', { name: 'Account Number' }).fill(payment.accountNumber);
  await page.getByRole('textbox', { name: 'Branch Name' }).fill(payment.branch);
  await page.getByRole('textbox', { name: 'Bank Name' }).fill(payment.bank);
  await page.getByRole('button', { name: 'Save' }).click();

  // confirm we're back on the profile page after saving
  await expect(page.getByRole('heading', { name: `${firstName} ${lastName}`, exact: false })).toBeVisible();
});