const cacheList = [
    '/assets/01.png',
];
const cacheStorageKey = 'qr-site-cache';

// install 事件 抓取资源写入缓存:
self.addEventListener('install', function(e) {
    console.log('Cache event!')
    e.waitUntil(
        caches.open(cacheStorageKey).then(function(cache) {
            console.log('Adding to Cache:', cacheList)
            return cache.addAll(cacheList)
        }).then(function() {
            console.log('Skip waiting!')
            return self.skipWaiting()
        })
    )
})



//activate事件  删除一些旧的缓存
self.addEventListener('activate', function(event) {
    console.log('sw event: activate');
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

//监听 fetch   有缓存走缓存 没有缓存从服务端拉取数据  也就是 cache-first
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }

            // IMPORTANT:Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function(response) {
                    console.log(response);
                    //Check if we received a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // IMPORTANT:Clone the response. A response is a stream
                    // and because we want the browser to consume the response
                    // as well as the cache consuming the response, we need
                    // to clone it so we have two streams.
                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        })
    );
});