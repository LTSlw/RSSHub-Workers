var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/bilibili/bangumi.js
var bangumi_exports = {};
__export(bangumi_exports, {
  main: () => main
});
async function main(params2) {
  const mediaid = params2.mediaid;
  let seasonid, mediaData;
  if (mediaid) {
    const response = await (await fetch(`https://www.bilibili.com/bangumi/media/md${mediaid}`)).text();
    mediaData = JSON.parse(response.match(/window\.__INITIAL_STATE__=([\s\S]+);\(function\(\)/)[1]) || {};
    seasonid = mediaData.mediaInfo.season_id;
  }
  const data = await (await fetch(`https://api.bilibili.com/pgc/web/season/section?season_id=${seasonid}`)).json();
  console.log(data);
  let episodes = [];
  if (data.result.main_section && data.result.main_section.episodes) {
    episodes = episodes.concat(
      data.result.main_section.episodes.map((item) => ({
        title: `<![CDATA[ \u7B2C${item.title}\u8BDD ${item.long_title} ]]>`,
        description: `<![CDATA[ <img src="${item.cover}" referrerpolicy="no-referrer"> ]]>`,
        link: `https://www.bilibili.com/bangumi/play/ep${item.id}`
      }))
    );
  }
  if (data.result.section) {
    data.result.section.forEach((section) => {
      if (section.episodes) {
        episodes = episodes.concat(
          section.episodes.map((item) => ({
            title: `<![CDATA[ ${item.title} ${item.long_title} ]]>`,
            description: `<![CDATA[ <img src="${item.cover}" referrerpolicy="no-referrer"> ]]>`,
            link: `https://www.bilibili.com/bangumi/play/ep${item.id}`
          }))
        );
      }
    });
  }
  console.log("cover", mediaData.mediaInfo.cover);
  return {
    title: `<![CDATA[ ${mediaData.mediaInfo.title} ]]>`,
    link: `https://www.bilibili.com/bangumi/media/md${mediaData.mediaInfo.media_id}/`,
    image: {
      url: mediaData.mediaInfo.cover,
      title: `<![CDATA[ ${mediaData.mediaInfo.title} ]]>`,
      link: `https://www.bilibili.com/bangumi/media/md${mediaData.mediaInfo.media_id}/`
    },
    description: `<![CDATA[ ${mediaData.mediaInfo.evaluate} ]]>`,
    language: "zh-cn",
    lastBuildDate: new Date().toUTCString(),
    ttl: 1440,
    item: episodes
  };
}

// src/lib/bilibili/app.js
var app_exports = {};
__export(app_exports, {
  main: () => main2
});
var config = {
  android: "\u5B89\u5353\u7248",
  iphone: "iPhone \u7248",
  ipad: "iPad HD \u7248",
  win: "UWP \u7248",
  android_tv_yst: "TV \u7248",
  android_car: "\u8F66\u673A\u7248",
  pc_client: "\u684C\u9762\u5BA2\u6237\u7AEF"
};
async function main2(params2) {
  let id = params2.id || "android";
  if (!config[id]) {
    id = "android";
  }
  const rootUrl = "https://app.bilibili.com";
  const apiUrl = `${rootUrl}/x/v2/version?mobi_app=${id}`;
  const response = await (await fetch(apiUrl)).json();
  const items = response.data.map((item) => ({
    link: rootUrl,
    title: `<![CDATA[${item.version}]]>`,
    pubDate: new Date(item.ptime * 1e3).toUTCString(),
    description: `<![CDATA[<li>${item.desc.split("\n-").join("</li><li>-")}</li>]]>`
  }));
  return {
    title: `<![CDATA[\u54D4\u54E9\u54D4\u54E9\u66F4\u65B0\u60C5\u62A5 - ${config[id]}]]>`,
    description: `<![CDATA[\u54D4\u54E9\u54D4\u54E9\u66F4\u65B0\u60C5\u62A5 - ${config[id]}]]>`,
    link: rootUrl,
    language: "zh-cn",
    lastBuildDate: new Date().toUTCString(),
    ttl: 1440,
    item: items
  };
}

// src/lib/konpic/pictures.js
var pictures_exports = {};
__export(pictures_exports, {
  main: () => main3
});
var config2 = {
  "group": "https://picture.k-on.space/html/subsite/%E5%90%88%E7%85%A7.html",
  "single": "https://picture.k-on.space/html/subsite/%E5%8D%95%E4%BA%BA%E7%85%A7.html",
  "lily": "https://picture.k-on.space/html/subsite/%E7%99%BE%E5%90%88.html",
  "cameo": "https://picture.k-on.space/html/subsite/%E5%AE%A2%E4%B8%B2.html",
  "multiple": "https://picture.k-on.space/html/subsite/%E5%A4%9A%E4%BA%BA%E7%85%A7.html",
  "new": "https://picture.k-on.space/html/subsite/new.html",
  "recommand": "https://picture.k-on.space/html/subsite/recommand.html"
};
var OnedriveHandler = class {
  constructor(od) {
    this.OnedriveLinks = od;
  }
  element(element) {
    let link = element.getAttribute("onclick").slice(13, -3);
    this.OnedriveLinks.push(link);
  }
};
var ThumbHandler = class {
  constructor(ThumbLinks) {
    this.ThumbLinks = ThumbLinks;
  }
  element(element) {
    let link = element.getAttribute("data-src").replace("../..", "https://picture.k-on.space");
    this.ThumbLinks.push(link);
  }
};
async function main3(params2) {
  let OnedriveLinks = [];
  let ThumbLinks = [];
  let url = "";
  if (config2[params2["category"]]) {
    url = config2[params2["category"]];
  } else {
    url = config2["new"];
  }
  let res = await fetch(url);
  let hr = new HTMLRewriter();
  await hr.on('div[class="onedrive"]', new OnedriveHandler(OnedriveLinks)).on('a[class="submain-unit-img"] img', new ThumbHandler(ThumbLinks));
  await hr.transform(res).blob();
  console.log(`${params2["category"]} total: ${OnedriveLinks.length} pictures(${OnedriveLinks.length}/${ThumbLinks.length}).`);
  let items = [];
  for (let i = 0; i < OnedriveLinks.length; i++) {
    items.push({
      title: `Pic`,
      link: OnedriveLinks[i],
      description: `<![CDATA[<img src="${ThumbLinks[i]}"/>]]>`
    });
  }
  return {
    title: `\u8F7B\u97F3\u56FE\u7F51 - ${params2["category"]}`,
    link: `https://picture.k-on.space/`,
    description: `\u4E13\u6CE8\u5206\u4EAB\u6536\u85CF\u7EA7\u7684\u8F7B\u97F3\u5C11\u5973\u56FE\u7247`,
    language: `zh-cn`,
    pubDate: new Date().toUTCString(),
    lastBuildDate: new Date().toUTCString(),
    item: items
  };
}

// src/lib/anime/bocchiTheRock.js
var bocchiTheRock_exports = {};
__export(bocchiTheRock_exports, {
  main: () => main4
});
var NewsHandler = class {
  constructor() {
    this.str = "";
    this.data = {};
  }
  text(text) {
    this.str += text.text;
    if (text.lastInTextNode) {
      if (this.str.indexOf("btrNews") !== -1) {
        this.data = JSON.parse(this.str.slice(this.str.indexOf("{"), this.str.lastIndexOf("}") + 1));
      }
      this.str = "";
    }
  }
  getData() {
    return this.data;
  }
};
async function main4(params2) {
  const url = "https://bocchi.rocks/news/";
  let res = await fetch(url);
  let hr = new HTMLRewriter();
  let handler = new NewsHandler();
  await hr.on("script", handler);
  await hr.transform(res).blob();
  let items = [];
  handler.getData().articles.forEach((article) => {
    let item = {
      title: `<![CDATA[${article.title}]]>`,
      description: `<![CDATA[${article.body}]]>`,
      link: `${url}?id=${article.id}`,
      pubDate: new Date(article.pubDate.replaceAll(".", "-")).toUTCString(),
      category: []
    };
    article.categories.forEach((cat) => {
      item.category.push(cat);
    });
    items.push(item);
  });
  return {
    title: `NEWS | TV\u30A2\u30CB\u30E1\u300C\u307C\u3063\u3061\u30FB\u3056\u30FB\u308D\u3063\u304F\uFF01\u300D\u516C\u5F0F\u30B5\u30A4\u30C8`,
    link: `https://bocchi.rocks/news/`,
    description: `NEWS | \u5B64\u72EC\u6447\u6EDA`,
    language: `ja-jp`,
    pubDate: new Date().toUTCString(),
    lastBuildDate: new Date().toUTCString(),
    ttl: 1440,
    item: items
  };
}

// src/lib/anime/tenten_kakumei.js
var tenten_kakumei_exports = {};
__export(tenten_kakumei_exports, {
  main: () => main5
});
var categories = ["all", "info", "onair", "package", "music", "event", "special"];
var baseurl = "https://tenten-kakumei.com/";
var newsData;
var StoryHandler = class {
  constructor() {
    this.items = [];
    this.item = { title: "" };
  }
  async element(element) {
    if (element.getAttribute("class") === "sp_title") {
      element.onEndTag((endTag) => {
        this.item.title = `<![CDATA[ ${this.item.title}]]>`;
        this.items.push(this.item);
        this.item = { title: "" };
      });
    }
    if (element.tagName !== "a") {
      return;
    }
    console.log("[StoryHandler]", element.getAttribute("href"));
    let href = element.getAttribute("href");
    let res = await fetch(baseurl + href);
    let hr = new HTMLRewriter();
    let contentHandler = new StoryContentHandler();
    let thumbnailsHandler = new StoryThumbnailsHandler();
    await hr.on('div[class="story_content"] *', contentHandler).on('li[class="thumbnail-item"] img', thumbnailsHandler);
    await hr.transform(res).blob();
    for (let i = 0; i < newsData.length; i++) {
      if (newsData[i].url === href) {
        this.item.pubDate = new Date(newsData[i].day.replaceAll("/", "-")).toUTCString();
        break;
      }
    }
    this.item.description = `<![CDATA[ ${contentHandler.getContent()}${thumbnailsHandler.getThumbnailsHTML()}]]>`;
    this.item.link = baseurl + href;
  }
  text(text) {
    this.item.title += text.text.trim();
  }
  getItems() {
    return this.items;
  }
};
var StoryContentHandler = class {
  constructor() {
    this.content = "";
  }
  element(element) {
    let openingTag = element.tagName;
    for (let i of element.attributes) {
      openingTag += ` ${i[0]}="${i[1]}"`;
    }
    try {
      element.onEndTag((endTag) => {
        this.content += `</${endTag.name}>`;
      });
    } catch (e) {
      openingTag += "/";
    }
    this.content += `<${openingTag}>`;
  }
  text(text) {
    this.content += text.text;
  }
  getContent() {
    return this.content;
  }
};
var StoryThumbnailsHandler = class {
  constructor() {
    this.thumbnails = [];
  }
  element(element) {
    this.thumbnails.push(element.getAttribute("src").replace("../", baseurl));
  }
  getThumbnails() {
    return this.thumbnails;
  }
  getThumbnailsHTML() {
    let html = "";
    for (let i = 0; i < this.thumbnails.length; i++) {
      html += `<img src="${this.thumbnails[i]}"/>`;
    }
    return html;
  }
};
async function main5(params2) {
  newsData = await (await fetch("https://tenten-kakumei.com/news.json")).json();
  if (params2.type !== "story") {
    return handleNews(params2.category);
  }
  const url = "https://tenten-kakumei.com/story.html";
  let res = await fetch(url);
  let hr = new HTMLRewriter();
  let handler = new StoryHandler();
  await hr.on('div[class="sp_box border_box"] a', handler).on('div[class="sp_title"]', handler);
  await hr.transform(res).blob();
  return {
    title: `<![CDATA[ \u30B9\u30C8\u30FC\u30EA\u30FC | TV\u30A2\u30CB\u30E1\u300C\u8EE2\u751F\u738B\u5973\u3068\u5929\u624D\u4EE4\u5B22\u306E\u9B54\u6CD5\u9769\u547D\u300D\u516C\u5F0F\u30B5\u30A4\u30C8 ]]>`,
    link: `https://tenten-kakumei.com/story.html`,
    description: `STORY | \u8F6C\u751F\u738B\u5973\u4E0E\u5929\u624D\u5343\u91D1\u7684\u9B54\u6CD5\u9769\u547D`,
    language: "ja-jp",
    lastBuildDate: new Date().toUTCString(),
    ttl: 1440,
    item: handler.getItems()
  };
}
async function handleNews(cat) {
  const category = cat ? await getCategory(cat) : "all";
  console.log("Category: ", category);
  let items = [];
  for (let i = 0; i < newsData.length; i++) {
    if ("all" !== category && newsData[i].cat !== category) {
      continue;
    }
    let item = {
      title: `<![CDATA[ ${newsData[i].title} ]]>`,
      link: baseurl + newsData[i].url,
      pubDate: new Date(newsData[i].day.replaceAll("/", "-")).toUTCString(),
      category: [newsData[i].cat]
    };
    items.push(item);
  }
  return {
    title: `<![CDATA[ \u30CB\u30E5\u30FC\u30B9 | TV\u30A2\u30CB\u30E1\u300C\u8EE2\u751F\u738B\u5973\u3068\u5929\u624D\u4EE4\u5B22\u306E\u9B54\u6CD5\u9769\u547D\u300D\u516C\u5F0F\u30B5\u30A4\u30C8${"all" !== category ? ` - ${category}` : ""} ]]>`,
    link: `https://tenten-kakumei.com/news.html`,
    image: {
      url: "https://tenten-kakumei.com/images/top/top_pc_logo2_pc_01.png",
      title: `<![CDATA[ \u30CB\u30E5\u30FC\u30B9 | TV\u30A2\u30CB\u30E1\u300C\u8EE2\u751F\u738B\u5973\u3068\u5929\u624D\u4EE4\u5B22\u306E\u9B54\u6CD5\u9769\u547D\u300D\u516C\u5F0F\u30B5\u30A4\u30C8 ]]>`,
      link: `https://tenten-kakumei.com/news.html`
    },
    description: `NEWS | \u8F6C\u751F\u738B\u5973\u4E0E\u5929\u624D\u5343\u91D1\u7684\u9B54\u6CD5\u9769\u547D`,
    language: "ja-jp",
    lastBuildDate: new Date().toUTCString(),
    ttl: 1440,
    item: items
  };
}
async function getCategory(cat) {
  for (let i = 0; i < categories.length; i++) {
    if (cat === categories[i]) {
      return cat;
    }
  }
  return "all";
}

// src/index.js
var version = "RSSHub-Workers v0.1.1";
var router = {
  "/bilibili/bangumi": { pnum: 1, preq: 1, params: ["mediaid"] },
  "/bilibili/app": { pnum: 1, preq: 0, params: ["id"] },
  "/konpic/pictures": { pnum: 1, preq: 1, params: ["category"] },
  "/anime/bocchiTheRock": { pnum: 1, preq: 0, params: ["category"] },
  "/anime/tenten_kakumei": { pnum: 2, preq: 0, params: ["type", "category"] }
};
var lib;
function switchLib(router2) {
  switch (router2) {
    case "/bilibili/bangumi":
      lib = bangumi_exports;
      break;
    case "/bilibili/app":
      lib = app_exports;
      break;
    case "/konpic/pictures":
      lib = pictures_exports;
      break;
    case "/anime/bocchiTheRock":
      lib = bocchiTheRock_exports;
      break;
    case "/anime/tenten_kakumei":
      lib = tenten_kakumei_exports;
      break;
  }
}
var template = {
  rss: {
    begin: `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>`,
    end: `</channel></rss>`
  }
};
var params = {};
var tagList = {
  rss: {
    main: [
      { name: "title", haveChild: false },
      { name: "link", haveChild: false },
      { name: "description", haveChild: false },
      { name: "language", haveChild: false },
      { name: "copyright", haveChild: false },
      { name: "managingEditor", haveChild: false },
      { name: "webMaster", haveChild: false },
      { name: "pubDate", haveChild: false },
      { name: "lastBuildDate", haveChild: false },
      { name: "category", haveChild: false },
      { name: "generator", haveChild: false },
      { name: "docs", haveChild: false },
      { name: "ttl", haveChild: false },
      { name: "image", haveChild: true },
      { name: "rating", haveChild: false },
      { name: "textInput", haveChild: true },
      { name: "skipHours", haveChild: false },
      { name: "skipDays", haveChild: false },
      { name: "item", haveChild: true }
    ],
    image: [
      { name: "url", haveChild: false },
      { name: "title", haveChild: false },
      { name: "link", haveChild: false },
      { name: "width", haveChild: false },
      { name: "height", haveChild: false },
      { name: "description", haveChild: false }
    ],
    textInput: [
      { name: "title", haveChild: false },
      { name: "description", haveChild: false },
      { name: "name", haveChild: false },
      { name: "link", haveChild: false }
    ],
    item: [
      { name: "title", haveChild: false },
      { name: "link", haveChild: false },
      { name: "description", haveChild: false },
      { name: "author", haveChild: false },
      { name: "category", haveChild: false },
      { name: "comments", haveChild: false },
      { name: "guid", haveChild: false },
      { name: "pubDate", haveChild: false }
    ]
  }
};
var feed = {
  strTag: function(name, value) {
    return `<${name}>${value}</${name}>`;
  },
  data: {},
  str: function(outputType) {
    switch (outputType) {
      case "rss":
        return strRss();
      default:
        return strRss();
    }
  },
  checkFormat: function() {
  },
  strRss: function() {
    this.data["generator"] = version;
    return template.rss["begin"] + this.strXml(this.data, tagList.rss, "main") + template.rss["end"];
  },
  strXml: function(data, tagList2, listName) {
    let str = "";
    for (let i = 0; i < tagList2[listName].length; i++) {
      let tag = tagList2[listName][i].name;
      if (!data[tag]) {
        continue;
      }
      if (tagList2[listName][i].haveChild) {
        if (Array.isArray(data[tag])) {
          for (let j = 0; j < data[tag].length; j++) {
            str += this.strTag(tag, this.strXml(data[tag][j], tagList2, tag));
          }
        } else {
          str += this.strTag(tag, this.strXml(data[tag], tagList2, tag));
        }
      } else {
        if (Array.isArray(data[tag])) {
          for (let j = 0; j < data[tag].length; j++) {
            str += this.strTag(tag, data[tag][j]);
          }
        } else {
          str += this.strTag(tag, data[tag]);
        }
      }
    }
    return str;
  }
};
function selectRouter(path) {
  const query = path.split("/");
  console.log("query", query);
  let r = "";
  let cur = 1;
  for (let i = 1; i < query.length; i++) {
    r += "/" + query[i];
    if (router[r]) {
      cur = i + 1;
      break;
    }
  }
  if (!router[r]) {
    return -1;
  }
  if (router[r].pnum < query.length - cur || router[r].preq > query.length - cur) {
    return -2;
  }
  for (let i = 0; i < query.length - cur; i++) {
    params[router[r].params[i]] = query[cur + i];
  }
  switchLib(r);
  return r;
}
var src_default = {
  async fetch(request) {
    console.log("url", request.url);
    const path = new URL(request.url).pathname;
    if (path === "/favicon.ico") {
      return Response.redirect("https://raw.githubusercontent.com/DIYgod/RSSHub/master/docs/.vuepress/public/logo.png", 301);
    }
    if (path === "/") {
      return new Response((await fetch(`https://raw.githubusercontent.com/lw-tech-soft/RSSHub-Workers/main/html/index.html`)).body, {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      });
    }
    let r = selectRouter(path);
    switch (r) {
      case -1:
        console.log("Router not exist.");
        return new Response("Router not exist.");
      case -2:
        console.log("Too much or less params.");
        return new Response("Too much or less params.");
    }
    console.log("Router", r);
    console.log("Params", params);
    feed.data = await lib.main(params);
    return new Response(feed.strRss(), {
      status: 200,
      headers: {
        "Content-Type": "application/xml"
      }
    });
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
