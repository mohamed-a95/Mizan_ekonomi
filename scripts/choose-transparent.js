
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const assetsDir = path.join(__dirname, '../attached_assets');
const outputDir = path.join(__dirname, '../public/assets');

// Se till att output-mappen existerar
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Läs alla filer i assets-mappen
fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error('Kunde inte läsa assets-mappen:', err);
    rl.close();
    return;
  }

  console.log('Tillgängliga bilder:');
  files.forEach((file, index) => {
    console.log(`${index + 1}. ${file}`);
  });

  rl.question('Ange numret på bilden du vill göra transparent: ', (answer) => {
    const fileIndex = parseInt(answer, 10) - 1;
    
    if (isNaN(fileIndex) || fileIndex < 0 || fileIndex >= files.length) {
      console.log('Ogiltigt val. Avslutar.');
      rl.close();
      return;
    }
    
    const selectedFile = files[fileIndex];
    const inputPath = path.join(assetsDir, selectedFile);
    
    // Skapa filnamn för transparent version
    const fileExt = path.extname(selectedFile);
    const baseName = path.basename(selectedFile, fileExt);
    const outputPath = path.join(outputDir, `${baseName}-transparent${fileExt}`);

    console.log(`Bearbetar bild: ${selectedFile}`);
    
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
        rl.close();
      })
      .catch(err => {
        console.error('Ett fel uppstod vid bearbetning av bilden:', err);
        rl.close();
      });
  });
});
