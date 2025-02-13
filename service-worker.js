self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('dacapo-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/login.html',
                '/styles.css',
                '/script.js',
                '/icons/icon-192x192.png',
                '/icons/icon-512x512.png',
                '/icons/metronome.svg',
                '/icons/tuner.svg',
                '/icons/log.svg'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
