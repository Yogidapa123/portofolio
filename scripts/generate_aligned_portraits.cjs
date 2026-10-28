const sharp = require('sharp');

async function generateAlignedPortraits() {
  console.log('Generating aligned portraits...');

  // 1. Yogi Dark Mode (UMM Green Uniform - yogi-photo.jpg)
  const scaleDark = 1.875;
  const scaledDarkW = Math.round(576 * scaleDark); // 1080
  const scaledDarkH = Math.round(1024 * scaleDark); // 1920

  const cropLeftDark = 270;
  const cropTopDark = 308;

  console.log('Processing Yogi Dark:', { scaledDarkW, scaledDarkH, cropLeftDark, cropTopDark });

  const alignedDarkBuffer = await sharp('public/yogi-photo.jpg')
    .resize(scaledDarkW, scaledDarkH)
    .extract({ left: cropLeftDark, top: cropTopDark, width: 606, height: 1024 })
    .jpeg({ quality: 95 })
    .toBuffer();

  await sharp(alignedDarkBuffer).toFile('public/perfect-aligned-yogi-dark.jpg');
  console.log('Saved public/perfect-aligned-yogi-dark.jpg');

  // 2. Yogi Light Mode (Suit - yogi-suit.jpg)
  const scaleLight = 2.05;
  const scaledLightW = Math.round(768 * scaleLight); // 1574
  const scaledLightH = Math.round(1024 * scaleLight); // 2099
  const padTop = 125;
  const cropLeftLight = Math.round(390 * scaleLight - 293); // 507

  console.log('Processing Yogi Light:', { scaledLightW, scaledLightH, padTop, cropLeftLight });

  const alignedLightBuffer = await sharp('public/yogi-suit.jpg')
    .resize(scaledLightW, scaledLightH)
    .extend({
      top: padTop,
      bottom: 200,
      left: 100,
      right: 100,
      background: { r: 255, g: 255, b: 255 }
    })
    .extract({
      left: 100 + cropLeftLight,
      top: 0,
      width: 606,
      height: 1024
    })
    .jpeg({ quality: 95 })
    .toBuffer();

  await sharp(alignedLightBuffer).toFile('public/perfect-aligned-yogi-light.jpg');
  console.log('Saved public/perfect-aligned-yogi-light.jpg');

  // 3. Full Spider-Man mask (606 x 1024)
  const splitX = 293;
  const refMeta = await sharp('public/spiderman-reference.jpg').metadata();
  const leftSpidey = await sharp('public/spiderman-reference.jpg')
    .extract({ left: 0, top: 0, width: splitX, height: refMeta.height })
    .toBuffer();

  const mirroredRight = await sharp(leftSpidey)
    .flop()
    .toBuffer();

  await sharp({
    create: {
      width: 606,
      height: 1024,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
  .composite([
    { input: leftSpidey, left: 0, top: 0 },
    { input: mirroredRight, left: splitX, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile('public/spiderman-full-mask.jpg');
  console.log('Saved public/spiderman-full-mask.jpg (606x1024)');

  // 4. Generate previews
  // Dark split preview
  const rightYogiDark = await sharp(alignedDarkBuffer)
    .extract({ left: splitX, top: 0, width: 606 - splitX, height: 1024 })
    .toBuffer();

  await sharp({
    create: { width: 606, height: 1024, channels: 3, background: { r: 0, g: 0, b: 0 } }
  })
  .composite([
    { input: leftSpidey, left: 0, top: 0 },
    { input: rightYogiDark, left: splitX, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile('public/perfect-split-dark-preview.jpg');

  // Light split preview
  const rightYogiLight = await sharp(alignedLightBuffer)
    .extract({ left: splitX, top: 0, width: 606 - splitX, height: 1024 })
    .toBuffer();

  await sharp({
    create: { width: 606, height: 1024, channels: 3, background: { r: 255, g: 255, b: 255 } }
  })
  .composite([
    { input: leftSpidey, left: 0, top: 0 },
    { input: rightYogiLight, left: splitX, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile('public/perfect-split-light-preview.jpg');

  console.log('Saved all previews successfully!');
}

generateAlignedPortraits().catch(console.error);
