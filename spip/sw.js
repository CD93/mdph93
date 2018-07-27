/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

self.__precacheManifest = [
  {
    "url": "https://place-handicap.fr/",
    "revision": "67bde026600ccfd20a302d57b133b3b2"
  },
  {
    "url": "https://place-handicap.fr/Venir-a-la-MDPH",
    "revision": "36949eda49cb146b9f6cac6f693ebe44"
  },
  {
    "url": "squelettes/css/styles.css?1532685148",
    "revision": "e8efc54df5036c732b135c51e5682f5f"
  },
  {
    "url": "squelettes/js/app.js",
    "revision": "4a73f61e9964321526e2d8a2d9defea1"
  },
  {
    "url": "squelettes/js/domReady.js",
    "revision": "5bcfbcc2720186bb717bd99861ecd120"
  },
  {
    "url": "squelettes/js/html5shiv.min.js",
    "revision": "f2a3edf1693bb9146d01382d6e950947"
  },
  {
    "url": "squelettes/js/jquery.3.2.1.min.js",
    "revision": "73c8604494cde17818069dd3a3cb8e78"
  },
  {
    "url": "squelettes/js/js.cookie.js",
    "revision": "a7a8d2842f52b7bccdc89629adfd608e"
  },
  {
    "url": "squelettes/js/require.js",
    "revision": "a83e20fedccbc09ee204e5083353ed8b"
  },
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
