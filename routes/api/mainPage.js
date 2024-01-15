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

router.post('/mainPage', upload.single('mainVideoFile'), async (req, res) => {
    try {
        const { name, pageURL } = req.body;
        const textList = !!req.body.textList && req.body.textList !=='undefined' ? JSON.parse(req.body.textList): [];
        console.log(req.file);

        let mainVideoFile;
        if (req.file.mainVideoFile) {
            mainVideoFile = req.file.mainVideoFile[0];
        }

        const mainPage = new MainPage({
            name,
            mainVideoFile,
            textList,
            pageURL,
        });

        await mainPage.save();

        res.json(mainPage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/mainPage/:id', async (req, res) => {
    const { id } = req.params;
    const mainPage = await MainPage.findById(id);

    if (!mainPage) {
        return res.status(404).json({ error: 'Main page not found' });
    }

    res.json(mainPage);
});

router.put("/mainPage/:id", upload.single('mainVideoFile'), async (req, res) => {
    const { id } = req.params;
    console.log('okok', req.file)
    // Проверяем, есть ли такой документ в базе данных
    const mainPage = await MainPage.findById(id);
    if (!mainPage) {
        return res.status(404).json({ error: 'Main page not found' });
    }

    const { name, pageURL } = req.body;
    const textList = JSON.parse(req.body.textList);
    const mainVideoFile = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (mainVideoFile) {
        if (mainPage.mainVideoFile) {
            fs.unlink(mainPage.mainVideoFile.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        mainPage.mainVideoFile = mainVideoFile;
    } else {
        if (mainPage.mainVideoFile && mainPage.mainVideoFile.path && req.body.mainVideoFile !== 'true') {
            fs.unlink(mainPage.mainVideoFile.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            mainPage.mainVideoFile = null;
        }
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

    const { mainVideoFile } = mainPage;

    if (mainVideoFile) {
        fs.unlinkSync(`uploads/${mainVideoFile.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;