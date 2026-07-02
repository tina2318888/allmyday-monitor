const { chromium } = require("playwright");

const TARGETS = [
  {
    name: "合照",
    url: "https://allmyday.com.tw/item/query/46756a44eb7e9ad52"
  },
  {
    name: "簽售",
    url: "https://allmyday.com.tw/item/query/46756a44eb7e9446b"
  }
];

async function run() {
  const browser = await chromium.launch({
    headless: true
  });

  const page = await browser.newPage({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137 Safari/537.36",
    locale: "zh-TW"
  });

  for (const item of TARGETS) {
    console.log("開始檢查：", item.name);

    try {
      await page.goto(item.url, {
        waitUntil: "networkidle",
        timeout: 60000
      });

      await page.waitForTimeout(8000);

      const title = await page.title();
      const text = await page.locator("body").innerText();

      console.log(item.name, "標題：", title);
      console.log(item.name, "內容前500字：");
      console.log(text.slice(0, 500));

    } catch (err) {
      console.log(item.name, "錯誤：", err.message);
    }
  }

  await browser.close();
}

run();
