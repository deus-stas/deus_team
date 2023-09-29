const express = require("express");
const router = express.Router();
const multer = require("multer");
const Reviews = require("../../models/Reviews");
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

router.get('/reviews', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [reviews, count] = await Promise.all([
        Reviews.find().limit(limit).skip(skip),
        Reviews.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `reviews ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(reviews);
});

router.post('/reviews', upload.fields([{ name: 'reviewFile' }, { name: 'reviewImage' }, { name: 'reviewBg'}]), async (req, res) => {
    const { name, service, type, reviewName, reviewPost, review, reviewProject, reviewService } = req.body;
    console.log(req.file);

    let reviewFile, reviewImage, reviewBg;

    if (req.files.reviewFile) {
        reviewFile = req.files.reviewFile[0];
    }

    if (req.files.reviewImage) {
        reviewImage = req.files.reviewImage[0];
    }

    if (req.files.reviewBg) {
        reviewBg = req.files.reviewBg[0];
    }

    const reviews = new Reviews({
        name,
        service,
        type,
        reviewName,
        reviewPost,
        review,
        reviewProject,
        reviewService,
        reviewFile,
        reviewImage,
        reviewBg
    });

    await reviews.save();

    res.json(reviews);
});


router.get('/reviews/:id', async (req, res) => {
    const { id } = req.params;
    const reviews = await Reviews.findById(id);

    if (!reviews) {
        return res.status(404).json({ error: 'Reviews not found' });
    }

    res.json(reviews);
});

router.put("/reviews/:id", upload.fields([{ name: 'reviewFile' }, { name: 'reviewImage' }, { name: 'reviewBg' }]), async (req, res) => {
    const { id } = req.params;
    const reviews = await Reviews.findById(id);

    if (!reviews) {
        return res.status(404).json({ success: false, message: "reviews not found" });
    }
    console.log(req.body);
    console.log(req.files);

    const { name, service, type, reviewName, reviewPost, review, reviewProject, reviewService } = req.body;

    if (req.files && req.files.reviewFile) {
        if (reviews.reviewFile) {
            fs.unlink(reviews.reviewFile.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        reviews.reviewFile = req.files.reviewFile[0];
    }

    if (req.files && req.files.reviewImage) {
        if (reviews.reviewImage) {
            fs.unlink(reviews.reviewImage.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        reviews.reviewImage = req.files.reviewImage[0];
    }
    if (req.files && req.files.reviewBg) {
        if (reviews.reviewBg) {
            fs.unlink(reviews.reviewBg.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        reviews.reviewBg = req.files.reviewBg[0];
    }

    reviews.name = name;
    reviews.service = service;
    reviews.type = type;
    reviews.reviewName = reviewName;
    reviews.reviewPost = reviewPost;
    reviews.review = review;
    reviews.reviewProject = reviewProject;
    reviews.reviewService = reviewService;

    await reviews.save();

    res.json(reviews);
});

router.delete("/reviews/:id", async (req, res) => {
    const { id } = req.params;
    const reviews = await Reviews.findByIdAndDelete(id);
    if (!reviews) {
        return res.status(404).json({ success: false, message: "reviews not found" });
    }

    const { reviewFile, reviewImage, reviewBg } = reviews;

    // Проверяем каждое изображение и удаляем его, если оно существует
    if (reviewFile) {
        fs.unlinkSync(`uploads/${reviewFile.filename}`);
    }
    if (reviewImage) {
        fs.unlinkSync(`uploads/${reviewImage.filename}`);
    }

    if (reviewBg) {
        fs.unlinkSync(`uploads/${reviewBg.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;