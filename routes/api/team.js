const express = require("express");
const router = express.Router();
const multer = require("multer");
const Team = require("../../models/Team");
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

router.get('/team', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [team, count] = await Promise.all([
        Team.find().limit(limit).skip(skip),
        Team.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `team ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(team);
});

router.post('/team', upload.single('image'), async (req, res) => {
    const { name, post } = req.body;
    console.log(req.file);

    const image = req.file;

    const team = new Team({
        name,
        post,
        image,
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

router.put("/team/:id", upload.single('image'), async (req, res) => {
    const { id } = req.params;

    // Проверяем, есть ли такой документ в базе данных
    const team = await Team.findById(id);
    if (!team) {
        return res.status(404).json({ error: 'team not found' });
    }

    const { name, post } = req.body;
    const image = req.file;

    // Если есть новое изображение в запросе, обновляем ссылку на него
    if (image) {
        fs.unlinkSync(`uploads/${team.image.filename}`);
        team.image = image;
    }

    // Обновляем остальные поля документа
    team.name = name;
    team.post = post;

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

    const { image } = team;

    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;