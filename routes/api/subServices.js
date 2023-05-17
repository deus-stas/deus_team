const express = require("express");
const router = express.Router();
const multer = require("multer");
const SubServices = require("../../models/SubServices");
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

router.get('/subServices', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [subServices, count] = await Promise.all([
        SubServices.find().limit(limit).skip(skip),
        SubServices.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `subServices ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(subServices);
});

router.post('/subServices', upload.single('image'), async (req, res) => {
    const { name, descr } = req.body;
    console.log(req.file);

    const image = req.file;

    const subServices = new SubServices({
        name,
        descr,
        image,
    });

    await subServices.save();

    res.json(subServices);
});


router.get('/subServices/:id', async (req, res) => {
    const { id } = req.params;
    const subServices = await SubServices.findById(id);

    if (!subServices) {
        return res.status(404).json({ error: 'SubServices not found' });
    }

    res.json(subServices);
});

router.put("/subServices/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const subServices = await SubServices.findById(id);
    if (!subServices) {
        return res.status(404).json({ error: 'SubServices not found' });
    }

    const { name, descr } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${subServices.image.filename}`);
        subServices.image = image;
    }

    // Обновляем остальные поля документа
    subServices.name = name;
    subServices.descr = descr;

    // Сохраняем изменения
    await subServices.save();

    res.json(subServices);
});

router.delete("/subServices/:id", async (req, res) => {
    const { id } = req.params;
    const subServices = await SubServices.findByIdAndDelete(id);
    if (!subServices) {
        return res.status(404).json({ success: false, message: "SubServices not found" });
    }

    const { image } = subServices;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;