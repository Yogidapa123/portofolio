const sharp = require('sharp');

async function testPerfectComposite() {
  const scale = 1.875;
  const scaledW = Math.round(576 * scale); // 1080
  const scaledH = Math.round(1024 * scale); // 1920

  const cropLeft = Math.round(300 * scale - 293); // 269
  const cropTop = Math.round(404 * scale - 450);  // 307

  console.log('Scaled Yogi Dark:', { scaledW, scaledH, cropLeft, cropTop });

  // Generate aligned Yogi Dark
  const alignedYogi = await sharp('public/yogi-photo.jpg')
    .resize(scaledW, scaledH)
    .extract({ left: cropLeft, top: cropTop, width: 606, height: 1024 })
    .toBuffer();

  await sharp(alignedYogi).toFile('public/perfect-aligned-yogi-dark.jpg');

  // Now create the 50/50 split with the reference image
  const splitX = 293;
  const height = 1024;
  const width = 606;

  // Left half from reference (Spider-Man + central web)
  const leftSpidey = await sharp('public/spiderman-reference.jpg')
    .extract({ left: 0, top: 0, width: splitX, height })
    .toBuffer();

  // Right half from aligned Yogi
  const rightYogi = await sharp(alignedYogi)
    .extract({ left: splitX, top: 0, width: width - splitX, height })
    .toBuffer();

  await sharp({
    create: {
      width,
      height,
      channels: 3,
      background: { r: 0, g: 0, b: 0 }
    }
  })
  .composite([
    { input: leftSpidey, left: 0, top: 0 },
    { input: rightYogi, left: splitX, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile('public/perfect-split-preview.jpg');

  console.log('Saved public/perfect-split-preview.jpg');
}

testPerfectComposite().catch(console.error);
