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
self.__precacheManifest = [
  {
    "url": "spip.php?page=sommaire",
    "revision": "67bde026600ccfd20a302d57b133b3b2"
  },
  {
    "url": "spip.php?page=article&id_article=257",
    "revision": "36949eda49cb146b9f6cac6f693ebe44"
  },
  {
    "url": "css/styles.css",
    "revision": "e8efc54df5036c732b135c51e5682f5f"
  },
  {
    "url": "js/app.js",
    "revision": "4a73f61e9964321526e2d8a2d9defea1"
  },
  {
    "url": "js/domReady.js",
    "revision": "5bcfbcc2720186bb717bd99861ecd120"
  },
  {
    "url": "js/html5shiv.min.js",
    "revision": "f2a3edf1693bb9146d01382d6e950947"
  },
  {
    "url": "js/jquery.3.2.1.min.js",
    "revision": "73c8604494cde17818069dd3a3cb8e78"
  },
  {
    "url": "js/js.cookie.js",
    "revision": "a7a8d2842f52b7bccdc89629adfd608e"
  },
  {
    "url": "js/require.js",
    "revision": "a83e20fedccbc09ee204e5083353ed8b"
  },
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
