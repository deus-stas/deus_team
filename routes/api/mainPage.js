const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const MainPage = require("../../models/MainPage");

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

router.get('/mainPage', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [mainPage, count] = await Promise.all([
        MainPage.find().limit(limit).skip(skip),
        MainPage.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `mainPage ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(mainPage);
});

router.post('/mainPage', upload.single('image'), async (req, res) => {
    const { name, pageURL } = req.body;
    const textList = !!req.body.textList && req.body.textList !=='undefined' ? JSON.parse(req.body.textList): [];
    console.log(req.file);

    const image = req.file;

    const mainPage = new MainPage({
        name,
        image,
        textList,
        pageURL,
    });

    await mainPage.save();

    res.json(mainPage);
});


router.get('/mainPage/:id', async (req, res) => {
    const { id } = req.params;
    const mainPage = await MainPage.findById(id);

    if (!mainPage) {
        return res.status(404).json({ error: 'Main page not found' });
    }

    res.json(mainPage);
});

router.put("/mainPage/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const mainPage = await MainPage.findById(id);
    if (!mainPage) {
        return res.status(404).json({ error: 'Main page not found' });
    }

    const { name, pageURL } = req.body;
    const textList = JSON.parse(req.body.textList);
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${mainPage.image.filename}`);
        mainPage.image = image;
    }

    // Обновляем остальные поля документа
    mainPage.name = name;
    mainPage.textList = textList;
    mainPage.pageURL = pageURL;

    // Сохраняем изменения
    await mainPage.save();

    res.json(mainPage);
});

router.delete("/mainPage/:id", async (req, res) => {
    const { id } = req.params;
    const mainPage = await MainPage.findByIdAndDelete(id);
    if (!mainPage) {
        return res.status(404).json({ success: false, message: "Main page not found" });
    }

    const { image } = mainPage;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;