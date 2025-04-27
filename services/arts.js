const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const uuid4 = require('../utils/uuid4');
const createUploader = require('../utils/fileUploader');

exports.getArtWorks = async (req, res) => {
    const folderPath = path.join(__dirname, '../uploads/thumbnails');

    fs.readdir(folderPath, (err, files) => {

        if (err) {
            console.log('err:', err);
            return res.status(500).json({ error: 'Unable to read images folder' });
        }
        const imagePaths = files.map((file) => {
            return {
                url: `http://localhost:3000/uploads/thumbnails/${file}`,
                filename: path.parse(file).name // Extract filename without extension
            };
        });
        res.json({ images: imagePaths });
    });
}

exports.getHomeArtWorks = async (req, res) => {
    const folderPath = path.join(__dirname, '../uploads/thumbnails');
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to read images folder' });
        }
        const shuffled = files.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4);
        const randomImagePaths = selected.map((file) => {
            return {
                url: `http://localhost:3000/uploads/thumbnails/${file}`,
                filename: path.parse(file).name // Extract filename without extension
            };
        });
        res.json({ images: randomImagePaths });
    });
}

exports.getArtWork = async (req, res) => {

}


exports.uploadArtWork = (req, res) => {
    const uuid = uuid4.generateUUID4();
    const uploader = createUploader('artworks', uuid).single('image');

    uploader(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            const originalPath = req.file.path;
            const thumbnailFolder = path.join(__dirname, '../uploads/thumbnails');

            if (!fs.existsSync(thumbnailFolder)) {
                fs.mkdirSync(thumbnailFolder, { recursive: true });
            }

            const thumbnailPath = path.join(thumbnailFolder, req.file.filename);

            // Generate thumbnail using sharp
            await sharp(originalPath)
                .resize({
                    width: 300,           // Set your desired width (e.g., 300px)
                    withoutEnlargement: true // Prevents upscaling if the image is smaller than this size
                })
                .toFile(thumbnailPath);

            res.status(200).json({
                message: 'Original image uploaded and thumbnail created successfully',
                uuid: uuid,
                original: `/uploads/artworks/${req.file.filename}`,
                thumbnail: `/uploads/thumbnails/${req.file.filename}`
            });
        } catch (processingError) {
            console.error('Thumbnail generation error:', processingError);
            res.status(500).json({ error: 'Error generating thumbnail' });
        }
    });
}
