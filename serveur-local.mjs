// Petit serveur de prévisualisation : node serveur-local.mjs  →  http://localhost:8765
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
const racine = fileURLToPath(new URL('.', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.mp4': 'video/mp4' };
createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  if (!extname(p)) p += '.html';
  const f = join(racine, normalize(p));
  const type = types[extname(f)] || 'application/octet-stream';
  try {
    const { size } = await stat(f);
    const plage = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
    if (plage) {
      // Lecture partielle : indispensable pour avancer dans une vidéo (et pour Safari)
      const debut = plage[1] ? +plage[1] : size - +plage[2];
      const fin = plage[1] && plage[2] ? Math.min(+plage[2], size - 1) : size - 1;
      res.writeHead(206, { 'Content-Type': type, 'Content-Range': `bytes ${debut}-${fin}/${size}`, 'Accept-Ranges': 'bytes', 'Content-Length': fin - debut + 1 });
      createReadStream(f, { start: debut, end: fin }).pipe(res);
      return;
    }
    const corps = await readFile(f);
    res.writeHead(200, { 'Content-Type': type, 'Accept-Ranges': 'bytes' });
    res.end(corps);
  } catch { res.writeHead(404); res.end('Introuvable'); }
}).listen(8765, () => console.log('http://localhost:8765'));
