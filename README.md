# RSSHub-Workers

RSSHub for cloulare workers  
RSSHub的Cloudflare Workers版本。

## 路由

### Anime News

#### 孤独摇滚！

ぼっち・ざ・ろっく！ | BOCCHI THE ROCK!

作者:[@LTSlw](https://github.com/LTSlw)  
示例:[/anime/bocchiTheRock/news](/anime/bocchiTheRock/news)  
路由:`/anime/bocchiTheRock/:category?`  
参数:

+ category, 可选 - 可选值`news`,默认值`news`

#### 转生王女与天才千金的魔法革命

転生王女と天才令嬢の魔法革命

作者:[@LTSlw](https://github.com/LTSlw)  
示例:[anime/tenten_kakumei](anime/tenten_kakumei)  
路由:`anime/tenten_kakumei/:type?/:category?`  
参数:

+ type, 可选 - 可选值`news`, `story`, 默认值`news`
+ category, 可选 - 在`type = news`时有意义, 可选值`all`, `info`, `onair`, `package`, `music`, `event`, `special`, 默认值`all`

### Bilibili - 番剧

作者:[@DIYgod](https://github.com/DIYgod)  
移植:[@LTSlw](https://github.com/lw-tech-soft)  
示例:[/bilibili/bangumi/9192](/bilibili/bangumi/9192)  
路由:`/bilibili/bangumi/:mediaid`  
参数:

+ mediaid, 必选 - 番剧媒体 id, 番剧主页 URL 中获取

### Bilibili - 更新情报

作者:[@nczitzk](https://github.com/nczitzk)  
移植:[@LTSlw](https://github.com/lw-tech-soft)  
更改:

+ 添加了车机版和桌面客户端支持([@LTSlw](https://github.com/lw-tech-soft))

示例:[/bilibili/app/android](/bilibili/app/android)  
路由:`/bilibili/app/:id?`  
参数:

+ id, 可选 - 客户端 id，见下表，默认为安卓版

安卓版|iPhone 版|iPad HD 版|UWP 版|TV 版|车机版|桌面客户端
---|---|---|---|---|---|---
android|iphone|ipad|win|android_tv_yst|android_car|pc_client

### [轻音图网](https://picture.k-on.space/)

作者:[@LTSlw](https://github.com/LTSlw)  
示例:[/konpic/pictures/group](/konpic/pictures/group)  
路由:`/konpic/pictures/:category`  
参数:

+ category, 必选 - 图片分类，见下表

今日上新|作者推荐|合照|多人照|单人照|客串|Lily
---|---|---|---|---|---|---
new|recommand|group|multiple|single|cameo|lily

## License

[MIT License](https://raw.githubusercontent.com/lw-tech-soft/RSSHub-Workers/main/LICENSE)
