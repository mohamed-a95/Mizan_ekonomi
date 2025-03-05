
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Definiera sökvägar
const assetsDir = path.join(__dirname, '../public/assets');
const outputDir = path.join(__dirname, '../public/assets');

// Skapa output-mapp om den inte finns
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Processa specifikt Mizan-loggan
const inputPath = path.join(assetsDir, 'mizan-logo-white.png');  // Justera filnamnet till din faktiska logga
const outputPath = path.join(outputDir, 'mizan-logo-transparent.png');

// Processa bilden för att göra bakgrunden transparent
sharp(inputPath)
  .toColorspace('srgb')
  .png({ 
    quality: 100,
    chromaSubsampling: '4:4:4'
  })
  .removeAlpha()
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const pixels = new Uint8ClampedArray(data.buffer);
    const threshold = 20; // Lågt tröskelvärde för att behålla mest av loggan
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      
      // Om pixeln är nära mörkgrön bakgrund, gör den transparent
      if (r < threshold && g < threshold * 4 && b < threshold) {
        pixels[i + 3] = 0; // Sätt alpha till 0 (helt transparent)
      }
    }
    
    return sharp(pixels, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    }).png().toFile(outputPath);
  })
  .then(() => {
    console.log(`Loggan har bearbetats och sparats till ${outputPath}`);
  })
  .catch(err => {
    console.error('Ett fel uppstod vid bearbetning av bilden:', err);
  });
