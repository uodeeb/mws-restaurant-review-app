'',
'/',
'/index.html',
'/js/main.js',
'/js/dbhelper.js',
'/js/restaurant_info.js',
'/js/leaflet.js',
'/css/styles.css',
'/css/leaflet.css',
'/css/images/marker-icon-2x.png',
'/css/images/marker-icon.png',
'/css/images/marker-shadow.png',
'https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css'


 
  



/* ____________________________ok ____________*/
// Set a name for the current cache
let cacheName = 'v2'; 

// Default files to always cache
let cacheFiles = [
	'',
'/',
'/index.html',
'/js/main.js',
'/js/dbhelper.js',
'/js/restaurant_info.js',
'/js/leaflet.js',
'/css/styles.css',
'/css/leaflet.css',
'/css/images/marker-icon-2x.png',
'/css/images/marker-icon.png',
'/css/images/marker-shadow.png',
'https://api.mapbox.com/mapbox-gl-js/v0.47.0/mapbox-gl.css'
];



self.addEventListener('install', function(e) {
    console.log('ServiceWorker Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

    	// Open the cache
	    caches.open(cacheName).then(function(cache) {

	    	// Add all the default files to the cache
			console.log('ServiceWorker Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});


self.addEventListener('activate', function(e) {
    console.log('ServiceWorker Activated');

    e.waitUntil(

    	// Get all the cache keys
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheName) {

					// Delete that cached file
					console.log('ServiceWorker Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});


self.addEventListener('fetch', function(e) {
	console.log('ServiceWorker Fetch', e.request.url);

	// e.respondWidth Responds to the fetch event
	e.respondWith(

		// Check in cache for the request being made
		caches.match(e.request)


			.then(function(response) {

				// If the request is in the cache
				if ( response ) {
					console.log("ServiceWorker Found in Cache", e.request.url, response);
					// Return the cached version
					return response;
				}

				// If the request is NOT in the cache, fetch and cache

				let clonedRequests = e.request.clone();
				return fetch(clonedRequests)
					.then(function(response) {

						if ( !response ) {
							console.log("ServiceWorker No response from fetch ")
							return response;
						}

						let clonedResponses = response.clone();

						//  Open the cache
						caches.open(cacheName).then(function(cache) {

							// Put the fetched response in the cache
							cache.put(e.request, clonedResponses);
							console.log('ServiceWorker New Data Cached', e.request.url);

							// Return the response
							return response;
			
				        });

					})
					


			}) 
	);
});