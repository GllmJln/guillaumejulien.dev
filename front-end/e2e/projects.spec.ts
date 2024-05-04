import { test, expect } from "@playwright/test";
import type { Repo } from "../src/types/repo";

test("it should display a loading spinner", async ({ page }) => {
  await page.route("https://api.github.com/**/*", async () => {
    await Promise.resolve((res: () => void) => setTimeout(res, 10000));
  });

  await page.goto("/projects");

  await expect(page.locator(".center-div")).toBeVisible();
});

test("it should display repos", async ({ page }) => {
  await page.route("https://api.github.com/**/*", async (route) => {
    const json: Repo[] = [
      {
        name: "repo1",
        description: "a repo with some things",
        pushed_at: new Date().toISOString(),
        html_url: "example.com",
        full_name: "repo123",
      },
    ];

    await route.fulfill({ json });
  });

  await page.goto("/projects");

  const link = page.getByRole("link", { name: "repo1" });

  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "example.com");
});
