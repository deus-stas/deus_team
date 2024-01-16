const express = require("express");
const router = express.Router();
const multer = require("multer");
const Team = require("../../models/Team");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const compareUtil = require("../../utils/compareUtil");

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

router.get('/team', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);
    const order = !!req && !!req.query && !!req.query._order ? req.query._order : ''
    const sort = !!req && !!req.query && !!req.query._sort ? req.query._sort : ''

    let [team, count] = await Promise.all([
        Team.find().limit(limit).skip(skip),
        Team.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `team ${rangeStart}-${rangeEnd}/${count}`;
    res.set('Content-Range', contentRange);
    team = compareUtil.sortByField(team, sort, order)
    res.json(team);
});

router.post('/team', upload.fields([{name:'image'}, {name:'mainImg'}]), async (req, res) => {
    const { name, post, sign,  priority, mainControl, agencyControl, serviceControl } = req.body;


    const image = req.files.image;

    let mainImg

    if (req.files.mainImg) {
        mainImg = req.files.mainImg[0];
    }

    const team = new Team({
        name,
        post,
        sign,
        image,
        mainImg,
        priority,
        mainControl,
        agencyControl,
        serviceControl,
    });

    await team.save();

    res.json(team);
});


router.get('/team/:id', async (req, res) => {
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }

    res.json(team);
});

router.put("/team/:id", upload.fields([{name:'image'}, {name:'mainImg'}]), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const team = await Team.findById(id);
    if (!team) {
        return res.status(404).json({ error: 'team not found' });
    }
    console.log("реквест",req.files)
    const { name, post, sign, priority, mainControl, agencyControl, serviceControl } = req.body;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    function updateImage(team, imageKey, imgUpload) {
        if (team[imageKey] && imgUpload) {
            const path = `uploads/${team[imageKey].filename}`
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
        }
        if (imgUpload){
            const image = !!req.files[imageKey] ? req.files[imageKey][0] : null;
            team[imageKey] = image;
        }
    }

    const imgUpload = !['true'].includes(req.body.image);
    updateImage(team, 'image', imgUpload);

    const mainImgUpload = !['true'].includes(req.body.mainImg);
    updateImage(team, 'mainImg', mainImgUpload);



    // Обновляем остальные поля документа
    team.name = name;
    team.post = post;
    team.sign = sign;
    team.priority = priority;
    team.mainControl = mainControl;
    team.agencyControl = agencyControl;
    team.serviceControl = serviceControl;

    // Сохраняем изменения
    await team.save();

    res.json(team);
});

router.delete("/team/:id", async (req, res) => {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);
    if (!team) {
        return res.status(404).json({ success: false, message: "Team not found" });
    }

    const { image, mainImg } = team;

    if (image && fs.existsSync(`uploads/${image.filename}`)) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    if (mainImg && fs.existsSync(`uploads/${mainImg.filename}`)) {
        fs.unlinkSync(`uploads/${mainImg.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;