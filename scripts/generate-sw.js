import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const manifestPath = path.join(distDir, ".vite/manifest.json");
const swPath = path.join(distDir, "sw.js");
const cacheVersionFile = path.join(distDir, ".cache-version");

const manifestData = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

function walkDir(dir, baseUrl = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const webPath = path.join(baseUrl, entry.name).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath, webPath));
    } else {
      files.push("/" + webPath);
    }
  }
  return files;
}

let cacheVer = 1;
if (fs.existsSync(cacheVersionFile)) {
  cacheVer = parseInt(fs.readFileSync(cacheVersionFile, "utf-8")) + 1;
}
fs.writeFileSync(cacheVersionFile, cacheVer.toString());

const urlsFromManifest = Object.values(manifestData).flatMap((entry) => {
  const urls = [];
  if (entry.file) urls.push("/" + entry.file);
  if (entry.css) urls.push(...entry.css.map((f) => "/" + f));
  return urls;
});

const publicDirs = ["public/fonts", "public/imgs"];
let urlsFromPublic = [];
for (const dir of publicDirs) {
  if (fs.existsSync(dir)) {
    urlsFromPublic = urlsFromPublic.concat(walkDir(dir, path.basename(dir)));
  }
}

const baseFiles = ["/", "/index.html"];

const urlsToCache = Array.from(
  new Set([...baseFiles, ...urlsFromManifest, ...urlsFromPublic]),
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

  // сначала в сеть для / и /index.html
  if (url.pathname === "/" || url.pathname === "/index.html") {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(cacheName).then((cache) => cache.put(e.request, clone));
          return response;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // сначала кеш для остальных
  e.respondWith(
    caches.match(e.request).then((resp) => {
      if (resp) return resp;
      return fetch(e.request).then((response) => {
        if (!response || !response.ok) return response;
        const clone = response.clone();
        caches.open(cacheName).then((cache) => cache.put(e.request, clone));
        return response;
      });
    })
  );
});
`;

fs.writeFileSync(swPath, swCode);
