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

async function check() {
  for (const item of TARGETS) {
    try {
      const res = await fetch(item.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/137 Safari/537.36"
        }
      });

      console.log(item.name, res.status);

      const html = await res.text();

      // 先把網頁存下來，之後我們再抓真正的數量
      console.log(html.substring(0, 500));
    } catch (e) {
      console.error(item.name, e);
    }
  }
}

check();
