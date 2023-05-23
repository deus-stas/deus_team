const express = require("express");
const router = express.Router();
const multer = require("multer");
const Form = require("../../models/Form");
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

router.get('/form', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [form, count] = await Promise.all([
        Form.find().limit(limit).skip(skip),
        Form.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `form ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(form);
});

router.post('/form', upload.single('file'), async (req, res) => {
    const { ctaServices, name, formName, company, link, phone, email, about, budget } = req.body;
    console.log(req.body);

    const file = req.file;

    const form = new Form({
        formName, ctaServices, name, company, link, phone, email, about, budget, file
    });

    await form.save();

    res.json(form);
});

router.get('/form/:id', async (req, res) => {
    const { id } = req.params;
    const form = await Form.findById(id);

    if (!form) {
        return res.status(404).json({ error: 'Form not found' });
    }

    res.json(form);
});

router.delete("/form/:id", async (req, res) => {
    const { id } = req.params;
    const form = await Form.findByIdAndDelete(id);
    if (!form) {
        return res.status(404).json({ success: false, message: "Form not found" });
    }

    const { file } = form;

    if (file) {
        fs.unlinkSync(`uploads/${file.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;