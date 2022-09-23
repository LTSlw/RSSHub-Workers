const version = "RSSHub-Workers v0.1.1"

/*pnum 参数数量, preq 必选参数数量*/
const router = {
	"/bilibili/bangumi": { pnum: 1, preq: 1, params: ["mediaid"] },
	"/bilibili/app":     { pnum: 1, preq: 0, params: ["id"] },
	"/konpic/pictures":  { pnum: 1, preq: 1, params: ["category"]}
};

var lib;
import * as lib_bilibili_bangumi from "./lib/bilibili/bangumi";
import * as lib_bilibili_app     from "./lib/bilibili/app";
import * as lib_konpic_pictures  from "./lib/konpic/pictures";

function switchLib (router) {
	switch (router) {
	case "/bilibili/bangumi": lib = lib_bilibili_bangumi; break;
	case "/bilibili/app":     lib = lib_bilibili_app; break;
	case "/konpic/pictures":  lib = lib_konpic_pictures; break;
	}
}

const template = {
	rss: {
		begin: `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel>`,
		end:`</channel></rss>`
	}
};

var params = {};

//不支持属性
const tagList = {
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
			// { name: "cloud", haveChild: false }, //暂不支持
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
			// { name: "enclosure", haveChild: false }, //暂不支持
			{ name: "guid", haveChild: false },
			{ name: "pubDate", haveChild: false },
			// { name: "source", haveChild: false } //暂不支持
		]
	}
};

let feed = {
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
	checkFormat: function() {},
	strRss: function() {
		this.data["generator"] = version;
		return template.rss["begin"] + this.strXml(this.data, tagList.rss, "main") + template.rss["end"];
	},
	strXml: function(data, tagList, listName) {
		let str = "";
		for (let i = 0; i < tagList[listName].length; i++) {
			let tag = tagList[listName][i].name;
			if (!data[tag]) { continue; }
			if (tagList[listName][i].haveChild) {
				if (Array.isArray(data[tag])) {
					for (let j = 0; j < data[tag].length; j++) {
						str += this.strTag(tag, this.strXml(data[tag][j], tagList, tag));
					}
				}
				else {
					str += this.strTag(tag, this.strXml(data[tag], tagList, tag));
				}
			}
			else {
				if (Array.isArray(data[tag])) {
					for (let j = 0; j < data[tag].length; j++) {
						str += this.strTag(tag, data[tag][j]);
					}
				}
				else {
					str += this.strTag(tag, data[tag]);
				}
			}
		}
		return str;
	}
};

function selectRouter (path) {
	const query = path.split("/");
	console.log("query", query);
	let r = "";
	let cur = 1;
	for (let i = 1; i < query.length; i++) {
		r += "/" + query[i];
		if (router[r]){
			cur = i + 1;
			break;
		}
	}
	if (!router[r]) {
		return -1;
	}
	
	if (router[r].pnum < query.length - cur ||
		router[r].preq > query.length - cur) {
		return -2;
	}
	for (let i = 0; i < query.length - cur; i++) {
		params[router[r].params[i]] = query[cur + i];
	}
	switchLib(r);
	return r;
}

export default {
	async fetch(request) {
		console.log("url", request.url);
		const path = new URL(request.url).pathname;
		if (path === "/favicon.ico") { //icon
			return Response.redirect("https://raw.githubusercontent.com/DIYgod/RSSHub/master/docs/.vuepress/public/logo.png", 301);
		}

		if (path === "/") {//def.changeLog()
			return new Response((await fetch(`https://raw.githubusercontent.com/lw-tech-soft/RSSHub-Workers/main/html/index.html`)).body, {
				status: 200,
				headers: {
					"Content-Type": "text/html; charset=utf-8"
				}
			});
		}

		let r = selectRouter(path);
		switch(r){
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
	},
};