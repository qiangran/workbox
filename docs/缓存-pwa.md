## PWA

#### 第一问：PWA是什么

```
不是一个单纯的框架，不是一个单独的技术，而是应用了多项技术的 Web App；
全称Progressive Web App；
翻译为[渐进式网页应用]；
```

#### 第二问：PWA的特点有哪些

![image-20190627174905041](/Users/qiangran/Library/Application Support/typora-user-images/image-20190627174905041.png)

####第三问：为什么要使用PWA

这就要从前端的现状说起：

Native APP 用起来很流畅，但是也有其天然的基因缺陷：

> - 由于其天生封闭的基因，内容无法被索引
> - 用户 80% 的时间被 Top3 的超级 App 占据，对于站点来说，应用分发的性价比也越来越不划算
> - 要使用它，首先还需要下载几十兆上百着兆的安装包

WEB前端虽然天生具有开放的基因，但是很多时候页面会卡顿，用户体验不佳。虽然社区之前也做过很多努力，例如`virtual dom`、`spa`、混合编程、用`canvas`将整个页面画出来，用户体验也有了很大的改善，但是仍然无法解决几个重要的问题：

> - 离线时用户无法使用
> - 无法接收消息推送
> - 移动端没有一级入口



W3C和谷歌看到了这些问题，于是推出了`PWA`。其目标就是提升 Web App 的性能，改善 Web App 的用户体验。媲美native的流畅体验，将网络之长与应用之长相结合

注：摘自[[简单介绍一下Progressive Web App(PWA)](https://juejin.im/post/5a6c86e451882573505174e7)]

####第四问：PWA的缓存策略有哪些

**cache-first**

> Cache-First策略会在有缓存的时候返回缓存，没有缓存才会去请求并且把请求结果缓存。也就是说，第一次页面加载跟普通页面加载没有任何区别的，第二次访问的资源是直接走了本地缓存数据的。

![image-20190704140923982](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704140923982.png)

![image-20190704140937346](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704140937346.png)

**network-first**

> network-first 是一个比较复杂的策略。资源优先走网络，成功以后会把资源添加到缓存里面，当发现网失败就会回退读取缓存。这里面有一个点就是，多长时间算网络请求失败？这时候就需要配置一个超时时间，如果不配置回退缓存的时间就会比较长。这个时间根据自身项目而定。

![image-20190704141115318](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704141115318.png)

**stale-while-revalidate**

> 这种策略比较接近cache-first,他们的区别在于他会先走缓存，走完缓存以后它会发出请求，请求的结果会用来更新缓存，也就是说你的下一次访问的如果时间足够请求返回的话，你就能拿到最新的数据了。

 ![image-20190704141149632](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704141149632.png)

**cache-only**

> 只会去缓存里拿数据，缓存没有就失败了

![image-20190704141225080](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704141225080.png)

**network-only**

> network-only 只请求线上，不读写缓存。

![image-20190704141255157](/Users/qiangran/Library/Application Support/typora-user-images/image-20190704141255157.png)



#### 第五问：如何让自己的应用变成PWA 

需要用到以下技术：

1. Service Worker：PWA 功能的核心部件，主要APP功能的控制、承载者；

2. App Manifest：一个负责将 PWA 像是 APP 一样安装到移动端的JSON格式文件；

3. Push API：允许 Web 应用拥有接收服务器并推送消息的能力（Web App 内部的消息推送）；

4. Notifications API：允许 Web 应用向用户显示系统通知；

5. Background Sync：可延迟发送用户行为，直到用户网络连接稳定。

      

在这里我们主要关注`Service Worker`,那么问题又来了，什么是Service Worker,两个单词都认识，合在一起表达的是什么呢？

参考文档：

[官网](https://developers.google.com/web/fundamentals/primers/service-workers/?hl=zh-cn)

[渐进式 Web 应用（PWA）](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)

[简单介绍一下Progressive Web App(PWA)](https://juejin.im/post/5a6c86e451882573505174e7)

https://lavas.baidu.com/pwa by LAVAS



