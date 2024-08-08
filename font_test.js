const Canvas = require('canvas');
const fs = require('fs');
const path = require('path');

// Load the image
const baseImagePath = path.join(__dirname, 'mrkrabs.jpg');
const baseImage = fs.readFileSync(baseImagePath);

// Register the custom font
const fontPath = path.join(__dirname, 'KrabbyPatty.ttf');
console.log(`Registering font from: ${fontPath}`);
Canvas.registerFont(fontPath, { family: 'KrabbyPatty' });

// Create a canvas and load the image
const canvas = Canvas.createCanvas(512, 512);
const context = canvas.getContext('2d');

(async () => {
  const image = await Canvas.loadImage(baseImage);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  // Define text style and position
  context.font = 'bold 28px KrabbyPatty';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';

  // Debugging: Output the current font being used
  console.log(`Current font: ${context.font}`);

  // Test text rendering
  const numberText = '0';
  const daysText = 'DAYS WITHOUT';
  const mainText = 'NONSENSE';

  context.fillText(numberText, 256, 180); // Adjust the X and Y coordinates as needed
  context.fillText(daysText, 256, 210);   // Adjust the X and Y coordinates as needed
  context.fillText(mainText, 256, 240);   // Adjust the X and Y coordinates as needed

  // Save the image to a file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'output_image.png'), buffer);

  console.log('Image saved as output_image.png');
})();
