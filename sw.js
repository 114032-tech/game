const CACHE_NAME = 'fankuan-game-v1';
const ASSETS = [
    './index.html',
    './manifest.webmanifest'
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(ASSETS))
    );
});

// 攔截網路請求，優先使用快取
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => response || fetch(event.request))
    );
});