const express = require("express");
const router = express.Router();
const multer = require("multer");
const Social = require("../../models/Social");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newFilename = `${uuidv4()}${ext}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage: storage });

router.get('/social', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [social, count] = await Promise.all([
        Social.find().limit(limit).skip(skip),
        Social.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `social ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(social);
});

router.post('/social', upload.single('image'), async (req, res) => {
    const { name, descr, link, color } = req.body;
    console.log(req.file);

    const image = req.file;

    const social = new Social({
        name,
        descr,
        link,
        color,
        image,
    });

    await social.save();

    res.json(social);
});


router.get('/social/:id', async (req, res) => {
    const { id } = req.params;
    const social = await Social.findById(id);

    if (!social) {
        return res.status(404).json({ error: 'Social not found' });
    }

    res.json(social);
});

router.put("/social/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const social = await Social.findById(id);
    if (!social) {
        return res.status(404).json({ error: 'Social not found' });
    }

    const { name, descr, link, color } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${social.image.filename}`);
        social.image = image;
    }

    // Обновляем остальные поля документа
    social.name = name;
    social.descr = descr;
    social.link = link;
    social.color = color;

    // Сохраняем изменения
    await social.save();

    res.json(social);
});

router.delete("/social/:id", async (req, res) => {
    const { id } = req.params;
    const social = await Social.findByIdAndDelete(id);
    if (!social) {
        return res.status(404).json({ success: false, message: "social not found" });
    }

    const { image } = social;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;