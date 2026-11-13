# UAE Holiday Calendar 2026–2030 · 阿联酋节日日历

## English

A Chinese-language calendar with 94 entries covering UAE nationwide public holidays, major Emirati festivals, and observances from 2026 to 2030. The pink-themed website supports search and year filters.

- [Browse the calendar](https://uae-holidays-zh-pink-2026-2030.zbjgrhr.chatgpt.site/)
- [Subscribe with the iCalendar URL](https://uae-holidays-zh-pink-2026-2030.zbjgrhr.chatgpt.site/uae-holidays-zh-2026-2030.ics) or [download the .ics file](public/uae-holidays-zh-2026-2030.ics?raw=1) for a one-time import.

Dates marked as tentative are estimates based on the Umm al-Qura calendar. Check UAE government announcements for confirmed holiday dates.

## 中文

收录 2026—2030 年阿联酋全国公共假期、主要本土节庆与纪念日，共 94 条中文事项。网页采用粉色主题，支持搜索和按年份筛选。

- [浏览节日日历](https://uae-holidays-zh-pink-2026-2030.zbjgrhr.chatgpt.site/)
- [复制 iCalendar 地址添加日历订阅](https://uae-holidays-zh-pink-2026-2030.zbjgrhr.chatgpt.site/uae-holidays-zh-2026-2030.ics)，或[下载 .ics 文件](public/uae-holidays-zh-2026-2030.ics?raw=1)一次性导入。

标为「预计」的日期按乌姆古拉历推算，实际放假日期以阿联酋政府公告为准。

## Local preview · 本地预览

Requires Node.js 22 or later. No dependencies to install.

需要 Node.js 22 或更新版本，无需安装依赖。

```sh
node preview.cjs
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173) in your browser.

在浏览器中打开上面的本地地址。

Edit `generate.cjs` to update the event data, then regenerate the JSON and iCalendar files and rebuild the Worker.

更新节日数据时，编辑 `generate.cjs`，再运行以下命令重新生成 JSON、日历文件和 Worker。

```sh
node generate.cjs
node build.cjs
```
