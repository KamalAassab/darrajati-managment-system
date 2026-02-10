const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(process.cwd(), 'public', 'logo.webp');
const outputPath = path.join(process.cwd(), 'public', 'logo.webp');

sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then((info) => {
        console.log('Logo converted successfully:', info);
    })
    .catch((err) => {
        console.error('Error converting logo:', err);
        process.exit(1);
    });
