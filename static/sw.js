importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);

    skipWaiting();

    /**
     * 强制让未受控的客户端被控制
     * 
     **/
    self.addEventListener('active', function(event) {
        self.clients.claim();
    });

    /**
     * 需要被缓存的文件的 URL 列表
     * 靠手动维护 precache.precacheAndRoute API 中的预缓存内容列表是不可能的，一般是要借助一些工具来干这个事情
     * 如：workbox-webpack-plugin等
     *  */
    workbox.precaching.precacheAndRoute([
        '/assets/02.png',
    ]);

    // JS 请求: 网络优先
    workbox.routing.registerRoute(
        new RegExp('.*\.js'),
        new workbox.strategies.NetworkFirst({
            cacheName: 'workbox:js',
        })
    );
    // CSS 请求: 缓存优先，同时后台更新后下次打开页面才会被页面使用
    workbox.routing.registerRoute(
        // Cache CSS files
        /.*\.css/,
        // Use cache but update in the background ASAP
        new workbox.strategies.StaleWhileRevalidate({
            // Use a custom cache name
            cacheName: 'workbox:css',
        })
    );

    // 图片请求: 缓存优先
    workbox.routing.registerRoute(
        // Cache image files.
        /\.(?:png|jpg|jpeg|svg|gif)$/,
        // Use the cache if it's available.
        new workbox.strategies.CacheFirst({
            // Use a custom cache name.
            cacheName: 'workbox:image',
            plugins: [
                new workbox.expiration.Plugin({
                    // Cache only 20 images.
                    maxEntries: 20,
                    // Cache for a maximum of a week.
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                })
            ],
        })
    );



    // //主文档: 网络优先
    workbox.routing.registerRoute(
        /.*\wb$/,
        new workbox.strategies.NetworkFirst({
            cacheName: 'workbox:njk',
        })
    );
    self.addEventListener('message', function(event) {
        console.log("======================SW Received Message: " + event.data);
    });



} else {
    console.log(`Boo! Workbox didn't load 😬`);
}