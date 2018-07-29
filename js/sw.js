self.addEventListener('install', function(e){
    console.log("[Service Worker] installed ")
// cache 
/*e.waitUntil(
    caches.open('pageCache').then(function(cache){
        return cache.addAll([
            '/',
    'js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'js/leaflet.js',
    'css/styles.css',
    'css/leaflet.css',
    'images/marker-icon-2x.png',
    'images/marker-icon.png',
    'images/marker-shadow.png',
    'https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css',
     ]);
    })
)*/
});

self.addEventListener('activate', function(e){
    console.log("[Service Worker] activated ")
});

self.addEventListener('fetch', function(e){
    console.log("[Service Worker] fetching", e.request.url)
    /*let requestUrl = new URL(event.request.url);
if (requestUrl.pathname === location.origin){
    if (requestUrl.pathname === '/'){
        event.respondWith(caches.match('/index'));
        return;*/
    //}
//}*/
});