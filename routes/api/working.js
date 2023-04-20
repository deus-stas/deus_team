const express = require("express");
const router = express.Router();
const multer = require("multer");
const Working = require("../../models/Working");
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

router.get('/working', async (req, res) => {
  const limit = parseInt(req.query._limit);
  const skip = parseInt(req.query._start);

  const [working, count] = await Promise.all([
    Working.find().limit(limit).skip(skip),
    Working.countDocuments()
  ]);

  const rangeStart = skip;
  const rangeEnd = Math.min(skip + limit - 1, count - 1);
  const contentRange = `working ${rangeStart}-${rangeEnd}/${count}`;

  res.set('Content-Range', contentRange);
  res.json(working);
});

router.post('/working', upload.single('image'), async (req, res) => {
  const { name } = req.body;
  console.log(req.file);

  const image = req.file;

  const working = new Working({
    name,
    image,
  });

  await working.save();

  res.json(working);
});


router.get('/working/:id', async (req, res) => {
  const { id } = req.params;
  const working = await Working.findById(id);

  if (!working) {
    return res.status(404).json({ error: 'Working not found' });
  }

  res.json(working);
});

router.put("/working/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const working = await Working.findById(id);
  if (!working) {
    return res.status(404).json({ error: 'Working not found' });
  }

  const { name } = req.body;
  const image = req.file;

  // Если есть новое изображение в запросе, обновляем ссылку на него
  if (image) {
    fs.unlinkSync(`uploads/${working.image.filename}`);
    working.image = image;
  }

  // Обновляем остальные поля документа
  working.name = name;

  // Сохраняем изменения
  await working.save();

  res.json(working);
});

router.delete("/working/:id", async (req, res) => {
  const { id } = req.params;
  const working = await Working.findByIdAndDelete(id);
  if (!working) {
    return res.status(404).json({ success: false, message: "Working not found" });
  }

  const { image } = working;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  res.json({ success: true });
});


module.exports = router;