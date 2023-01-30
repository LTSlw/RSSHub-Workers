const categories = ['all', 'info', 'onair', 'package', 'music', 'event', 'special'];
const baseurl = 'https://tenten-kakumei.com/';

export async function main(params) {
    const category = params.category ? await getCategory(params.category) : 'all';
    console.log('Category: ', category);

    const data = await (await fetch('https://tenten-kakumei.com/news.json')).json();
    
    let items =[];
    for (let i = 0; i < data.length; i++) {
        if ('all' !== category && data[i].cat !== category) {
            continue;
        }
        let item = {
            title:    `<![CDATA[ ${data[i].title} ]]>`,
            link:     baseurl + data[i].url,
            pubDate:  new Date(data[i].day.replaceAll('/', '-')).toUTCString(),
            category: [data[i].cat]
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