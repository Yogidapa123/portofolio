const sharp = require('sharp');

async function testComposite() {
  const splitX = 293;
  const height = 1024;
  const width = 606;

  // Extract left half from reference (Spider-Man + central web)
  const leftSpidey = await sharp('public/spiderman-reference.jpg')
    .extract({ left: 0, top: 0, width: splitX, height })
    .toBuffer();

  // Extract right half from aligned Yogi
  const rightYogi = await sharp('public/ref-aligned-yogi-dark.jpg')
    .extract({ left: splitX, top: 0, width: width - splitX, height })
    .toBuffer();

  // Composite them together
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
  .toFile('public/test-split-preview.jpg');

  console.log('Saved public/test-split-preview.jpg');
}

testComposite().catch(console.error);
