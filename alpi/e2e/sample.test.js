require("expect-puppeteer")
const { toMatchImageSnapshot } = require("jest-image-snapshot")

expect.extend({ toMatchImageSnapshot })

describe("Home", () => {
  beforeAll(async () => {
    await page.goto("https://main.dev.dmoiseenko.me/")
  })

  it('should display "Home" text on page', async () => {
    await expect(page).toMatch("Home")
  })

  it("should display Home page", async () => {
    const image = await page.screenshot()

    expect(image).toMatchImageSnapshot()
  })
})
