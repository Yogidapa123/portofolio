const sharp = require('sharp');

async function verify() {
  console.log('=== VERIFYING ALIGNMENT OF 3 SPLIT IMAGES (800x1000) ===');

  const spidey = await sharp('public/split-spiderman.jpg').raw().toBuffer({ resolveWithObject: true });
  const darkYogi = await sharp('public/split-yogi-dark.jpg').raw().toBuffer({ resolveWithObject: true });
  const lightYogi = await sharp('public/split-yogi-light.jpg').raw().toBuffer({ resolveWithObject: true });

  // 1. Spiderman: find eye mask centers and horizontal divider intersection at x=400
  // Spiderman has distinct white eye patches
  let spEyeLeft = [], spEyeRight = [];
  for (let y = 250; y < 550; y++) {
    for (let x = 150; x < 650; x++) {
      const idx = (y * 800 + x) * 3;
      const r = spidey.data[idx], g = spidey.data[idx+1], b = spidey.data[idx+2];
      if (r > 180 && g > 180 && b > 180) {
        if (x < 400) spEyeLeft.push({ x, y });
        else spEyeRight.push({ x, y });
      }
    }
  }
  const spLeftX = Math.round(spEyeLeft.reduce((s, p) => s + p.x, 0) / spEyeLeft.length);
  const spLeftY = Math.round(spEyeLeft.reduce((s, p) => s + p.y, 0) / spEyeLeft.length);
  const spRightX = Math.round(spEyeRight.reduce((s, p) => s + p.x, 0) / spEyeRight.length);
  const spRightY = Math.round(spEyeRight.reduce((s, p) => s + p.y, 0) / spEyeRight.length);
  const spMidEyeX = Math.round((spLeftX + spRightX) / 2);
  const spMidEyeY = Math.round((spLeftY + spRightY) / 2);
  console.log('Spider-Man Eye Center:', { midX: spMidEyeX, midY: spMidEyeY, leftEye: { spLeftX, spLeftY }, rightEye: { spRightX, spRightY } });

  // 2. Dark Yogi: find eyes / glasses center
  let dyDarks = [];
  for (let y = 300; y < 450; y++) {
    for (let x = 250; x < 550; x++) {
      const idx = (y * 800 + x) * 3;
      const r = darkYogi.data[idx], g = darkYogi.data[idx+1], b = darkYogi.data[idx+2];
      const brightness = (r + g + b) / 3;
      if (brightness < 60) {
        dyDarks.push({ x, y });
      }
    }
  }
  const dyEyeX = Math.round(dyDarks.reduce((s, p) => s + p.x, 0) / dyDarks.length);
  const dyEyeY = Math.round(dyDarks.reduce((s, p) => s + p.y, 0) / dyDarks.length);
  console.log('Dark Yogi Eye/Glasses Center:', { dyEyeX, dyEyeY });

  // 3. Light Yogi: find eyes / glasses center
  let lyDarks = [];
  for (let y = 300; y < 450; y++) {
    for (let x = 250; x < 550; x++) {
      const idx = (y * 800 + x) * 3;
      const r = lightYogi.data[idx], g = lightYogi.data[idx+1], b = lightYogi.data[idx+2];
      const brightness = (r + g + b) / 3;
      if (brightness < 60) {
        lyDarks.push({ x, y });
      }
    }
  }
  const lyEyeX = Math.round(lyDarks.reduce((s, p) => s + p.x, 0) / lyDarks.length);
  const lyEyeY = Math.round(lyDarks.reduce((s, p) => s + p.y, 0) / lyDarks.length);
  console.log('Light Yogi Eye/Glasses Center:', { lyEyeX, lyEyeY });

  console.log('=== COMPARISON AT 50% DIVIDER (X = 400) ===');
  console.log('Horizontal alignment diff (Dark Yogi vs Spiderman):', Math.abs(dyEyeX - spMidEyeX), 'px');
  console.log('Vertical eye line diff (Dark Yogi vs Spiderman):', Math.abs(dyEyeY - spMidEyeY), 'px');
  console.log('Horizontal alignment diff (Light Yogi vs Spiderman):', Math.abs(lyEyeX - spMidEyeX), 'px');
  console.log('Vertical eye line diff (Light Yogi vs Spiderman):', Math.abs(lyEyeY - spMidEyeY), 'px');
}

verify();
