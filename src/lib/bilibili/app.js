const config = {
    android: '安卓版',
    iphone: 'iPhone 版',
    ipad: 'iPad HD 版',
    win: 'UWP 版',
    android_tv_yst: 'TV 版',
    android_car: '车机版',
    pc_client: '桌面客户端'
};

export async function main(params) {
    let id = params.id || 'android';
    if (!config[id]) {
        id = 'android';
    }

    const rootUrl = 'https://app.bilibili.com';
    const apiUrl = `${rootUrl}/x/v2/version?mobi_app=${id}`;
    const response = await (await fetch(apiUrl)).json();

    const items = response.data.map((item) => ({
        link: rootUrl,
        title: `<![CDATA[${item.version}]]>`,
        pubDate: new Date(item.ptime * 1000).toUTCString(),
        description: `<![CDATA[<li>${item.desc.split('\n-').join('</li><li>-')}</li>]]>`,
    }));

    return {
        title: `<![CDATA[哔哩哔哩更新情报 - ${config[id]}]]>`,
        description: `<![CDATA[哔哩哔哩更新情报 - ${config[id]}]]>`,
        link: rootUrl,
        language: "zh-cn",
        lastBuildDate: new Date().toUTCString(),
        ttl: 1440,
        item: items,
    };
};