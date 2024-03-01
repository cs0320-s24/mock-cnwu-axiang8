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
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */

//call load load view
test("after loading a valid path twice and using the command, view, it displays the correct csv data", async ({
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

//test for searching multiple files (call load, search, load, search)
test("searches correctly when loading multiple files", async ({ page }) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset2.csv");
  await page.locator("text=Submit").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("search City Hilltown");
  await page.locator("text=Submit").click();

  const table = page.locator('div[aria-label="search"] table');
  const rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(1);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("4");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("101 Elm St");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("Hilltown");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("54321");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("180000");

  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("search Address 123 Main St");
  await page.locator("text=Submit").click();
  const table1 = page.locator('div[aria-label="search"] table');
  const rows1 = table.locator("tbody tr");
  await expect(rows1).toHaveCount(2);
  await expect(rows1.nth(1).locator("td").nth(0)).toHaveText("1");
  await expect(rows1.nth(1).locator("td").nth(1)).toHaveText("123 Main St");
  await expect(rows1.nth(1).locator("td").nth(2)).toHaveText("Anytown");
  await expect(rows1.nth(1).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows1.nth(1).locator("td").nth(4)).toHaveText("12345");
  await expect(rows1.nth(1).locator("td").nth(5)).toHaveText("200000");
});

//load -> view -> search correctly
test("correctly loads, views, and searches two times", async ({ page }) => {
  await page.locator("text=Login").click();
  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset1.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();

  let table = page.locator("table", { hasText: "ID" });
  await expect(table).toBeVisible();
  let rows = table.locator("tbody tr");
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

  await page.locator('[aria-label="Command input"]').fill("search Zip 12345");
  await page.locator("text=Submit").click();

  table = page.locator('div[aria-label="search"] table');
  rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(1);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("1");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("123 Main St");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("Anytown");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("12345");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("200000");

  await page
    .locator('[aria-label="Command input"]')
    .fill("load_file /data/dataset2.csv");
  await page.locator("text=Submit").click();
  await page.locator('[aria-label="Command input"]').fill("view");
  await page.locator("text=Submit").click();

  table = page.locator("table", { hasText: "ID" });
  await expect(table).toBeVisible();
  rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(4);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("ID");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("Address");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("City");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("State");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("Zip");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("Price");
  await expect(rows.nth(1).locator("td").nth(0)).toHaveText("4");
  await expect(rows.nth(1).locator("td").nth(1)).toHaveText("101 Elm St");
  await expect(rows.nth(1).locator("td").nth(2)).toHaveText("Hilltown");
  await expect(rows.nth(1).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(1).locator("td").nth(4)).toHaveText("54321");
  await expect(rows.nth(1).locator("td").nth(5)).toHaveText("180000");

  await page.locator('[aria-label="Command input"]').fill("search Zip 54321");
  await page.locator("text=Submit").click();

  table = page.locator('div[aria-label="search"] table');
  rows = table.locator("tbody tr");
  await expect(rows).toHaveCount(1);
  await expect(rows.nth(0).locator("td").nth(0)).toHaveText("1");
  await expect(rows.nth(0).locator("td").nth(1)).toHaveText("101 Elm St");
  await expect(rows.nth(0).locator("td").nth(2)).toHaveText("Hilltown");
  await expect(rows.nth(0).locator("td").nth(3)).toHaveText("StateA");
  await expect(rows.nth(0).locator("td").nth(4)).toHaveText("54321");
  await expect(rows.nth(0).locator("td").nth(5)).toHaveText("180000");
});
