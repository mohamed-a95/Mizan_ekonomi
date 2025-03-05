
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../attached_assets');
const outputDir = path.join(__dirname, '../public/assets');

// Se till att output-mappen existerar
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Läs alla filer i assets-mappen
fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error('Kunde inte läsa assets-mappen:', err);
    return;
  }

  console.log('Tillgängliga bilder:');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  // För Mizan-loggan (anta att det är fil nummer 1, du kan ändra detta index)
  // Vi kan bearbeta den specifika bilden du vill med transparent bakgrund
  const targetImage = files[0]; // Ändra index vid behov

  if (targetImage) {
    const inputPath = path.join(assetsDir, targetImage);
    const outputPath = path.join(outputDir, 'mizan-logo-transparent.png');

    // Processa bilden för att göra bakgrunden transparent
    // Detta använder en enkel metod - för bättre resultat kan mer avancerade tekniker behövas
    sharp(inputPath)
      .toColorspace('srgb')
      .png({ 
        quality: 100,
        chromaSubsampling: '4:4:4'
      })
      // Konvertera vit bakgrund till transparent
      // Detta är en enkel metod som fungerar bäst för bilder med vit bakgrund
      .removeAlpha()
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const pixels = new Uint8ClampedArray(data.buffer);
        const threshold = 240; // Tröskelvärde för att avgöra vad som är vitt
        
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          
          // Om pixeln är nära vit, gör den transparent
          if (r > threshold && g > threshold && b > threshold) {
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
        console.log(`Bilden har bearbetats och sparats till ${outputPath}`);
      })
      .catch(err => {
        console.error('Ett fel uppstod vid bearbetning av bilden:', err);
      });
  } else {
    console.log('Ingen bild hittades');
  }
});
