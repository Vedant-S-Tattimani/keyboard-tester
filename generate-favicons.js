import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from './frontend/node_modules/playwright/index.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'frontend', 'public');
const svgPath = path.join(publicDir, 'favicon.svg');
const svgContent = fs.readFileSync(svgPath, 'utf8');

function createIco(images) {
  // images: array of { width, height, buffer }
  const count = images.length;
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + count * entrySize;

  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type 1 = Icon
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(entrySize);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // Palette
    entry.writeUInt8(0, 3); // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(img => img.buffer)]);
}

async function generate() {
  console.log('Launching browser to render favicon assets...');
  const browser = await chromium.launch({ channel: 'msedge' });
  const page = await browser.newPage();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html { width: 100vw; height: 100vh; overflow: hidden; background: transparent; display: flex; align-items: center; justify-content: center; }
          svg { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `;

  await page.setContent(html);

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 }
  ];

  const icoImages = [];

  for (const item of sizes) {
    await page.setViewportSize({ width: item.size, height: item.size });
    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: true
    });
    const outPath = path.join(publicDir, item.name);
    fs.writeFileSync(outPath, buffer);
    console.log(`✓ Generated: ${item.name} (${item.size}x${item.size})`);

    if ([16, 32, 48].includes(item.size)) {
      icoImages.push({ width: item.size, height: item.size, buffer });
    }
  }

  // Create favicon.ico
  const icoBuffer = createIco(icoImages);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`✓ Generated: favicon.ico (${icoBuffer.length} bytes, multi-size 16/32/48)`);

  await browser.close();
}

generate().catch(err => {
  console.error('Favicon generation error:', err);
  process.exit(1);
});
