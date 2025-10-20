import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const assetsDir = path.join(distDir, "assets");
const swPath = path.join(distDir, "sw.js");
const cacheVersionFile = path.join(distDir, ".cache-version");

let cacheVer = 1;
if (fs.existsSync(cacheVersionFile)) {
  cacheVer = parseInt(fs.readFileSync(cacheVersionFile, "utf-8")) + 1;
}
fs.writeFileSync(cacheVersionFile, cacheVer.toString());

function walkDir(dir, baseUrl = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const webPath = path.join(baseUrl, entry.name).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath, webPath));
    } else if (!/\.(json)$/.test(entry.name)) {
      files.push("/" + webPath);
    }
  }
  return files;
}

let urlsFromAssets = [];
if (fs.existsSync(assetsDir)) {
  urlsFromAssets = walkDir(assetsDir, "assets");
}

const publicDirs = ["public/fonts", "public/imgs"];
let urlsFromPublic = [];
for (const dir of publicDirs) {
  if (fs.existsSync(dir)) {
    urlsFromPublic = urlsFromPublic.concat(
      walkDir(dir, path.basename(dir)).map((p) => p.replace(/^\/public/, "")),
    );
  }
}

const baseFiles = ["/", "/index.html"];

const urlsToCache = Array.from(
  new Set([...baseFiles, ...urlsFromAssets, ...urlsFromPublic]),
);

const swCode = `
const cacheName = "v${cacheVer}";
const urlsToCache = ${JSON.stringify(urlsToCache, null, 2)};

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urlsToCache)));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }))
    )
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.pathname.startsWith("/api")) {
  e.respondWith(fetch(e.request));
  return;
  }
// Сначала сеть для /
  if (url.pathname === "/" || url.pathname === "/index.html") {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(cacheName).then((cache) => cache.put(e.request, clone));
            return response;
          }
          return caches.match(e.request);
        })
        .catch(() => caches.match(e.request))
    );
    return;
}

// Сначала кеш для остальных
e.respondWith(
  caches.match(e.request).then((resp) => {
    if (resp) return resp;
    return fetch(e.request)
      .then((response) => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(cacheName).then((cache) => cache.put(e.request, clone));
        }
        return response;
      })
      .catch(() => {
        return caches.match("/index.html");
      });
  })
);
});

`;

fs.writeFileSync(swPath, swCode);
