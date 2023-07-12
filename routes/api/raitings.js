const express = require("express");
const router = express.Router();
const multer = require("multer");
const Raitings = require("../../models/Raitings");
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

router.get('/raitings', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [raitings, count] = await Promise.all([
        Raitings.find().limit(limit).skip(skip),
        Raitings.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `raitings ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(raitings);
});

router.post('/raitings', upload.single('image'), async (req, res) => {
    const { name, raitingProject, controlVisibility } = req.body;
    console.log(req.file);

    const image = req.file;

    const raitings = new Raitings({
        name,
        image,
        raitingProject,
        controlVisibility
    });

    await raitings.save();

    res.json(raitings);
});


router.get('/raitings/:id', async (req, res) => {
    const { id } = req.params;
    const raitings = await Raitings.findById(id);

    if (!raitings) {
        return res.status(404).json({ error: 'Raitings not found' });
    }

    res.json(raitings);
});

router.put("/raitings/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const raitings = await Raitings.findById(id);
    if (!raitings) {
        return res.status(404).json({ error: 'Raitings not found' });
    }

    const { name, raitingProject, controlVisibility } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${raitings.image.filename}`);
        raitings.image = image;
    }

    // Обновляем остальные поля документа
    raitings.name = name;
    raitings.raitingProject = raitingProject;
    raitings.controlVisibility = controlVisibility

    // Сохраняем изменения
    await raitings.save();

    res.json(raitings);
});

router.delete("/raitings/:id", async (req, res) => {
    const { id } = req.params;
    const raitings = await Raitings.findByIdAndDelete(id);
    if (!raitings) {
        return res.status(404).json({ success: false, message: "Raitings not found" });
    }

    const { image } = raitings;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;