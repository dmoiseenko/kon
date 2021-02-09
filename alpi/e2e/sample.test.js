require("expect-puppeteer")

describe("Home", () => {
  beforeAll(async () => {
    await page.goto("https://main.dev.dmoiseenko.me/")
  })

  it('should display "Home" text on page', async () => {
    await expect(page).toMatch("Home")
  })
})
