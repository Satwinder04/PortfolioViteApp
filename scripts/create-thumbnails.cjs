const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = './public/img/portfolio';
const targetDir = './public/img/portfolio/thumbnails';

if (!fs.existsSync(targetDir)){
    fs.mkdirSync(targetDir);
}

fs.readdirSync(sourceDir).forEach(file => {
    if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
        sharp(path.join(sourceDir, file))
            .resize(600, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .jpeg({ quality: 80 })
            .toFile(path.join(targetDir, file))
            .then(info => console.log(`Created thumbnail for ${file}`))
            .catch(err => console.error(`Error processing ${file}:`, err));
    }
});