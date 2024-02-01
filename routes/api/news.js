const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { transliterate } = require('transliteration');
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

router.post('/news', upload.fields([
  { name: 'image' },
  { name: 'photoSlider' }])
    , async (req, res) => {
  const { name, newsTags, mainControl, detailControl, aboutClient, aboutClient2, body, workStepsItem, body2 } = req.body;

  function generateUrl(name) {
    const transliteratedName = transliterate(name);
    const rmPercent = transliteratedName.replace(/%/g, '');
    return rmPercent.split(' ').join('-');
  }

  const urlName = generateUrl(name);

 let photoSlider;

 if (req.files.photoSlider) {
   photoSlider = req.files.photoSlider;
 }

 const image = req.files.image[0];

  const news = new News({
    name,
    image,
    body,
    body2,
    photoSlider,
    workStepsItem,
    urlName,
    newsTags,
    aboutClient,
    aboutClient2,
    mainControl,
    detailControl,
  });

  await news.save();

  res.json(news);
});


router.get('/news/:id', async (req, res) => {
  const { id } = req.params;
  let news;


  news = await News.findById(id);

  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }

  res.json(news);
});

router.get('/news/url/:url', async (req, res) => {
  const { url } = req.params;
  let news;

  news = await News.findOne({ urlName: url });

  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }

  res.json(news);
});

router.put("/news/:id", upload.fields([
  { name: 'image' },
  { name: 'photoSlider' }]),
    async (req, res) => {
  const { id } = req.params;

  // Проверяем, есть ли такой документ в базе данных
  const news = await News.findById(id);
  if (!news) {
    return res.status(404).json({ error: 'News not found' });
  }

  const { name, newsTags, urlName, mainControl, aboutClient, aboutClient2,  detailControl, workStepsItem,  body, body2 } = req.body;
  const image = req.file;
  const photoSliderNames = JSON.parse(req.body.photoSliderNames);

  // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        const path = `uploads/${news.image.filename}`
        if (fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
        news.image = image;
    }

      if (req.files.photoSlider) {
        if (news.photoSlider && news.photoSlider.length > 0) {
          news.photoSlider.filter(image=> !photoSliderNames.includes(image.filename)).forEach((image) => {
            fs.unlink(image.path, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
        }
        news.photoSlider = [
          ...(news.photoSlider ? news.photoSlider.filter(image => photoSliderNames.includes(image.filename)) : []),
          ...(!!req.files ? req.files.photoSlider : [])
        ];
        console.log()
      } else {
        if (news.photoSlider && news.photoSlider.length > 0) {
          news.photoSlider.filter(image=> !photoSliderNames.includes(image.filename)).forEach((image) => {
            fs.unlink(image.path, (err) => {
              if (err) {
                console.error(err);
              }
            });
          });
          news.photoSlider = [
            ...(news.photoSlider ? news.photoSlider.filter(image => photoSliderNames.includes(image.filename)) : [])
          ];
        }
      }

  // Обновляем остальные поля документа
  news.name = name;
  news.newsTags = newsTags;
  news.urlName = urlName;
  news.mainControl = mainControl;
  news.detailControl = detailControl;
  news.aboutClient = aboutClient;
  news.aboutClient2 = aboutClient2;
  news.body = body;
  news.body2 = body2;
  news.workStepsItem = workStepsItem;

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

  const { image, photoSlider } = news;

  if (image) {
    fs.unlinkSync(`uploads/${image.filename}`);
  }

  const multiImages = [
    photoSlider
  ]
  multiImages.forEach(files => {
    if (files) {
      files.forEach((file) => {
        fs.unlinkSync(`uploads/${file.filename}`);
      });
    }
  })

  res.json({ success: true });
});


module.exports = router;