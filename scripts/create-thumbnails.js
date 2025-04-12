import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sourceDir = './public/img/portfolio';
const targetDir = './public/img/portfolio/thumbnails';

try {
    // Check if directory exists, if not create it
    await fs.access(targetDir).catch(async () => {
        await fs.mkdir(targetDir, { recursive: true });
    });

    // Read all files from source directory
    const files = await fs.readdir(sourceDir);

    // Process each file
    for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|gif)$/)) {
            try {
                await sharp(path.join(sourceDir, file))
                    .resize(600, null, {
                        withoutEnlargement: true,
                        fit: 'inside'
                    })
                    .jpeg({ quality: 80 })
                    .toFile(path.join(targetDir, file));
                
                console.log(`Created thumbnail for ${file}`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
} catch (err) {
    console.error('Error:', err);
}
