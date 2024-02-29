import { expect, test } from "@playwright/test";
import { a } from "vitest/dist/suite-UrZdHRff";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  // TODO: Is there something we need to do before every test case to avoid repeating code?
  await page.goto("http://localhost:8001/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command input")).toBeVisible();
});

test("after I type into the input box, its text changes", async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command input").click();
  await page.getByLabel("Command input").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command input")).toHaveValue(mock_input);
});

test("on page load, i see a button", async ({ page }) => {
  // TODO WITH TA: Fill this in!
  await page.getByLabel("Login").click();
  await expect(page.locator("text=Submit")).toBeVisible();
});

test("after I enter the command mode, it gets switched from brief to verbose", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page.locator('[aria-label="Command input"]').fill("mode");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText("Command: mode");
  await expect(messageLocator).toContainText("Output: Mode set to verbose");
});

test("after I enter the command mode, it gets switched from verbose to brief", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page.locator('[aria-label="Command input"]').fill("mode");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("mode");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText("Mode set to brief");
});

test("after entering an incorrect mode command, it displays the correct error", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page.locator('[aria-label="Command input"]').fill("mode john");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText(
    "Usage: 'mode' to toggle between brief and verbose output."
  );
});

test("after loading a valid path, it displays the correct message", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText(
    "Dataset loaded from /data/dataset1.csv"
  );
});

test("after loading a valid path in verbose, it displays the correct message", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page.locator('[aria-label="Command input"]').fill("mode");
  await page.locator("text=Submit").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText(
    "Command: load_file /data/dataset1.csv"
  );
  await expect(messageLocator).toContainText(
    "Output: Dataset loaded from /data/dataset1.csv"
  );
});

test("after loading a invalid path, it displays the correct message", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset3.csv");
  await page.locator("text=Submit").click();

  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText("File path does not exist.");
});

test("after loading a valid path and using the command, view, it displays the csv data", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();

  const table = page.locator("table", { hasText: "ID" });
  await expect(table).toBeVisible();
  const rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(4);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("ID");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("Address");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("City");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("State");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("Zip");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("Price");
  await expect(rows.nth(1).locator("td").nth(0)).toHaveText("1");
  await expect(rows.nth(1).locator("td").nth(1)).toHaveText("123 Main St");
  await expect(rows.nth(1).locator("td").nth(2)).toHaveText("Anytown");
  await expect(rows.nth(1).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(1).locator("td").nth(4)).toHaveText("12345");
  await expect(rows.nth(1).locator("td").nth(5)).toHaveText("200000");
});

test("after loading a valid path twice and using the command, view, it displays the coorrect csv data", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset2.csv");
  await page.locator("text=Submit").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();

  const table = page.locator('div[aria-label="view"] table');
  await expect(table).toBeVisible();
  const rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(4);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("ID");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("Address");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("City");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("State");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("Zip");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("Price");
  await expect(rows.nth(1).locator("td").nth(0)).toHaveText("1");
  await expect(rows.nth(1).locator("td").nth(1)).toHaveText("123 Main St");
  await expect(rows.nth(1).locator("td").nth(2)).toHaveText("Anytown");
  await expect(rows.nth(1).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(1).locator("td").nth(4)).toHaveText("12345");
  await expect(rows.nth(1).locator("td").nth(5)).toHaveText("200000");
  await expect(rows.nth(2).locator("td").nth(0)).toHaveText("2");
  await expect(rows.nth(2).locator("td").nth(1)).toHaveText("456 Pine St");
  await expect(rows.nth(2).locator("td").nth(2)).toHaveText("Laketown");
  await expect(rows.nth(2).locator("td").nth(3)).toHaveText("StateB");
  await expect(rows.nth(2).locator("td").nth(4)).toHaveText("67890");
  await expect(rows.nth(2).locator("td").nth(5)).toHaveText("250000");
});

test("correctly searches and displays the correct row", async ({ page }) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("search Zip 12345");
  await page.locator("text=Submit").click();

  const table = page.locator('div[aria-label="search"] table');
  const rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(1);
});

test("when searching for an invalid column, the correct message shows", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("search john 123");
  await page.locator("text=Submit").click();
  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText(
    "Column '$john' does not exist in the dataset."
  );
});

test("when searching for an valid column but invalid value, the correct message shows", async ({
  page,
}) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("search Zip john");
  await page.locator("text=Submit").click();
  const messageLocator = page.locator('[class="repl-history"]');
  await expect(messageLocator).toContainText(
    "No records found matching 'john' in column 'Zip'."
  );
});

//test on data with one column, data with one row
//test for searching multiple files (call load two times)
