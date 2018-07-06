const version = 'v64'
const cacheWhitelist = [version];

this.addEventListener('install', function (event) {
    // 安装后立即激活
    // this.skipWaiting();
    event.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll([
                '/service-worker.html',
                '/css/index.css'
            ]);
        })
    );
});
this.addEventListener('fetch', function (event) {
    const req = event.request.clone()
    event.respondWith(
        caches.match(event.request).then(function (res) {
            if (res) {
                return res;
            }
            return fetch(event.request)
            .then(function (response) {
                return caches.open(version).then(function (cache) {
                    cache.put(req, response.clone());
                    return response;
                });
            }).catch(err => console.log(err));
        })
    );
});

this.addEventListener('activate', function (event) {
    // clients.claim();
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            return this.clients.matchAll().then(function (clients) {
                return Promise.all(clients.map(function (client) {
                    return client.postMessage('The service worker has activated and ' + 'taken control.');
                }));
            });
        })
    );
});