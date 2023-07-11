const express = require("express");
const router = express.Router();
const multer = require("multer");
const Showreels = require("../../models/Showreels");
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

router.get('/showreels', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [showreels, count] = await Promise.all([
        Showreels.find().limit(limit).skip(skip),
        Showreels.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `showreels ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(showreels);
});

router.post('/showreels', upload.single('video'), async (req, res) => {
    const { name, year, mainShowreel, videoUrl } = req.body;
    console.log(req.file);

    const video = req.file;

    // Check if mainShowreel is being set to true
    if (mainShowreel === true || mainShowreel === 'true') {
        // Find any existing showreel with mainShowreel set to true and set it to false
        await Showreels.updateMany({ mainShowreel: true }, { $set: { mainShowreel: false } });
    }

    const showreels = new Showreels({
        name,
        year,
        mainShowreel,
        video,
        videoUrl
    });

    await showreels.save();

    res.json(showreels);
});


router.get('/showreels/:id', async (req, res) => {
    const { id } = req.params;
    const showreels = await Showreels.findById(id);

    if (!showreels) {
        return res.status(404).json({ error: 'Showreels not found' });
    }

    res.json(showreels);
});

// router.put("/showreels/:id", upload.single('video'), async (req, res) => {
//     const { id } = req.params;

//     // Проверяем, есть ли такой документ в базе данных
//     const showreels = await Showreels.findById(id);
//     if (!showreels) {
//         return res.status(404).json({ error: 'Showreels not found' });
//     }

//     const { name, year, mainShowreel, videoUrl } = req.body;
//     const video = req.file;

//     // Если есть новое изображение в запросе, обновляем ссылку на него
//     if (video) {
//         fs.unlinkSync(`uploads/${showreels.video.filename}`);
//         showreels.video = video;
//     }

//     // Обновляем остальные поля документа
//     showreels.name = name;
//     showreels.year = year;
//     showreels.mainShowreel = mainShowreel;
//     showreels.videoUrl = videoUrl;

//     // Сохраняем изменения
//     await showreels.save();

//     res.json(showreels);
// });
router.put("/showreels/:id", upload.single('video'), async (req, res) => {
    const { id } = req.params;
  
    // Check if the showreel exists in the database
    const showreels = await Showreels.findById(id);
    if (!showreels) {
      return res.status(404).json({ error: 'Showreels not found' });
    }
  
    const { name, year, mainShowreel, videoUrl } = req.body;
    const video = req.file;
  
    // If there is a new video file in the request, update the video property and delete the previous video file
    if (video) {
        fs.unlinkSync(`uploads/${showreels.video.filename}`);
        showreels.video = video;
    }
  
    // Update the other fields of the document
    showreels.name = name;
    showreels.year = year;
    showreels.videoUrl = videoUrl;
  
    //Check if mainShowreel is being modified and update it accordingly
    if (mainShowreel === "true" || mainShowreel === true) {
       // Find any existing showreel with mainShowreel set to true and set it to false
        await Showreels.updateMany({ mainShowreel: true, _id: { $ne: id } }, { $set: { mainShowreel: false } });
    } 
    
    showreels.mainShowreel = mainShowreel;
  
    // Save the changes
    await showreels.save();
    res.json(showreels);
  });
  

router.delete("/showreels/:id", async (req, res) => {
    const { id } = req.params;
    const showreels = await Showreels.findByIdAndDelete(id);
    if (!showreels) {
        return res.status(404).json({ success: false, message: "Showreels not found" });
    }

    const { video } = showreels;

    if (video) {
        fs.unlinkSync(`uploads/${video.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;