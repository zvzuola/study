const version = 'v32'
const cacheWhitelist = [version];

self.addEventListener('install', function (event) {
    // 安装后立即激活
    // self.skipWaiting();
    console.log('install')
    event.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll([
                '/service-worker.html',
                '/css/index.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    const req = event.request.clone()
    console.log('fetch', version)
    event.respondWith(
        caches.open(version).then(cache => {
            return cache.match(event.request).then(function (res) {
                if (res) {
                    return res;
                }
                throw Error('The cached response that was expected is missing.');
            }).catch(err => {
                return fetch(event.request)
                    .then(function (response) {
                        return caches.open(version).then(function (cache) {
                            cache.put(req, response.clone());
                            return response;
                        });
                    });
            })
        })
    );
});

self.addEventListener('activate', function (event) {
    // self.clients.claim();
    console.log('activate')
    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cacheWhitelist.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        }).then(() => {
            return self.clients.matchAll().then(function (clients) {
                return Promise.all(clients.map(function (client) {
                    return client.postMessage('The service worker has activated and ' + 'taken control.');
                }));
            });
        })
    );
});