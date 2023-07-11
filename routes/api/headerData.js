const express = require("express");
const router = express.Router();
const multer = require("multer");
const HeaderData = require("../../models/HeaderData");
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

router.get('/headerData', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [headerData, count] = await Promise.all([
        HeaderData.find().limit(limit).skip(skip),
        HeaderData.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `headerData ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(headerData);
});

router.post('/headerData', upload.single('presentation'), async (req, res) => {
    const { phone, email, vk, telegram, behance } = req.body;
    console.log(req.file);

    const presentation = req.file;

    
    const headerData = new HeaderData({
        phone,
        email,
        presentation,
        vk,
        telegram,
        behance
    });

    await headerData.save();

    res.json(headerData);
});

router.get('/headerData/:id', async (req, res) => {
    const { id } = req.params;
    const headerData = await HeaderData.findById(id);

    if (!headerData) {
        return res.status(404).json({ error: 'Header data not found' });
    }

    res.json(headerData);
});

router.put("/headerData/:id", upload.single('presentation'), async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the headerData exists in the database
      const headerData = await HeaderData.findById(id);
      if (!headerData) {
        return res.status(404).json({ error: 'HeaderData not found' });
      }
  
      const { email, phone, vk, telegram, behance } = req.body;
      const presentation = req.file;
  
      if (presentation) {
        fs.unlinkSync(`uploads/${headerData.presentation.filename}`);
        headerData.presentation = presentation;
        console.log("pres", presentation)
    }
  
      // Update the other fields of the document
      headerData.email = email;
      headerData.phone = phone;
      headerData.vk = vk;
      headerData.telegram = telegram;
      headerData.behance = behance;
  
      // Save the changes
      await headerData.save();
  
      res.json(headerData);
    } catch (error) {
      // Handle any errors that occurred during the process
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

  router.delete("/headerData/:id", async (req, res) => {
    const { id } = req.params;
    const headerData = await HeaderData.findByIdAndDelete(id);
    if (!headerData) {
        return res.status(404).json({ success: false, message: "HeaderData not found" });
    }

    const { presentation } = headerData;

    if (presentation) {
        fs.unlinkSync(`uploads/${presentation.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;