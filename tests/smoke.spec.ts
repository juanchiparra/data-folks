import { expect, test } from "@playwright/test";

for (const route of ["/", "/works/", "/events/", "/jobs/"]) {
  test(`${route} loads`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.ok()).toBeTruthy();
  });
}

test("sitemap responds", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.ok()).toBeTruthy();
});
