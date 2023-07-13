const express = require("express");
const router = express.Router();
const multer = require("multer");
const Diplomas = require("../../models/Diplomas");
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

router.get('/diplomas', async (req, res) => {
  const limit = parseInt(req.query._limit);
  const skip = parseInt(req.query._start);

  const [diplomas, count] = await Promise.all([
    Diplomas.find().limit(limit).skip(skip),
    Diplomas.countDocuments()
  ]);

  const rangeStart = skip;
  const rangeEnd = Math.min(skip + limit - 1, count - 1);
  const contentRange = `diplomas ${rangeStart}-${rangeEnd}/${count}`;

  res.set('Content-Range', contentRange);
  res.json(diplomas);
});

router.post('/diplomas', upload.single('image'), async (req, res) => {
  const { name, diplomaProject,controlVisibility } = req.body;
  console.log(req.file);

  const image = req.file;

  const diplomas = new Diplomas({
    name,
    image,
    diplomaProject,
    controlVisibility
  });

  await diplomas.save();

  res.json(diplomas);
});


router.get('/diplomas/:id', async (req, res) => {
  const { id } = req.params;
  const diplomas = await Diplomas.findById(id);

  if (!diplomas) {
    return res.status(404).json({ error: 'diplomas not found' });
  }

  res.json(diplomas);
});

router.put("/diplomas/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const diplomas = await Diplomas.findById(id);
  if (!diplomas) {
    return res.status(404).json({ error: 'diplomas not found' });
  }

  const { name, diplomaProject, controlVisibility } = req.body;
  const image = req.file;

  // Если есть новое изображение в запросе, обновляем ссылку на него
  if (image) {
    fs.unlinkSync(`uploads/${diplomas.image.filename}`);
    diplomas.image = image;
  }

  // Обновляем остальные поля документа
  diplomas.name = name;
  diplomas.diplomaProject = diplomaProject;
  diplomas.controlVisibility = controlVisibility;

  // Сохраняем изменения
  await diplomas.save();

  res.json(diplomas);
});

router.delete("/diplomas/:id", async (req, res) => {
  const { id } = req.params;
  const diplomas = await Diplomas.findByIdAndDelete(id);
  if (!diplomas) {
    return res.status(404).json({ success: false, message: "diplomas not found" });
  }

  const { image } = diplomas;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  res.json({ success: true });
});


module.exports = router;