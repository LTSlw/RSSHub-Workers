export async function main(params) {
    // 代码从RSShub迁移
    const mediaid = params.mediaid;

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
                title: `<![CDATA[ 第${item.title}话 ${item.long_title} ]]>`,
                description: `<![CDATA[ <img src="${item.cover}" referrerpolicy="no-referrer"> ]]>`,
                link: `https://www.bilibili.com/bangumi/play/ep${item.id}`,
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
                        link: `https://www.bilibili.com/bangumi/play/ep${item.id}`,
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