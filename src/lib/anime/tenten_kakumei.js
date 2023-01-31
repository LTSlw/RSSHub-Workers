const categories = ['all', 'info', 'onair', 'package', 'music', 'event', 'special'];
const baseurl = 'https://tenten-kakumei.com/';
let newsData;

class StoryHandler {
    constructor() {
        this.items = [];
        this.item = { title: '' };
    }
    async element(element) {
        if (element.getAttribute('class') === 'sp_title'){
            element.onEndTag((endTag) => {
                this.item.title = `<![CDATA[ ${this.item.title}]]>`
                this.items.push(this.item);
                this.item = { title: '' };
            });
        }
        if (element.tagName !== 'a') {
            return;
        }

        console.log('[StoryHandler]', element.getAttribute('href'));
        let href = element.getAttribute('href');
        let res = await fetch(baseurl + href);
        let hr = new HTMLRewriter();
        let contentHandler = new StoryContentHandler();
        let thumbnailsHandler = new StoryThumbnailsHandler();
        await hr.on('div[class="story_content"] *', contentHandler)
                .on('li[class="thumbnail-item"] img', thumbnailsHandler);
        await hr.transform(res).blob();

        for (let i = 0; i < newsData.length; i++) {
            if (newsData[i].url === href) {
                this.item.pubDate = new Date(newsData[i].day.replaceAll('/', '-')).toUTCString();
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
}

class StoryContentHandler {
    constructor() {
        this.content = '';
    }
    element(element) {
        let openingTag = element.tagName;
        for (let i of element.attributes) {
            openingTag += ` ${i[0]}="${i[1]}"`;
        }
        try{ // handle error no end tag
            element.onEndTag((endTag) => {
                this.content += `</${endTag.name}>`;
            })
        }catch(e) {
            openingTag += '/';
        }
        this.content += `<${openingTag}>`;
    }
    text(text) {
        this.content += text.text;
    }
    getContent() {
        return this.content;
    }
}

class StoryThumbnailsHandler {
    constructor() {
        this.thumbnails = [];
    }
    element(element) {
        this.thumbnails.push(element.getAttribute('src').replace('../', baseurl));
    }
    getThumbnails() {
        return this.thumbnails;
    }
    getThumbnailsHTML() {
        let html = ''
        for (let i = 0; i < this.thumbnails.length; i++) {
            html += `<img src="${this.thumbnails[i]}"/>`
        }
        return html;
    }
}

export async function main(params) {
    newsData = await (await fetch('https://tenten-kakumei.com/news.json')).json();
    if (params.type !== 'story') {
        return handleNews(params.category);
    }

	const url = "https://tenten-kakumei.com/story.html";
    let res = await fetch(url);
    let hr = new HTMLRewriter();
	let handler = new StoryHandler();
    await hr.on('div[class="sp_box border_box"] a', handler)
            .on('div[class="sp_title"]', handler);
	await hr.transform(res).blob();

    return {
        title: `<![CDATA[ ストーリー | TVアニメ「転生王女と天才令嬢の魔法革命」公式サイト ]]>`,
        link: `https://tenten-kakumei.com/story.html`,
        description: `STORY | 转生王女与天才千金的魔法革命`,
        language: "ja-jp",
        lastBuildDate: new Date().toUTCString(),
        ttl: 1440,
        item: handler.getItems()
    };
}

async function handleNews(cat) {
    const category = cat ? await getCategory(cat) : 'all';
    console.log('Category: ', category);
    
    let items =[];
    for (let i = 0; i < newsData.length; i++) {
        if ('all' !== category && newsData[i].cat !== category) {
            continue;
        }
        let item = {
            title:    `<![CDATA[ ${newsData[i].title} ]]>`,
            link:     baseurl + newsData[i].url,
            pubDate:  new Date(newsData[i].day.replaceAll('/', '-')).toUTCString(),
            category: [newsData[i].cat]
        };
        items.push(item);
    }
    
    return {
        title: `<![CDATA[ ニュース | TVアニメ「転生王女と天才令嬢の魔法革命」公式サイト${'all' !== category ? ` - ${category}`: ''} ]]>`,
        link: `https://tenten-kakumei.com/news.html`,
        image: {
            url: 'https://tenten-kakumei.com/images/top/top_pc_logo2_pc_01.png',
            title: `<![CDATA[ ニュース | TVアニメ「転生王女と天才令嬢の魔法革命」公式サイト ]]>`,
            link: `https://tenten-kakumei.com/news.html`
        },
        description: `NEWS | 转生王女与天才千金的魔法革命`,
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
    return 'all';
}