import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function optimizeImage(input, output, opts = {}) {
  const inputPath = path.join(root, input);
  const outputPath = path.join(root, output);
  await ensureDir(outputPath);
  const { width, height, fit = 'cover', quality = 80, webp = false, jpeg = false } = opts;
  const pipeline = sharp(inputPath).rotate().resize(width, height, { fit, withoutEnlargement: true });

  if (webp) {
    await pipeline.webp({ quality, effort: 6 }).toFile(outputPath);
  } else if (jpeg) {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(outputPath);
  } else {
    await pipeline.toFile(outputPath);
  }
}

try {
  const heroInput = 'src/assets/hero-aircraft.jpg';
  const heroWidths = [800, 1600, 2400];
  for (const width of heroWidths) {
    await optimizeImage(heroInput, `public/assets/hero-aircraft-${width}w.jpg`, {
      width,
      height: Math.round(width * 9 / 16),
      fit: 'cover',
      jpeg: true,
      quality: 74,
    });
  }

  const testimonialImages = [
    ['public/assets/pilot1.webp', 'public/assets/pilot1-optimized.webp'],
    ['public/assets/pilot2.webp', 'public/assets/pilot2-optimized.webp'],
    ['public/assets/pilot3.webp', 'public/assets/pilot3-optimized.webp'],
    ['public/assets/pilot5.webp', 'public/assets/pilot5-optimized.webp'],
  ];

  for (const [input, output] of testimonialImages) {
    await optimizeImage(input, output, {
      width: 256,
      height: 256,
      fit: 'cover',
      webp: true,
      quality: 76,
    });
  }

  await optimizeImage('public/assets/pilot5.webp', 'public/assets/pilot4-optimized.webp', {
    width: 256,
    height: 256,
    fit: 'cover',
    webp: true,
    quality: 76,
  });

  console.log('Optimized hero and avatar assets written to public/assets');
} catch (error) {
  console.error(error);
  process.exit(1);
}
