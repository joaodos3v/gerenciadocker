let cacheName = 'gerenciadocker-app-v.1.0.0';
let filesToCache = [
    "./",
    "index.html",
    "css/bootstrap.min.css",
    "img/icon.svg",
    "img/favicon.ico",
    "img/warning.png",
    "js/jquery-3.4.1.slim.min.js",
    "js/bootstrap.min.js",
    "js/scripts.js"
];


// Ao instalar o serviceWorker, 'cacheia' todos os arquivos necessários (primeiro acesso)
self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Installer...');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});


// Esse método poderá ser utilizado em um segundo momento, para confirmar que os arquivos em cache realmente serão atualizados
self.addEventListener('activate', function (e) {
    console.log('[ServiceWorker] Activate...');
});


// Toda vez que for buscar um arquivo, verifica se ele já está em cache. Caso não esteja, realiza a requisição real
self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
