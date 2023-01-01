class NewsHandler {
	constructor() {
		this.str = '';
		this.data = {};
	}
	text(text) {
		this.str += text.text;
		if (text.lastInTextNode) {
			if(this.str.indexOf('btrNews') !== -1) {
				this.data = JSON.parse(this.str.slice(this.str.indexOf('{'), this.str.lastIndexOf('}') + 1));
			}
			this.str = "";
		}
	}
	getData() {
		return this.data;
	}
}

export async function main(params) {
	const url = "https://bocchi.rocks/news/";
    let res = await fetch(url);
    let hr = new HTMLRewriter();
	let handler = new NewsHandler();
    await hr.on('script', handler);
	await hr.transform(res).blob();

	let items = [];
	handler.getData().articles.forEach((article) => {
		let item = {
			title:       `<![CDATA[${article.title}]]>`,
			description: `<![CDATA[${article.body}]]>`,
			link:        `${url}?id=${article.id}`,
			pubDate:     new Date(article.pubDate.replaceAll('.', '-')).toUTCString(),
			category:    []
		};
		article.categories.forEach((cat) => {
			item.category.push(cat);
		});
		items.push(item);
	});

    return {
		title: `NEWS | TVアニメ「ぼっち・ざ・ろっく！」公式サイト`,
		link: `https://bocchi.rocks/news/`,
		description: `NEWS | 孤独摇滚`,
		language: `ja-jp`,
		pubDate: new Date().toUTCString(),
		lastBuildDate: new Date().toUTCString(),
		item: items
	};
}