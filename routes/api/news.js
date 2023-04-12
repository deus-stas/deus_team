const express = require("express");
const router = express.Router();
const multer = require("multer");
const News = require("../../models/News");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
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
  const { name, tags, body } = req.body;
  console.log(req.file);

  const image = req.file;

  const news = new News({
    name,
    image,
    body,
    tags
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

router.put("/news/:id", async (req, res) => {
  const { id } = req.params;
  const post = await News.findByIdAndUpdate(id, req.body);
  res.json(post);
});

router.delete("/news/:id", async (req, res) => {
  const { id } = req.params;
  await News.findByIdAndDelete(id);
  res.json({ success: true });
});


module.exports = router;