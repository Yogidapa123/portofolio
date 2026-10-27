const sharp = require('sharp');
const path = require('path');

async function processImages() {
  console.log('--- Analyzing and Aligning Images ---');

  // 1. Spiderman Portrait:
  // spiderman-portrait.jpg: w=736, h=1308
  // Eye center in original is X ≈ 416, Y ≈ 881.
  // We want Spiderman's face centered at X = 400 and eyes at Y = 379 in 800x1000.
  // Let's verify or re-generate split-spiderman.jpg
  const spCropW = 460;
  const spCropH = 575;
  const spLeft = 186; // 416 - 230 = 186
  const spTop = 663;  // 881 - 575 * 0.379 = 663
  await sharp('public/spiderman-portrait.jpg')
    .extract({ left: spLeft, top: spTop, width: spCropW, height: spCropH })
    .resize(800, 1000)
    .toFile('public/split-spiderman.jpg');
  console.log('Generated public/split-spiderman.jpg');

  // 2. Yogi Dark (yogi-photo.jpg):
  // yogi-photo.jpg: w=576, h=1024
  // Face center in yogi-photo: X ≈ 298.
  // Eyes in yogi-photo: Y ≈ 412.
  // In spiderman: head width ~ 320px in 800x1000.
  // In yogi-photo: face width is 184px, so crop width = 390 gives face width ~ 377px in 800x1000.
  // Let's compute crop:
  // We want X=298 to be at X=400 (50%).
  // So crop width cropW = 390. left = 298 - 195 = 103.
  // cropH = 488 (ratio 4:5).
  // We want eyes (Y=412) to be at Y=379 in 800x1000 (i.e. 37.9% of cropH = 185px from top).
  // top = 412 - 185 = 227.
  const ydCropW = 390;
  const ydCropH = 488;
  const ydLeft = 103;
  const ydTop = 227;
  await sharp('public/yogi-photo.jpg')
    .extract({ left: ydLeft, top: ydTop, width: ydCropW, height: ydCropH })
    .resize(800, 1000)
    .toFile('public/split-yogi-dark.jpg');
  console.log('Generated public/split-yogi-dark.jpg');

  // 3. Yogi Light (yogi-suit.jpg):
  // yogi-suit.jpg: w=768, h=1024
  // Let's locate the face center and eye level accurately in yogi-suit.jpg:
  const suitImg = sharp('public/yogi-suit.jpg');
  const { data: sData, info: sInfo } = await suitImg.raw().toBuffer({ resolveWithObject: true });

  // Skin tones around head
  let skinX = [], skinY = [];
  for (let y = 80; y < 400; y++) {
    for (let x = 280; x < 500; x++) {
      const idx = (y * sInfo.width + x) * sInfo.channels;
      const r = sData[idx], g = sData[idx+1], b = sData[idx+2];
      if (r > 130 && g > 90 && b > 70 && r > g && g > b && (r - b) > 25) {
        skinX.push(x);
        skinY.push(y);
      }
    }
  }
  const suitCenterX = Math.round((Math.min(...skinX) + Math.max(...skinX)) / 2);
  const suitFaceW = Math.max(...skinX) - Math.min(...skinX);
  console.log('Yogi suit face: center X =', suitCenterX, 'face width =', suitFaceW);

  // In yogi-suit, face width is ~164px.
  // In yogi-photo, face width was 184px and cropW was 390 (390 / 184 = 2.12x of face width).
  // So for yogi-suit, cropW should be 164 * (390 / 184) ≈ 348px!
  const ylCropW = 348;
  const ylCropH = Math.round(ylCropW * 1.25); // 435px

  // Eyes in yogi-suit are at Y ≈ 158.
  // To have eyes at 37.9% of ylCropH (0.379 * 435 ≈ 165px):
  // ylTop = 158 - 165 = -7 -> clamp to 0.
  const ylLeft = Math.round(suitCenterX - ylCropW / 2);
  const ylTop = 0; // Clamped to 0 since head starts near top

  console.log('Yogi suit crop:', { ylLeft, ylTop, ylCropW, ylCropH });

  await sharp('public/yogi-suit.jpg')
    .extract({ left: Math.max(0, ylLeft), top: ylTop, width: ylCropW, height: ylCropH })
    .resize(800, 1000)
    .toFile('public/split-yogi-light.jpg');
  console.log('Generated public/split-yogi-light.jpg');

  console.log('All 3 split images created successfully!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
