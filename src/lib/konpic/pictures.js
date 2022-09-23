const config = {
	"group":      "https://picture.k-on.space/html/subsite/%E5%90%88%E7%85%A7.html",
	"single":     "https://picture.k-on.space/html/subsite/%E5%8D%95%E4%BA%BA%E7%85%A7.html",
	"lily":       "https://picture.k-on.space/html/subsite/%E7%99%BE%E5%90%88.html",
	"cameo":      "https://picture.k-on.space/html/subsite/%E5%AE%A2%E4%B8%B2.html",
	"multiple":   "https://picture.k-on.space/html/subsite/%E5%A4%9A%E4%BA%BA%E7%85%A7.html",
	"new":        "https://picture.k-on.space/html/subsite/new.html",
	"recommand":  "https://picture.k-on.space/html/subsite/recommand.html"
}

class OnedriveHandler {
	constructor(od){
		this.OnedriveLinks = od;
	}
    element(element) {
		let link = element.getAttribute("onclick").slice(13, -3);
		this.OnedriveLinks.push(link);
    }
}

export async function main(params) {
	let OnedriveLinks = [];
	let url = "";
	if (config[params["category"]]) {
		url = config[params["category"]];
	} else {
		url = config["new"];
	}
    let res = await fetch(url);
    let hr = new HTMLRewriter();
    await hr.on('div[class="onedrive"]', new OnedriveHandler(OnedriveLinks));
	await hr.transform(res).blob();
	console.log(`${params["category"]} total: ${OnedriveLinks.length} pictures.`);

	let items = [];

	for (let i = 0; i < OnedriveLinks.length; i++) {
		items.push({
			title: `Pic`,
			link: OnedriveLinks[i],
			data: new Date().toUTCString(),
			description: OnedriveLinks[i]
		})
	}
	
    return {
		title: `轻音图网`,
		link: `https://picture.k-on.space/`,
		description: `专注分享收藏级的轻音少女图片`,
		language: `zh-cn`,
		pubDate: new Date().toUTCString(),
		lastBuildDate: new Date().toUTCString(),
		item: items
	};
}