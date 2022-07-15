# RSS vs atom

## RSS 2.0

[原文链接](https://validator.w3.org/feed/docs/rss2.html)  
This document is authored by the RSS Advisory Board and is offered under the terms of the Creative Commons Attribution/Share Alike license, based on an original document published by the Berkman Center for Internet & Society.  
CC-BY-SA 2.0

本文绝大部分由谷歌翻译，中英对照，方便阅读

### channel

元素|描述|En|E.g.
---|---|---|---
**title**|频道的名称。这就是人们如何评价您的服务。如果您的 HTML 网站包含与您的 RSS 文件相同的信息，则您的频道标题应与您网站的标题相同。|	The name of the channel. It's how people refer to your service. If you have an HTML website that contains the same information as your RSS file, the title of your channel should be the same as the title of your website.|GoUpstate.com News Headlines
**link**|与频道对应的 HTML 网站的 URL。|The URL to the HTML website corresponding to the channel.|	http://www.goupstate.com/
**description**|描述频道的短语或句子。|Phrase or sentence describing the channel.|The latest news from GoUpstate.com, a Spartanburg Herald-Journal Web site.
language|频道所用的语言。这允许聚合器将所有意大利语网站分组，例如，在一个页面上。由 Netscape 提供的该元素的允许值列表在此处。您也可以使用W3C定义的值。|The language the channel is written in. This allows aggregators to group all Italian language sites, for example, on a single page. A list of allowable values for this element, as provided by Netscape, is here. You may also use values defined by the W3C.|en-us
copyright|频道内容的版权声明。|Copyright notice for content in the channel.|Copyright 2002, Spartanburg Herald-Journal
managingEditor|负责编辑内容的人员的电子邮件地址。|Email address for person responsible for editorial content.|geo@herald.com (George Matesky)
webMaster|负责渠道相关技术问题的人员的电子邮件地址。|Email address for person responsible for technical issues relating to channel.|betty@herald.com (Betty Guernsey)
pubDate|频道中内容的发布日期。例如，《纽约时报》每天发布一次，发布日期每 24 小时翻转一次。那是频道的 pubDate 发生变化的时候。RSS 中的所有日期时间都符合RFC 822的日期和时间规范，但年份可以用两个字符或四个字符（首选四个）表示。|	The publication date for the content in the channel. For example, the New York Times publishes on a daily basis, the publication date flips once every 24 hours. That's when the pubDate of the channel changes. All date-times in RSS conform to the Date and Time Specification of RFC 822, with the exception that the year may be expressed with two characters or four characters (four preferred).|Sat, 07 Sep 2002 00:00:01 GMT
lastBuildDate|上次频道内容更改的时间。|The last time the content of the channel changed.|Sat, 07 Sep 2002 09:42:31 GMT
category|指定频道所属的一个或多个类别。遵循与 \<item> 级别的类别元素相同的规则。更多信息。|Specify one or more categories that the channel belongs to. Follows the same rules as the \<item>-level category element. More info.|\<category>Newspapers\</category>
generator|一个字符串，指示用于生成频道的程序。|A string indicating the program used to generate the channel.|MightyInHouse Content System v2.3
docs|指向RSS 文件中使用的格式的文档的 URL。它可能是指向此页面的指针。它适用于那些可能在 25 年后偶然发现 Web 服务器上的 RSS 文件并想知道它是什么的人。|A URL that points to the documentation for the format used in the RSS file. It's probably a pointer to this page. It's for people who might stumble across an RSS file on a Web server 25 years from now and wonder what it is.|https://www.rssboard.org/rss-specification
cloud|允许向云注册的进程收到频道更新的通知，为 RSS 提要实现轻量级的发布-订阅协议。更多信息在这里。|Allows processes to register with a cloud to be notified of updates to the channel, implementing a lightweight publish-subscribe protocol for RSS feeds. More info here.|\<cloud domain="rpc.sys.com" port="80" path="/RPC2" registerProcedure="pingMe" protocol="soap" />
ttl|ttl 代表生存时间。它是分钟数，表示在从源刷新之前可以缓存频道的时间。更多信息在这里。|ttl stands for time to live. It's a number of minutes that indicates how long a channel can be cached before refreshing from the source. More info here.|\<ttl>60\</ttl>
image|指定可以与通道一起显示的 GIF、JPEG 或 PNG 图像。更多信息在这里。|Specifies a GIF, JPEG or PNG image that can be displayed with the channel. More info here.
rating|频道的PICS评级。|The PICS rating for the channel.
textInput|指定可以与频道一起显示的文本输入框。更多信息在这里。|Specifies a text input box that can be displayed with the channel. More info here.
skipHours|聚合器的提示，告诉他们可以跳过哪些时间。此元素包含最多 24 个 \<hour> 子元素，其值为 0 到 23 之间的数字，表示 GMT 时间，如果聚合器支持该功能，则可能无法在 \<skipHours> 中列出的小时读取频道元素。从午夜开始的小时是零时。|A hint for aggregators telling them which hours they can skip. This element contains up to 24 \<hour> sub-elements whose value is a number between 0 and 23, representing a time in GMT, when aggregators, if they support the feature, may not read the channel on hours listed in the \<skipHours> element. The hour beginning at midnight is hour zero.
skipDays|聚合器的提示，告诉他们可以跳过哪些日子。此元素最多包含七个 \<day> 子元素，其值为星期一、星期二、星期三、星期四、星期五、星期六或星期日。在 \<skipDays> 元素中列出的日子里，聚合器可能无法读取频道。|A hint for aggregators telling them which days they can skip. This element contains up to seven \<day> sub-elements whose value is Monday, Tuesday, Wednesday, Thursday, Friday, Saturday or Sunday. Aggregators may not read the channel during days listed in the \<skipDays> element.

#### image

```
<image> is an optional sub-element of <channel>, which contains three required and three optional sub-elements.

<url> is the URL of a GIF, JPEG or PNG image that represents the channel.

<title> describes the image, it's used in the ALT attribute of the HTML <img> tag when the channel is rendered in HTML.

<link> is the URL of the site, when the channel is rendered, the image is a link to the site. (Note, in practice the image <title> and <link> should have the same value as the channel's <title> and <link>.

Optional elements include <width> and <height>, numbers, indicating the width and height of the image in pixels. <description> contains text that is included in the TITLE attribute of the link formed around the image in the HTML rendering.

Maximum value for width is 144, default value is 88.

Maximum value for height is 400, default value is 31.
```

```
<image> 是 <channel> 的一个可选子元素，包含三个必需子元素和三个可选子元素。

<url> 是代表频道的 GIF、JPEG 或 PNG 图像的 URL。

<title> 描述图像，当频道以 HTML 呈现时，它用于 HTML <img> 标签的 ALT 属性。

<link> 是站点的 URL，当通道被渲染时，图像是站点的链接。（注意，实际上图像 <title> 和 <link> 应该与频道的 <title> 和 <link> 具有相同的值。

可选元素包括 <width> 和 <height>，数字，表示图像的宽度和高度，以像素为单位。<description> 包含包含在 HTML 呈现中围绕图像形成的链接的 TITLE 属性中的文本。

宽度的最大值为 144，默认值为 88。

高度最大值为 400，默认值为 31
```

#### cloud

```
<cloud> is an optional sub-element of <channel>.

It specifies a web service that supports the rssCloud interface which can be implemented in HTTP-POST, XML-RPC or SOAP 1.1.

Its purpose is to allow processes to register with a cloud to be notified of updates to the channel, implementing a lightweight publish-subscribe protocol for RSS feeds.

<cloud domain="rpc.sys.com" port="80" path="/RPC2" registerProcedure="myCloud.rssPleaseNotify" protocol="xml-rpc" />

In this example, to request notification on the channel it appears in, you would send an XML-RPC message to rpc.sys.com on port 80, with a path of /RPC2. The procedure to call is myCloud.rssPleaseNotify.

A full explanation of this element and the rssCloud interface is here.
```

```
<cloud> 是 <channel> 的可选子元素。

它指定了一个支持 rssCloud 接口的 Web 服务，该接口可以在 HTTP-POST、XML-RPC 或 SOAP 1.1 中实现。

其目的是允许向云注册的进程收到频道更新的通知，为 RSS 提要实现轻量级的发布-订阅协议。

<cloud domain="rpc.sys.com" port="80" path="/RPC2" registerProcedure="myCloud.rssPleaseNotify" protocol="xml-rpc" />

在此示例中，要在它出现的通道上请求通知，您将在端口 80 上向 rpc.sys.com 发送一条 XML-RPC 消息，路径为 /RPC2。调用的过程是 myCloud.rssPleaseNotify。

这个元素和 rssCloud 界面的完整解释在这里。
```

#### ttl

```
<ttl> is an optional sub-element of <channel>.

ttl stands for time to live. It's a number of minutes that indicates how long a channel can be cached before refreshing from the source. This makes it possible for RSS sources to be managed by a file-sharing network such as Gnutella.

Example:

<ttl>60</ttl>
```

```
<ttl> 是 <channel> 的可选子元素。

ttl 代表生存时间。它是分钟数，表示在从源刷新之前可以缓存频道的时间。这使得 RSS 源可以由 Gnutella 等文件共享网络管理。

例子：

<ttl>60</ttl>
```

#### textInput

```
A channel may optionally contain a <textInput> sub-element, which contains four required sub-elements.

<title> -- The label of the Submit button in the text input area.

<description> -- Explains the text input area.

<name> -- The name of the text object in the text input area.

<link> -- The URL of the CGI script that processes text input requests.

The purpose of the <textInput> element is something of a mystery. You can use it to specify a search engine box. Or to allow a reader to provide feedback. Most aggregators ignore it.
```

```
一个通道可以选择包含一个 <textInput> 子元素，它包含四个必需的子元素。

<title> -- 文本输入区域中提交按钮的标签。

<description> -- 解释文本输入区域。

<name> -- 文本输入区域中文本对象的名称。

<link> -- 处理文本输入请求的 CGI 脚本的 URL。

<textInput> 元素的用途是个谜。您可以使用它来指定搜索引擎框。或者让读者提供反馈。大多数聚合器忽略它。
```

### Item

项目的所有元素都是可选的，但至少必须存在标题或描述之一。

元素|描述|En|E.g.
---|---|---|---
**title**|项目的标题。|The title of the item.|Venice Film Festival Tries to Quit Sinking
link|项目的 URL。|The URL of the item.|http://nytimes.com/2004/12/07FEST.html
**description**|项目概要。|The item synopsis.|\<description>Some of the most heated chatter at the Venice Film Festival this week was about the way that the arrival of the stars at the Palazzo del Cinema was being staged.\</description>
author|项目作者的电子邮件地址。更多。|Email address of the author of the item. More.
category|将项目包括在一个或多个类别中。更多。|Includes the item in one or more categories. More.
comments|与项目相关的评论页面的 URL。更多。|URL of a page for comments relating to the item. More.
enclosure|描述附加到项目的媒体对象。更多。|Describes a media object that is attached to the item. More.
guid|唯一标识项目的字符串。更多。|A string that uniquely identifies the item. More.
pubDate|指示项目的发布时间。更多。|Indicates when the item was published. More.
source|项目来自的 RSS 频道。更多。|The RSS channel that the item came from. More.

#### source

```
<source> is an optional sub-element of <item>.

Its value is the name of the RSS channel that the item came from, derived from its <title>. It has one required attribute, url, which links to the XMLization of the source.

<source url="http://www.tomalak.org/links2.xml">Tomalak's Realm</source>

The purpose of this element is to propagate credit for links, to publicize the sources of news items. It can be used in the Post command of an aggregator. It should be generated automatically when forwarding an item from an aggregator to a weblog authoring tool.
```

```
<source> 是 <item> 的可选子元素。

它的值是项目来自的 RSS 频道的名称，从它的 <title> 派生。它有一个必需的属性 url，它链接到源的 XML 化。

<source url="http://www.tomalak.org/links2.xml">托马拉克的境界</source>

此元素的目的是传播链接的信誉，宣传新闻项目的来源。它可以在聚合器的 Post 命令中使用。它应该在将项目从聚合器转发到博客创作工具时自动生成。
```

#### enclosure

```
<enclosure> is an optional sub-element of <item>.

It has three required attributes. url says where the enclosure is located, length says how big it is in bytes, and type says what its type is, a standard MIME type.

The url must be an http url.

<enclosure url="http://www.scripting.com/mp3s/weatherReportSuite.mp3" length="12216320" type="audio/mpeg" />

A use-case narrative for this element is here.
```

```
<enclosure> 是 <item> 的可选子元素。

它具有三个必需的属性。url 表示外壳所在的位置，length 表示它有多大（以字节为单位），type 表示它的类型是什么，一个标准的 MIME 类型。

url 必须是 http url。

<enclosure url="http://www.scripting.com/mp3s/weatherReportSuite.mp3" length="12216320" type="audio/mpeg" />

此元素的用例说明在此处。
```

#### category

```
<category> is an optional sub-element of <item>.

It has one optional attribute, domain, a string that identifies a categorization taxonomy.

The value of the element is a forward-slash-separated string that identifies a hierarchic location in the indicated taxonomy. Processors may establish conventions for the interpretation of categories. Two examples are provided below:

<category>Grateful Dead</category>

<category domain="http://www.fool.com/cusips">MSFT</category>

You may include as many category elements as you need to, for different domains, and to have an item cross-referenced in different parts of the same domain.
```

```
<category> 是 <item> 的可选子元素。

它有一个可选属性，域，一个标识分类分类的字符串。

元素的值是一个正斜杠分隔的字符串，用于标识指定分类法中的分层位置。处理器可以建立解释类别的约定。下面提供了两个示例：

<category>感恩的死者</category>

<category domain="http://www.fool.com/cusips">MSFT</category>

对于不同的域，您可以根据需要包含尽可能多的类别元素，并在同一域的不同部分中交叉引用一个项目。
```

#### pubDate

```
<pubDate> is an optional sub-element of <item>.

Its value is a date, indicating when the item was published. If it's a date in the future, aggregators may choose to not display the item until that date.

<pubDate>Sun, 19 May 2002 15:21:36 GMT</pubDate>
```

```
<pubDate> 是 <item> 的可选子元素。

它的值是一个日期，表示项目的发布时间。如果是未来的某个日期，聚合器可能会选择在该日期之前不显示该项目。

<pubDate> 2002 年 5 月 19 日星期日 15:21:36 GMT </pubDate>
```

#### guid

```
<guid> is an optional sub-element of <item>.

guid stands for globally unique identifier. It's a string that uniquely identifies the item. When present, an aggregator may choose to use this string to determine if an item is new.

<guid>http://some.server.com/weblogItem3207</guid>

There are no rules for the syntax of a guid. Aggregators must view them as a string. It's up to the source of the feed to establish the uniqueness of the string.

If the guid element has an attribute named isPermaLink with a value of true, the reader may assume that it is a permalink to the item, that is, a url that can be opened in a Web browser, that points to the full item described by the <item> element. An example:

<guid isPermaLink="true">http://inessential.com/2002/09/01.php#a2</guid>

isPermaLink is optional, its default value is true. If its value is false, the guid may not be assumed to be a url, or a url to anything in particular.
```

```
<guid> 是 <item> 的可选子元素。

guid 代表全局唯一标识符。这是一个唯一标识项目的字符串。如果存在，聚合器可以选择使用此字符串来确定项目是否是新的。

<guid>http://some.server.com/weblogItem3207</guid>

guid 的语法没有规则。聚合器必须将它们视为字符串。建立字符串的唯一性取决于提要的来源。

如果 guid 元素有一个名为 isPermaLink 且值为 true 的属性，读者可能会认为它是该项目的永久链接，即可以在 Web 浏览器中打开的 url，它指向描述的完整项目<item> 元素。一个例子：

<guid isPermaLink="true">http://inessential.com/2002/09/01.php#a2</guid>

isPermaLink 是可选的，其默认值为 true。如果它的值为 false，则 guid 可能不会被假定为 url，或任何特定内容的 url。
```

#### comments

```
<comments> is an optional sub-element of <item>.

If present, it is the url of the comments page for the item.

<comments>http://ekzemplo.com/entry/4403/comments</comments>

More about comments here.
```

```
<comments> 是 <item> 的可选子元素。

如果存在，它是该项目的评论页面的 url。

<comments>http://ekzemlo.com/entry/4403/comments</comments>
```

#### author

```
<author> is an optional sub-element of <item>.

It's the email address of the author of the item. For newspapers and magazines syndicating via RSS, the author is the person who wrote the article that the <item> describes. For collaborative weblogs, the author of the item might be different from the managing editor or webmaster. For a weblog authored by a single individual it would make sense to omit the <author> element.

<author>lawyer@boyer.net (Lawyer Boyer)</author>
```

```
<author> 是 <item> 的可选子元素。

这是项目作者的电子邮件地址。对于通过 RSS 联合发布的报纸和杂志，作者是撰写 <item> 描述的文章的人。对于协作网络博客，项目的作者可能与总编辑或网站管理员不同。对于由一个人创作的博客，省略 <author> 元素是有意义的。

<author>lawyer@boyer.net（博耶律师）</author>
```

### 注释

```
RSS places restrictions on the first non-whitespace characters of the data in <link> and <url> elements. The data in these elements must begin with an IANA-registered URI scheme, such as http://, https://, news://, mailto: and ftp://. Prior to RSS 2.0, the specification only allowed http:// and ftp://, however, in practice other URI schemes were in use by content developers and supported by aggregators. Aggregators may have limits on the URI schemes they support. Content developers should not assume that all aggregators support all schemes.

In RSS 0.91, various elements are restricted to 500 or 100 characters. There can be no more than 15 <items> in a 0.91 <channel>. There are no string-length or XML-level limits in RSS 0.92 and greater. Processors may impose their own limits, and generators may have preferences that say no more than a certain number of <item>s can appear in a channel, or that strings are limited in length.

In RSS 2.0, a provision is made for linking a channel to its identifier in a cataloging system, using the channel-level category feature, described above. For example, to link a channel to its Syndic8 identifier, include a category element as a sub-element of <channel>, with domain "Syndic8", and value the identifier for your channel in the Syndic8 database. The appropriate category element for Scripting News would be <category domain="Syndic8">1765</category>.

A frequently asked question about <guid>s is how do they compare to <link>s. Aren't they the same thing? Yes, in some content systems, and no in others. In some systems, <link> is a permalink to a weblog item. However, in other systems, each <item> is a synopsis of a longer article, <link> points to the article, and <guid> is the permalink to the weblog entry. In all cases, it's recommended that you provide the guid, and if possible make it a permalink. This enables aggregators to not repeat items, even if there have been editing changes.

If you have questions about the RSS 2.0 format, please post them on the RSS-Public mailing list. The list, maintained by the RSS Advisory Board, serves as a support resource for users, authors and developers who are creating and using content in the format.RSS places restrictions on the first non-whitespace characters of the data in <link> and <url> elements. The data in these elements must begin with an IANA-registered URI scheme, such as http://, https://, news://, mailto: and ftp://. Prior to RSS 2.0, the specification only allowed http:// and ftp://, however, in practice other URI schemes were in use by content developers and supported by aggregators. Aggregators may have limits on the URI schemes they support. Content developers should not assume that all aggregators support all schemes.

In RSS 0.91, various elements are restricted to 500 or 100 characters. There can be no more than 15 <items> in a 0.91 <channel>. There are no string-length or XML-level limits in RSS 0.92 and greater. Processors may impose their own limits, and generators may have preferences that say no more than a certain number of <item>s can appear in a channel, or that strings are limited in length.

In RSS 2.0, a provision is made for linking a channel to its identifier in a cataloging system, using the channel-level category feature, described above. For example, to link a channel to its Syndic8 identifier, include a category element as a sub-element of <channel>, with domain "Syndic8", and value the identifier for your channel in the Syndic8 database. The appropriate category element for Scripting News would be <category domain="Syndic8">1765</category>.

A frequently asked question about <guid>s is how do they compare to <link>s. Aren't they the same thing? Yes, in some content systems, and no in others. In some systems, <link> is a permalink to a weblog item. However, in other systems, each <item> is a synopsis of a longer article, <link> points to the article, and <guid> is the permalink to the weblog entry. In all cases, it's recommended that you provide the guid, and if possible make it a permalink. This enables aggregators to not repeat items, even if there have been editing changes.

If you have questions about the RSS 2.0 format, please post them on the RSS-Public mailing list. The list, maintained by the RSS Advisory Board, serves as a support resource for users, authors and developers who are creating and using content in the format.
```

```
RSS 对 <link> 和 <url> 元素中数据的第一个非空白字符进行了限制。这些元素中的数据必须以IANA 注册的URI 方案开头，例如 http://、https://、news://、mailto: 和 ftp://。在 RSS 2.0 之前，规范只允许 http:// 和 ftp://，然而，实际上其他 URI 方案被内容开发人员使用并由聚合器支持。聚合器可能对其支持的 URI 方案有限制。内容开发人员不应假设所有聚合器都支持所有方案。

在 RSS 0.91 中，各种元素被限制为 500 或 100 个字符。一个 0.91 <channel> 中的 <items> 不能超过 15 个。RSS 0.92 及更高版本中没有字符串长度或 XML 级别的限制。处理器可能会施加自己的限制，并且生成器可能有偏好，即在通道中最多可以出现一定数量的 <item>，或者字符串的长度受到限制。

在 RSS 2.0 中，使用上述渠道级类别功能，将渠道与其在编目系统中的标识符联系起来。例如，要将频道链接到其 Syndic8 标识符，请包含一个类别元素作为 <channel> 的子元素，域为“Syndic8”，并为您的频道在 Syndic8 数据库中的标识符赋值。脚本新闻的适当类别元素是 <category domain="Syndic8">1765</category>。

关于 <guid> 的一个常见问题是它们与 <link> 相比如何。他们不是一样的吗？是的，在某些内容系统中，而在其他内容系统中则没有。在某些系统中，<link> 是指向博客项目的永久链接。但是，在其他系统中，每个 <item> 是一篇较长文章的概要，<link> 指向该文章，而 <guid> 是指向博客条目的永久链接。在所有情况下，建议您提供 guid，并尽可能将其设为永久链接。这使聚合器不会重复项目，即使有编辑更改。

如果您对 RSS 2.0 格式有任何疑问，请将它们发布在RSS-Public邮件列表中。该列表由 RSS 顾问委员会维护，为创建和使用该格式内容的用户、作者和开发人员提供支持资源。
```

### 扩展 RSS

```
RSS originated in 1999, and has strived to be a simple, easy to understand format, with relatively modest goals. After it became a popular format, developers wanted to extend it using modules defined in namespaces, as specified by the W3C.

RSS 2.0 adds that capability, following a simple rule. A RSS feed may contain elements and attributes not described on this page, only if those elements and attributes are defined in a namespace.

The elements defined in this document are not themselves members of a namespace, so that RSS 2.0 can remain compatible with previous versions in the following sense -- a version 0.91 or 0.92 file is also a valid 2.0 file. If the elements of RSS 2.0 were in a namespace, this constraint would break, a version 0.9x file would not be a valid 2.0 file.
```

```
RSS 起源于 1999 年，一直致力于成为一种简单、易于理解的格式，目标相对温和。在它成为一种流行的格式后，开发人员希望使用W3C指定的命名空间中定义的模块来扩展它。

RSS 2.0 遵循一个简单的规则添加了该功能。RSS 提要可能包含此页面上未描述的元素和属性，前提是这些元素和属性在命名空间中定义。

本文档中定义的元素本身不是命名空间的成员，因此 RSS 2.0 可以在以下意义上与以前的版本保持兼容——0.91 或 0.92 版本的文件也是有效的 2.0 文件。如果 RSS 2.0 的元素位于命名空间中，则此约束将被打破，版本 0.9x 文件将不是有效的 2.0 文件。
```

### 未来蓝图

```
RSS is by no means a perfect format, but it is very popular and widely supported. Having a settled spec is something RSS has needed for a long time. The purpose of this work is to help it become a unchanging thing, to foster growth in the market that is developing around it, and to clear the path for innovation in new syndication formats. Therefore, the RSS spec is, for all practical purposes, frozen at version 2.0.1. We anticipate possible 2.0.2 or 2.0.3 versions, etc. only for the purpose of clarifying the specification, not for adding new features to the format. Subsequent work should happen in modules, using namespaces, and in completely new syndication formats, with new names.
```

```
RSS 绝不是一种完美的格式，但它非常流行并得到广泛支持。有一个固定的规范是 RSS 长期以来所需要的。这项工作的目的是帮助它成为一个不变的事物，促进围绕它发展的市场的增长，并为新的联合形式的创新扫清道路。因此，出于所有实际目的，RSS 规范在 2.0.1 版本中被冻结。我们预计可能的 2.0.2 或 2.0.3 版本等只是为了阐明规范，而不是为了向格式添加新功能。随后的工作应该在模块中进行，使用命名空间，并以全新的联合格式，使用新名称。
```

## Atom

[原文链接](https://validator.w3.org/feed/docs/atom.html)  

### feed

元素|描述|En|E.g.
---|---|---|---
**id**|使用通用唯一且永久的 URI标识提要。如果您的 Internet 域名有长期、可续租的租约，那么您可以随意使用您的网站地址。|Identifies the feed using a universally unique and permanent URI. If you have a long-term, renewable lease on your Internet domain name, then you can feel free to use your website's address.|\<id>http://example.com/\</id>
**title**|包含供稿的人类可读标题。通常与相关网站的标题相同。此值不应为空。|Contains a human readable title for the feed. Often the same as the title of the associated website. This value should not be blank.|\<title>Example, Inc.\</title>
**updated**|表示上次对提要进行重大修改的时间。|Indicates the last time the feed was modified in a significant way.|\<updated>2003-12-13T18:30:02Z\</updated>
*author*|列出提要的一位作者。一个提要可能有多个 author元素。一个提要必须至少包含一个 元素，author除非所有entry 元素都包含至少一个author元素。更多信息在这里。|Names one author of the feed. A feed may have multiple elements. A feed must contain at least one element unless all of the elements contain at least one element. More info here. authorauthorentryauthor|\<author>\<name>John Doe\</name>\<email>JohnDoe@example.com\</email>  \<uri>http://example.com/~johndoe\</uri>\</author>
*link*|标识相关的网页。关系的类型由rel属性定义。alternate一个提要仅限于一个type和hreflang。提要应包含指向提要本身的链接。更多信息在这里。|Identifies a related Web page. The type of relation is defined by the attribute. A feed is limited to one per and . A feed should contain a link back to the feed itself. More info here. |\<link rel="self" href="/feed" />
category|指定提要所属的类别。Afeed可能有多个category元素。更多信息在这里。|Specifies a category that the feed belongs to. A may have multiple elements. More info here. feedcategory|\<category term="sports"/>
contributor|列出提要的一位贡献者。一个提要可能有多个贡献者元素。更多信息在这里|Names one contributor to the feed. An feed may have multiple contributor elements. More info here.|\<contributor>\<name>Jane Doe\</name>\</contributor>
generator|标识用于生成提要、用于调试和其他目的的软件。uri和version属性都是可选的 。|Identifies the software used to generate the feed, for debugging and other purposes. Both the uri and attributes are optional. version|\<generator uri="/myblog.php" version="1.0">Example Toolkit\</generator>
icon|标识为提要提供标志性视觉识别的小图像。图标应该是方形的。|Identifies a small image which provides iconic visual identification for the feed. Icons should be square.|\<icon>/icon.jpg\</icon>
logo|标识为提要提供视觉识别的较大图像。图像的宽度应该是高度的两倍。|Identifies a larger image which provides visual identification for the feed. Images should be twice as wide as they are tall.|\<logo>/logo.jpg\</logo>
rights|传达有关权利的信息，例如版权，在提要中和提要之上。更多信息在这里。|Conveys information about rights, e.g. copyrights, held in and over the feed. More info here.|\<rights> © 2005 John Doe \</rights>
subtitle|包含供稿的人类可读描述或副标题。更多信息在这里。|Contains a human-readable description or subtitle for the feed. More info here.|\<subtitle>all your examples are belong to us\</subtitle>

### entry

元素|描述|En|E.g.
---|---|---|---
**id**|使用通用唯一且永久的 URI标识条目。可以在 此处找到有关如何制作好 id 的建议。如果 Feed 中的两个条目在不同的时间点表示相同的条目，则它们可以具有相同的 id 值。|Identifies the entry using a universally unique and permanent URI. Suggestions on how to make a good id can be found here. Two entries in a feed can have the same value for id if they represent the same entry at different points in time.|\<id>http://example.com/blog/1234\</id>
**title**|包含条目的人类可读标题。此值不应为空。|Contains a human readable title for the entry. This value should not be blank.|\<title>Atom-Powered Robots Run Amok\</title>
**updated**|指示上次以重要方式修改条目的时间。修正错字后，此值无需更改，只需经过实质性修改即可。通常，Feed 中的不同条目将具有不同的更新时间戳。|Indicates the last time the entry was modified in a significant way. This value need not change after a typo is fixed, only after a substantial modification. Generally, different entries in a feed will have different updated timestamps.|\<updated>2003-12-13T18:30:02-05:00\</updated>
*author*|命名条目的一位作者。一个条目可能有多个作者。一个条目必须至少包含一个 author元素，除非封闭元素中有一个author元素feed，或者author封闭元素中有一个source元素。更多信息在这里。|Names one author of the entry. An entry may have multiple authors. An entry must contain at least one author element unless there is an author element in the enclosing feed, or there is an author element in the enclosed source element. More info here.|\<author>\<name>John Doe\</name>\</author>
*content*|包含或链接到条目的完整内容。没有链接的必须提供内容，没有alternate链接的必须提供summary。更多信息在这里。|Contains or links to the complete content of the entry. Content must be provided if there is no alternate link, and should be provided if there is no summary. More info here.|\<content>complete story here\</content>
*link*|标识相关的网页。关系的类型由rel属性定义。alternate一个条目仅限于一个type和hreflang。alternate如果没有content元素，则条目必须包含链接。更多信息在这里。|Identifies a related Web page. The type of relation is defined by the rel attribute. An entry is limited to one alternate per type and hreflang. An entry must contain an alternate link if there is no content element. More info here.|\<link rel="alternate" href="/blog/1234"/>
*summary*|传达条目的简短摘要、摘要或摘录。如果没有为条目提供内容，或者内容不是内联的（即包含 src 属性），或者内容以 base64 编码，则应提供摘要。更多信息在这里。|Conveys a short summary, abstract, or excerpt of the entry. Summary should be provided if there either is no content provided for the entry, or that content is not inline (i.e., contains a src attribute), or if the content is encoded in base64. More info here.|\<summary>Some text.\</summary>
category|指定条目所属的类别。Aentry可能有多个category元素。更多信息在这里。|Specifies a category that the entry belongs to. A entry may have multiple category elements. More info here.|\<category term="technology"/>
contributor|命名条目的一位贡献者。一个条目可能有多个contributor元素。更多信息在这里。|Names one contributor to the entry. An entry may have multiple contributor elements. More info here.|\<contributor>\<name>Jane Doe\</name>\</contributor>
published|包含条目的初始创建时间或首次可用时间。|Contains the time of the initial creation or first availability of the entry.|\<published>2003-12-13T09:17:51-08:00\</published>
rights|传达有关权利的信息，例如版权，在条目中和条目之上。更多信息在这里。|Conveys information about rights, e.g. copyrights, held in and over the entry. More info here.|\<rights type="html">&amp;copy; 2005 John Doe\</rights>
source|如果此条目是副本，则包含来自源提要的元数据。|Contains metadata from the source feed if this entry is a copy.|\<source>\<id>http://example.org/\</id>\<title>Example, Inc.\</title>\<updated>2003-12-13T18:30:02Z\</updated>\</source>

## 对比

### channel vs feed

RSS|ATOM|用途(Atom优先)
---|---|---
-|**id**|使用通用唯一且永久的 URI标识提要。如果您的 Internet 域名有长期、可续租的租约，那么您可以随意使用您的网站地址。
**title**|**title**|包含供稿的人类可读标题。通常与相关网站的标题相同。此值不应为空。
lastBuildDate|**updated**|表示上次对提要进行重大修改的时间。
managingEditor|*author*|列出提要的一位作者。一个提要可能有多个 author元素。一个提要必须至少包含一个 元素，author除非所有entry 元素都包含至少一个author元素。更多信息在这里。
**link**|*link*|标识相关的网页。关系的类型由rel属性定义。alternate一个提要仅限于一个type和hreflang。提要应包含指向提要本身的链接。更多信息在这里。
category|category|指定提要所属的类别。Afeed可能有多个category元素。更多信息在这里。
-|contributor|列出提要的一位贡献者。一个提要可能有多个贡献者元素。更多信息在这里
generator|generator|标识用于生成提要、用于调试和其他目的的软件。uri和version属性都是可选的 。
-|icon|标识为提要提供标志性视觉识别的小图像。图标应该是方形的。
image|logo|标识为提要提供视觉识别的较大图像。图像的宽度应该是高度的两倍。
copyright|rights|传达有关权利的信息，例如版权，在提要中和提要之上。更多信息在这里。
**description**|subtitle|包含供稿的人类可读描述或副标题。更多信息在这里。
language|-|频道所用的语言。这允许聚合器将所有意大利语网站分组，例如，在一个页面上。由 Netscape 提供的该元素的允许值列表在此处。您也可以使用W3C定义的值。
webMaster|-|负责渠道相关技术问题的人员的电子邮件地址。
pubDate|-|频道中内容的发布日期。例如，《纽约时报》每天发布一次，发布日期每 24 小时翻转一次。那是频道的 pubDate 发生变化的时候。RSS 中的所有日期时间都符合RFC 822的日期和时间规范，但年份可以用两个字符或四个字符（首选四个）表示。
docs|-|指向RSS 文件中使用的格式的文档的 URL。它可能是指向此页面的指针。它适用于那些可能在 25 年后偶然发现 Web 服务器上的 RSS 文件并想知道它是什么的人。
cloud|-|允许向云注册的进程收到频道更新的通知，为 RSS 提要实现轻量级的发布-订阅协议。更多信息在这里。
ttl|-|ttl 代表生存时间。它是分钟数，表示在从源刷新之前可以缓存频道的时间。更多信息在这里。
rating|-|频道的PICS评级。
textInput|-|指定可以与频道一起显示的文本输入框。更多信息在这里
skipHours|-|聚合器的提示，告诉他们可以跳过哪些时间。此元素包含最多 24 个 \<hour> 子元素，其值为 0 到 23 之间的数字，表示 GMT 时间，如果聚合器支持该功能，则可能无法在 \<skipHours> 中列出的小时读取频道元素。从午夜开始的小时是零时。
skipDays|-|聚合器的提示，告诉他们可以跳过哪些日子。此元素最多包含七个 <day> 子元素，其值为星期一、星期二、星期三、星期四、星期五、星期六或星期日。在 <skipDays> 元素中列出的日子里，聚合器可能无法读取频道。

### item vs entry

RSS|ATOM|用途(Atom优先)
---|---|---
guid|**id**|使用通用唯一且永久的 URI标识条目。可以在 此处找到有关如何制作好 id 的建议。如果 Feed 中的两个条目在不同的时间点表示相同的条目，则它们可以具有相同的 id 值。
**title**|**title**|包含条目的人类可读标题。此值不应为空。
-|**updated**|指示上次以重要方式修改条目的时间。修正错字后，此值无需更改，只需经过实质性修改即可。通常，Feed 中的不同条目将具有不同的更新时间戳。
author|*author*|命名条目的一位作者。一个条目可能有多个作者。一个条目必须至少包含一个 author元素，除非封闭元素中有一个author元素feed，或者author封闭元素中有一个source元素。更多信息在这里。
description|*content*|包含或链接到条目的完整内容。没有链接的必须提供内容，没有alternate链接的必须提供summary。更多信息在这里。
link|*link*|标识相关的网页。关系的类型由rel属性定义。alternate一个条目仅限于一个type和hreflang。alternate如果没有content元素，则条目必须包含链接。更多信息在这里。
-|*summary*|传达条目的简短摘要、摘要或摘录。如果没有为条目提供内容，或者内容不是内联的（即包含 src 属性），或者内容以 base64 编码，则应提供摘要。更多信息在这里。
category|category|指定条目所属的类别。Aentry可能有多个category元素。更多信息在这里。
-|contributor|命名条目的一位贡献者。一个条目可能有多个contributor元素。更多信息在这里。
pubDate|published|包含条目的初始创建时间或首次可用时间。
-|rights|传达有关权利的信息，例如版权，在条目中和条目之上。更多信息在这里。
-|source|如果此条目是副本，则包含来自源提要的元数据。
comments|-|与项目相关的评论页面的 URL。更多。
enclosure|-|描述附加到项目的媒体对象。更多。
source|-|项目来自的 RSS 频道。更多。