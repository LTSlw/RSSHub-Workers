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
    episodes = episodes.concat(data.result.main_section.episodes.map((item) => ({
      title: `<![CDATA[ \u7B2C${item.title}\u8BDD ${item.long_title} ]]>`,
      description: `<![CDATA[ <img src="${item.cover}" referrerpolicy="no-referrer"> ]]>`,
      link: `https://www.bilibili.com/bangumi/play/ep${item.id}`
    })));
  }
  if (data.result.section) {
    data.result.section.forEach((section) => {
      if (section.episodes) {
        episodes = episodes.concat(section.episodes.map((item) => ({
          title: `<![CDATA[ ${item.title} ${item.long_title} ]]>`,
          description: `<![CDATA[ <img src="${item.cover}" referrerpolicy="no-referrer"> ]]>`,
          link: `https://www.bilibili.com/bangumi/play/ep${item.id}`
        })));
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

// src/index.js
var version = "RSSHub-Workers v0.1.1";
var router = {
  "/bilibili/bangumi": { pnum: 1, preq: 1, params: ["mediaid"] },
  "/bilibili/app": { pnum: 1, preq: 0, params: ["id"] },
  "/konpic/pictures": { pnum: 1, preq: 1, params: ["category"] }
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
