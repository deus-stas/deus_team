const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../../models/Products");
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

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [products, count] = await Promise.all([
        Products.find().limit(limit).skip(skip),
        Products.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `products ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(products);
});

router.post('/products', upload.single('video'), async (req, res) => {
    const { name, descr, link, videoUrl } = req.body;
    console.log(req.file);

    const video = req.file;

    const products = new Products({
        name,
        descr,
        link,
        video,
        videoUrl
    });

    await products.save();

    res.json(products);
});


router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const products = await Products.findById(id);

    if (!products) {
        return res.status(404).json({ error: 'Products not found' });
    }

    res.json(products);
});

router.put("/products/:id", upload.single('video'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const products = await Products.findById(id);
    if (!products) {
        return res.status(404).json({ error: 'Products not found' });
    }

    const { name, descr, link, videoUrl } = req.body;
    const video = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (video) {
        fs.unlinkSync(`uploads/${products.video.filename}`);
        products.video = video;
    }

    // Обновляем остальные поля документа
    products.name = name;
    products.descr = descr;
    products.videoUrl = videoUrl;
    products.link = link;

    // Сохраняем изменения
    await products.save();

    res.json(products);
});

router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;
    const products = await Products.findByIdAndDelete(id);
    if (!products) {
        return res.status(404).json({ success: false, message: "Products not found" });
    }

    const { video } = products;

    if (video) {
        fs.unlinkSync(`uploads/${video.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;