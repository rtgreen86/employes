const express = require('express');
const Image = require('../models/Image');
const fs = require('node:fs/promises');
const multer = require('multer');

module.exports = (dir) => {
    const router = module.exports = express.Router();

    router.get('/', async (req, res) => {
        const images = await Image.getList();

        res.render('image-list', {
            title: 'Images',
            images
        })
    });

    router.get('/upload', (req, res) => {
        res.render('image-form', {
            title: 'Image upload',
        });
    });

    const upload = multer({ dest: dir });

    router.post('/upload', upload.single('image'), async (req, res) => {
        await fs.rename(req.file.path, req.file.path + '.jpg');
        const image = new Image({
            size: req.file.size,
            path: `${req.file.filename}.jpg`,
        });
        await image.save();
        res.redirect('/');
    });

    return router;
}


