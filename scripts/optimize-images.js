import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function optimizeImage(input, output, { width, height, fit = 'cover', quality = 80, webp = false, jpeg = false } = {}) {
  const inputPath = path.join(root, input);
  const outputPath = path.join(root, output);
  await ensureDir(outputPath);

  const pipeline = sharp(inputPath)
    .rotate()
    .resize(width, height, { fit, withoutEnlargement: true });

  if (webp) {
    await pipeline.webp({ quality, effort: 6 }).toFile(outputPath);
  } else if (jpeg) {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
  } else {
    await pipeline.toFile(outputPath);
  }
}

(async () => {
  const heroInput = 'src/assets/hero-aircraft.jpg';
  const heroSizes = [800, 1600, 2400];
  for (const width of heroSizes) {
    await optimizeImage(heroInput, `public/assets/hero-aircraft-${width}w.jpg`, {
      width,
      height: Math.round(width * 9 / 16),
      fit: 'cover',
      jpeg: true,
      quality: 74,
    });
  }

  const avatarInputs = [
    ['public/assets/pilot1.webp', 'public/assets/pilot1-optimized.webp'],
    ['public/assets/pilot2.webp', 'public/assets/pilot2-optimized.webp'],
    ['public/assets/pilot3.webp', 'public/assets/pilot3-optimized.webp'],
    ['public/assets/pilot4.webp', 'public/assets/pilot4-optimized.webp'],
    ['public/assets/pilot5.webp', 'public/assets/pilot5-optimized.webp'],
  ];

  for (const [input, output] of avatarInputs) {
    await optimizeImage(input, output, {
      width: 256,
      height: 256,
      fit: 'cover',
      webp: true,
      quality: 76,
    });
  }

  console.log('Optimized hero and avatar assets written to public/assets');
})();
