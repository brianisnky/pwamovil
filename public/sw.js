const CACHE = "movilbeltran";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
 "css/estilos.css",
 "img/logo.png",
 "logo.ico",
 "index.html",
 "manifest.json",
 "__/firebase/6.0.2/firebase-app.js",
 "__/firebase/6.0.2/firebase-auth.js",
 "__/firebase/6.0.2/firebase-firestore.js",
 "__/firebase/6.0.2/firebase-messaging.js",
 "__/firebase/6.0.2/firebase-storage.js",
 "__/firebase/init.js",
 '/'
];
self.addEventListener("install", evt => {
 console.log("Service Worker instalado.");
 // Realiza la instalación: carga los archivos requeridos en la caché.
 evt.waitUntil(cargaCache());
});
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch", evt => {
 if (evt.request.method === "GET") {
   evt.respondWith(usaCache(evt));
 }
});
self.addEventListener("activate", () => console.log("Service Worker activo."));

async function cargaCache() {
 console.log("Intentando cargar cache: " + CACHE);
 const cache = await caches.open(CACHE);
 await cache.addAll(ARCHIVOS);
 console.log("Cache cargado: " + CACHE);
}
async function usaCache(evt) {
 const cache = await caches.open(CACHE);
 const response = await cache.match(evt.request);
 if (response) {
   actualizaResponse(cache, evt.request);
   return response;
 } else {
   return fetch(evt.request);
 }
}
async function actualizaResponse(cache, request) {
 const response = await fetch(request);
 cache.put(request, response.clone());
}
