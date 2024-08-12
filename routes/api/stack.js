const express = require("express");
const router = express.Router();
const multer = require("multer");
const Stack = require("../../models/Stack");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const {uploadFile} = require("./file");

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

router.get('/stack', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [stack, count] = await Promise.all([
        Stack.find().limit(limit).skip(skip),
        Stack.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `stack ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(stack);
});

router.post('/stack', upload.single('image'), async (req, res) => {
    const { name, } = req.body;
    console.log(req.file);

    const image = req.file;

    const stack = new Stack({
        name,
        image,
    });

    await stack.save();

    res.json(stack);
});


router.get('/stack/:id', async (req, res) => {
    const { id } = req.params;
    const stack = await Stack.findById(id);

    if (!stack) {
        return res.status(404).json({ error: 'stack not found' });
    }

    res.json(stack);
});

router.put("/stack/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const stack = await Stack.findById(id);
    if (!stack) {
        return res.status(404).json({ error: 'stack not found' });
    }

    const { name,} = req.body;
    const image = req.file ? req.file : undefined;


    uploadFile(image,'image',stack,req,'image')

    // Обновляем остальные поля документа
    stack.name = name;

    // Сохраняем изменения
    await stack.save();

    res.json(stack);
});

router.delete("/stack/:id", async (req, res) => {
    const { id } = req.params;
    const stack = await Stack.findByIdAndDelete(id);
    if (!stack) {
        return res.status(404).json({ success: false, message: "stack not found" });
    }

    const { image } = stack;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;
