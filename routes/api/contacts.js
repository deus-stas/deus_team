const express = require("express");
const router = express.Router();
const multer = require("multer");
const Contacts = require("../../models/Contacts");
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

router.get('/contacts', async (req, res) => {
  const limit = parseInt(req.query._limit);
  const skip = parseInt(req.query._start);

  const [contacts, count] = await Promise.all([
    Contacts.find().limit(limit).skip(skip),
    Contacts.countDocuments()
  ]);

  const rangeStart = skip;
  const rangeEnd = Math.min(skip + limit - 1, count - 1);
  const contentRange = `contacts ${rangeStart}-${rangeEnd}/${count}`;

  res.set('Content-Range', contentRange);
  res.json(contacts);
});

router.post('/contacts', upload.single('image'), async (req, res) => {
  const { pageName, title, description } = req.body;
  console.log(req.file);

  const image = req.file;

  const contacts = new Contacts({
    pageName,
    image,
    title,
    description
  });

  await contacts.save();

  res.json(contacts);
});


router.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const contacts = await Contacts.findById(id);

  if (!contacts) {
    return res.status(404).json({ error: 'contacts not found' });
  }

  res.json(contacts);
});

router.put("/contacts/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const contacts = await Contacts.findById(id);
  if (!contacts) {
    return res.status(404).json({ error: 'contacts not found' });
  }

  const { pageName, title, description } = req.body;
  const image = req.file;

  // Если есть новое изображение в запросе, обновляем ссылку на него
  if (image) {
    fs.unlinkSync(`uploads/${contacts.image.filename}`);
    contacts.image = image;
  }

  // Обновляем остальные поля документа
  contacts.pageName = pageName;
  contacts.description = description;
  contacts.title = title;

  // Сохраняем изменения
  await contacts.save();

  res.json(contacts);
});

router.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const contacts = await Contacts.findByIdAndDelete(id);
  if (!contacts) {
    return res.status(404).json({ success: false, message: "contacts not found" });
  }

  const { image } = contacts;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  res.json({ success: true });
});


module.exports = router;