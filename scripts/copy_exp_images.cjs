const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const uploads = [
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793114624934_c9b55fcc.jpg',
    dest: 'public/experience/rumah-bumn.jpg',
    name: 'Rumah BUMN Malang'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793114647330_d3247986.jpg',
    dest: 'public/experience/kemahasiswaan-umm.jpg',
    name: 'Biro Kemahasiswaan UMM'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793114647339_bb7a6ad1.jpg',
    dest: 'public/experience/teknik-industri-umm.jpg',
    name: 'Teknik Industri UMM'
  },
  {
    src: 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793114839637_4282ae65.jpg',
    dest: 'public/experience/diskominfo-malang.jpg',
    name: 'Dinas Kominfo Kab. Malang'
  }
];

async function copyExpImages() {
  const dir = path.join(process.cwd(), 'public', 'experience');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const item of uploads) {
    console.log(`Processing: ${item.name}`);
    await sharp(item.src)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .jpeg({ quality: 88, progressive: true })
      .toFile(item.dest);
    console.log(`Saved to ${item.dest}`);
  }
  console.log('Finished copying experience images!');
}

copyExpImages().catch(err => {
  console.error(err);
  process.exit(1);
});
