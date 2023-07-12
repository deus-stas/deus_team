const express = require("express");
const router = express.Router();
const multer = require("multer");
const Awards = require("../../models/Awards");
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

router.get('/awards', async (req, res) => {
  const limit = parseInt(req.query._limit);
  const skip = parseInt(req.query._start);

  const [awards, count] = await Promise.all([
    Awards.find().limit(limit).skip(skip),
    Awards.countDocuments()
  ]);

  const rangeStart = skip;
  const rangeEnd = Math.min(skip + limit - 1, count - 1);
  const contentRange = `awards ${rangeStart}-${rangeEnd}/${count}`;

  res.set('Content-Range', contentRange);
  res.json(awards);
});

router.post('/awards', upload.single('image'), async (req, res) => {
  const { name, awardProject,controlVisibility } = req.body;
  console.log(req.file);

  const image = req.file;

  const awards = new Awards({
    name,
    image,
    awardProject,
    controlVisibility
  });

  await awards.save();

  res.json(awards);
});


router.get('/awards/:id', async (req, res) => {
  const { id } = req.params;
  const awards = await Awards.findById(id);

  if (!awards) {
    return res.status(404).json({ error: 'Awards not found' });
  }

  res.json(awards);
});

router.put("/awards/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const awards = await Awards.findById(id);
  if (!awards) {
    return res.status(404).json({ error: 'Awards not found' });
  }

  const { name, awardProject, controlVisibility } = req.body;
  const image = req.file;

  // Если есть новое изображение в запросе, обновляем ссылку на него
  if (image) {
    fs.unlinkSync(`uploads/${awards.image.filename}`);
    awards.image = image;
  }

  // Обновляем остальные поля документа
  awards.name = name;
  awards.awardProject = awardProject;
  awards.controlVisibility = controlVisibility;

  // Сохраняем изменения
  await awards.save();

  res.json(awards);
});

router.delete("/awards/:id", async (req, res) => {
  const { id } = req.params;
  const awards = await Awards.findByIdAndDelete(id);
  if (!awards) {
    return res.status(404).json({ success: false, message: "Awards not found" });
  }

  const { image } = awards;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  res.json({ success: true });
});


module.exports = router;