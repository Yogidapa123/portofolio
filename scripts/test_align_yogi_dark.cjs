const sharp = require('sharp');

async function testAlignDark() {
  const scale = 1.623;
  const scaledW = Math.round(576 * scale);
  const scaledH = Math.round(1024 * scale);

  const cropLeft = Math.round(300 * scale - 293); // 194
  const cropTop = Math.round(404 * scale - 450);  // 206

  console.log('Scaled:', { scaledW, scaledH, cropLeft, cropTop });

  await sharp('public/yogi-photo.jpg')
    .resize(scaledW, scaledH)
    .extract({ left: cropLeft, top: cropTop, width: 606, height: 1024 })
    .toFile('public/ref-aligned-yogi-dark.jpg');

  console.log('Saved public/ref-aligned-yogi-dark.jpg');
}

testAlignDark().catch(console.error);
