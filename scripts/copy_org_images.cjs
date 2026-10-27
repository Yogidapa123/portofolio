const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploads = [
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793110171125_79064090.jpg',
    dest: 'public/organizations/ketua-himpunan.jpg',
    title: 'Ketua Himpunan HMIF UMM'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793110192002_529f5d63.jpg',
    dest: 'public/organizations/wakil-ketua-himpunan.jpg',
    title: 'Wakil Ketua Himpunan HMIF UMM'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793110251072_ea28d5e2.jpg',
    dest: 'public/organizations/anggota-permikomnas.jpg',
    title: 'Anggota Permikomnas Wilayah IX'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793110281147_09ee357a.jpg',
    dest: 'public/organizations/anggota-psdm-imaba.jpg',
    title: 'Anggota PSDM IMABA'
  }
];

async function copyAndOptimize() {
  const dir = path.join(process.cwd(), 'public', 'organizations');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const item of uploads) {
    console.log(`Processing: ${item.title}`);
    if (fs.existsSync(item.src)) {
      // Optimize image for fast web delivery (resize max 1600 width if larger, maintain high quality)
      await sharp(item.src)
        .rotate() // auto-orient based on EXIF
        .resize({ width: 1400, withoutEnlargement: true })
        .jpeg({ quality: 88, progressive: true })
        .toFile(item.dest);
      console.log(`Saved to ${item.dest}`);
    } else {
      console.error(`Source not found: ${item.src}`);
    }
  }
  console.log('Finished copying organization images!');
}

copyAndOptimize().catch(err => {
  console.error(err);
  process.exit(1);
});
