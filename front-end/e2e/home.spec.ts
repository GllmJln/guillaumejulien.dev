import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Guillaume Julien - Home");
});

test("has header", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Guillaume Julien"
  );
});

test("has projects link", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Projects" })).toBeVisible();
});
