module.exports = {
  launch: {
    dumpio: true,
    headless: false,
    args: [
      '--disable-gpu',
    ]
  },
  browser: "chromium",
  browserContext: "incognito",
}
