const express = require("express");
const router = express.Router();
const multer = require("multer");
const Persons = require("../../models/Persons");
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

router.get('/persons', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [persons, count] = await Promise.all([
        Persons.find().limit(limit).skip(skip),
        Persons.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `persons ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(persons);
});

router.post('/persons', upload.single('image'), async (req, res) => {
    const { name, post } = req.body;
    console.log(req.file);

    const image = req.file;

    const persons = new Persons({
        name,
        post,
        image,
    });

    await persons.save();

    res.json(persons);
});


router.get('/persons/:id', async (req, res) => {
    const { id } = req.params;
    const persons = await Persons.findById(id);

    if (!persons) {
        return res.status(404).json({ error: 'Persons not found' });
    }

    res.json(persons);
});

router.put("/persons/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const persons = await Persons.findById(id);
    if (!persons) {
        return res.status(404).json({ error: 'Persons not found' });
    }

    const { name, post } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${persons.image.filename}`);
        persons.image = image;
    }

    // Обновляем остальные поля документа
    persons.name = name;
    persons.post = post;

    // Сохраняем изменения
    await persons.save();

    res.json(persons);
});

router.delete("/persons/:id", async (req, res) => {
    const { id } = req.params;
    const persons = await Persons.findByIdAndDelete(id);
    if (!persons) {
      return res.status(404).json({ success: false, message: "Persons not found" });
    }
  
    const { image } = persons;
  
    if (image) {
      fs.unlinkSync(`uploads/${image.filename}`);
    }
  
    res.json({ success: true });
  });


module.exports = router;