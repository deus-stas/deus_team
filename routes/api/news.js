const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const News = require("../../models/News");

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

router.get('/news', async (req, res) => {
  const limit = parseInt(req.query._limit);
  const skip = parseInt(req.query._start);

  const [news, count] = await Promise.all([
    News.find().limit(limit).skip(skip),
    News.countDocuments()
  ]);

  const rangeStart = skip;
  const rangeEnd = Math.min(skip + limit - 1, count - 1);
  const contentRange = `news ${rangeStart}-${rangeEnd}/${count}`;

  res.set('Content-Range', contentRange);
  res.json(news);
});

router.post('/news', upload.single('image'), async (req, res) => {
  const { name, newsTags, body } = req.body;
  console.log(req.file);

  const image = req.file;

  const news = new News({
    name,
    image,
    body,
    newsTags
  });

  await news.save();

  res.json(news);
});


router.get('/news/:id', async (req, res) => {
  const { id } = req.params;
  const news = await News.findById(id);

  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }

  res.json(news);
});

router.put("/news/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const news = await News.findById(id);
  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }

  const { name, newsTags, body } = req.body;
  const image = req.file;

  // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        const path = `uploads/${news.image.filename}`
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        news.image = image;
    }

  // Обновляем остальные поля документа
  news.name = name;
  news.newsTags = newsTags;
  news.body = body;

  // Сохраняем изменения
  await news.save();

  res.json(news);
});

router.delete("/news/:id", async (req, res) => {
  const { id } = req.params;
  const news = await News.findByIdAndDelete(id);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }

  const { image } = news;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  res.json({ success: true });
});


module.exports = router;