const sharp = require('sharp');
const path = require('path');

const refPath = 'C:/Users/ASUS/.gemini/antigravity/brain/f089a34f-1603-4fe5-9590-f5bcb809e3fc/.user_uploaded/media_1793193380478_4e900a07.jpg';

async function testMirror() {
  const meta = await sharp(refPath).metadata();
  console.log('Ref size:', meta.width, 'x', meta.height);

  // In refPath (606x1024), the vertical facial axis (nose, philtrum, chin) is at x = 293.
  const splitX = 293;

  // Extract left half (Spider-Man side)
  const leftHalf = await sharp(refPath)
    .extract({ left: 0, top: 0, width: splitX, height: meta.height })
    .toBuffer();

  // Create mirrored right half
  const rightHalf = await sharp(leftHalf)
    .flop() // horizontal mirror
    .toBuffer();

  // Combine left half and mirrored right half into a complete full Spider-Man head portrait
  const fullWidth = splitX * 2; // 586
  const fullHeight = meta.height; // 1024

  const fullSpiderman = await sharp({
    create: {
      width: fullWidth,
      height: fullHeight,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
  .composite([
    { input: leftHalf, left: 0, top: 0 },
    { input: rightHalf, left: splitX, top: 0 }
  ])
  .jpeg({ quality: 95 })
  .toFile('public/spiderman-full-mask.jpg');

  console.log('Saved public/spiderman-full-mask.jpg (size:', fullWidth, 'x', fullHeight, ')');

  // Also save the exact reference image with web strands to public/spiderman-reference.jpg
  await sharp(refPath)
    .jpeg({ quality: 95 })
    .toFile('public/spiderman-reference.jpg');
  console.log('Saved public/spiderman-reference.jpg');
}

testMirror().catch(err => {
  console.error(err);
  process.exit(1);
});
