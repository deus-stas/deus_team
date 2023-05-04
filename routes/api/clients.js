const express = require("express");
const router = express.Router();
const multer = require("multer");
const Clients = require("../../models/Clients");
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

router.get('/clients', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [clients, count] = await Promise.all([
        Clients.find().limit(limit).skip(skip),
        Clients.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `clients ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(clients);
});

router.post('/clients', upload.single('image'), async (req, res) => {
    const { name } = req.body;
    console.log(req.file);

    const image = req.file;

    const clients = new Clients({
        name,
        image,
    });

    await clients.save();

    res.json(clients);
});


router.get('/clients/:id', async (req, res) => {
    const { id } = req.params;
    const clients = await Clients.findById(id);

    if (!clients) {
        return res.status(404).json({ error: 'Clients not found' });
    }

    res.json(clients);
});

router.put("/clients/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const clients = await Clients.findById(id);
    if (!clients) {
        return res.status(404).json({ error: 'clients not found' });
    }

    const { name } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${clients.image.filename}`);
        clients.image = image;
    }

    // Обновляем остальные поля документа
    clients.name = name;

    // Сохраняем изменения
    await clients.save();

    res.json(clients);
});

router.delete("/clients/:id", async (req, res) => {
    const { id } = req.params;
    const clients = await Clients.findByIdAndDelete(id);
    if (!clients) {
        return res.status(404).json({ success: false, message: "Clients not found" });
    }

    const { image } = clients;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;