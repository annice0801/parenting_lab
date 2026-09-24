// Generates app/favicon.ico, app/icon.png, and app/apple-icon.png — a simple
// two-leaf sprout mark matching the site's sage/cream brand palette
// (app/globals.css). Hand-drawn in code, so no external image assets or
// licensing concerns.
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const BG = [0xa3, 0xb3, 0x99]; // --color-sage
const LEAF = [0xfb, 0xf6, 0xef]; // --color-cream
const VEIN = [0x4a, 0x40, 0x38]; // --color-ink

function setPixel(buf, size, x, y, [r, g, b], a) {
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  const i = (y * size + x) * 4;
  buf[i] = r;
  buf[i + 1] = g;
  buf[i + 2] = b;
  buf[i + 3] = a;
}

function roundedRectMask(x, y, size, radius) {
  const cx = x < radius ? radius : x > size - 1 - radius ? size - 1 - radius : x;
  const cy = y < radius ? radius : y > size - 1 - radius ? size - 1 - radius : y;
  const dx = x - cx;
  const dy = y - cy;
  return dx * dx + dy * dy <= radius * radius;
}

function inRotatedEllipse(x, y, cx, cy, a, b, angle) {
  const dx = x - cx;
  const dy = y - cy;
  const cos = Math.cos(-angle);
  const sin = Math.sin(-angle);
  const rx = dx * cos - dy * sin;
  const ry = dx * sin + dy * cos;
  return (rx * rx) / (a * a) + (ry * ry) / (b * b) <= 1;
}

function drawSprout(size, { roundedCorners }) {
  const buf = new Uint8Array(size * size * 4);
  const radius = roundedCorners ? size * 0.19 : 0;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inside = !roundedCorners || roundedRectMask(x, y, size, radius);
      setPixel(buf, size, x, y, BG, inside ? 255 : 0);
    }
  }

  const cx = size / 2;
  const cy = size / 2 + size * 0.03;
  const stemTop = cy + size * 0.09;
  const stemBottom = size * 0.8;
  const leaves = [
    { cx: cx - size * 0.145, cy: cy - size * 0.125, a: size * 0.19, b: size * 0.097, angle: (-52 * Math.PI) / 180 },
    { cx: cx + size * 0.145, cy: cy - size * 0.125, a: size * 0.19, b: size * 0.097, angle: (52 * Math.PI) / 180 },
  ];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      for (const leaf of leaves) {
        if (
          inRotatedEllipse(x + 0.5, y + 0.5, leaf.cx, leaf.cy, leaf.a, leaf.b, leaf.angle) &&
          y < stemTop
        ) {
          setPixel(buf, size, x, y, LEAF, 255);
        }
      }
    }
  }

  const stemHalfWidth = Math.max(1, Math.round(size * 0.03));
  for (let y = Math.round(stemTop); y <= stemBottom; y++) {
    for (let dx = -stemHalfWidth; dx < stemHalfWidth; dx++) {
      setPixel(buf, size, Math.round(cx) + dx, y, VEIN, 255);
    }
  }

  return buf;
}

function crc32(buf) {
  let c;
  const table =
    crc32.table ||
    (crc32.table = (() => {
      const t = new Uint32Array(256);
      for (let n = 0; n < 256; n++) {
        c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c >>> 0;
      }
      return t;
    })());
  c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function encodePNG(rgba, size) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    const rowStart = y * (1 + size * 4);
    raw[rowStart] = 0;
    for (let x = 0; x < size * 4; x++) {
      raw[rowStart + 1 + x] = rgba[y * size * 4 + x];
    }
  }

  const idat = zlib.deflateSync(raw);

  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

function encodeICO(pngBuf, size) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = size >= 256 ? 0 : size;
  entry[1] = size >= 256 ? 0 : size;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuf.length, 8);
  entry.writeUInt32LE(header.length + entry.length, 12);

  return Buffer.concat([header, entry, pngBuf]);
}

const appDir = path.join(__dirname, "..", "app");

// favicon.ico — 32x32, rounded + transparent corners
const favSize = 32;
const favPng = encodePNG(drawSprout(favSize, { roundedCorners: true }), favSize);
fs.writeFileSync(path.join(appDir, "favicon.ico"), encodeICO(favPng, favSize));

// icon.png — 192x192, rounded + transparent corners (modern browser tabs / PWA)
const iconSize = 192;
fs.writeFileSync(
  path.join(appDir, "icon.png"),
  encodePNG(drawSprout(iconSize, { roundedCorners: true }), iconSize)
);

// apple-icon.png — 180x180, opaque full-bleed square (iOS applies its own mask)
const appleSize = 180;
fs.writeFileSync(
  path.join(appDir, "apple-icon.png"),
  encodePNG(drawSprout(appleSize, { roundedCorners: false }), appleSize)
);

console.log("wrote favicon.ico, icon.png, apple-icon.png to", appDir);
