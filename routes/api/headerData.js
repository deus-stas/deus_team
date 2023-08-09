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

router.post('/headerData', upload.fields([
    { name: 'presentation' }, 
    { name: 'headerPhoto' }, 
    { name: 'contactPhoto' }]), async (req, res) => {
    const { phone, email, vk, telegram, behance } = req.body;
    console.log(req.file);

    // const presentation = req.file;
    let presentation, headerPhoto, contactPhoto;

    if (req.files.presentation) {
        presentation = req.files.presentation[0];
    }

    if (req.files.headerPhoto) {
        headerPhoto = req.files.headerPhoto[0];
    }

    if (req.files.contactPhoto) {
        contactPhoto = req.files.contactPhoto[0];
    }
    

    
    const headerData = new HeaderData({
        phone,
        email,
        presentation,
        vk,
        telegram,
        behance,
        headerPhoto,
        contactPhoto
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

router.put("/headerData/:id", upload.fields([
    {name: 'presentation'},
    {name: 'headerPhoto'},
    {name: 'contactPhoto'}
]), async (req, res) => {
    const { id } = req.params;
  
    try {
      // Check if the headerData exists in the database
      const headerData = await HeaderData.findById(id);
      if (!headerData) {
        return res.status(404).json({ error: 'HeaderData not found' });
      }
  
      const { email, phone, vk, telegram, behance } = req.body;
    //   const presentation = req.file;
  
    //   if (presentation) {
    //     fs.unlinkSync(`uploads/${headerData.presentation.filename}`);
    //     headerData.presentation = presentation;
    //     console.log("pres", presentation)
    // }

    if (req.files.presentation) {
        if (headerData.presentation) {
            fs.unlink(headerData.presentation.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        headerData.presentation = req.files.presentation[0];
    } else {
        if (headerData.presentation && headerData.presentation.path && req.body.presentation !== 'true') {
            fs.unlink(headerData.presentation.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            headerData.presentation = null;
        }
    }

    if (req.files.headerPhoto) {
        if (headerData.headerPhoto) {
            fs.unlink(headerData.headerPhoto.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        headerData.headerPhoto = req.files.headerPhoto[0];
    } else {
        if (headerData.headerPhoto && headerData.headerPhoto.path && req.body.headerPhoto !== 'true') {
            fs.unlink(headerData.headerPhoto.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            headerData.headerPhoto = null;
        }
    }

    if (req.files.contactPhoto) {
        if (headerData.contactPhoto) {
            fs.unlink(headerData.contactPhoto.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        headerData.contactPhoto = req.files.contactPhoto[0];
    } else {
        if (headerData.contactPhoto && headerData.contactPhoto.path && req.body.contactPhoto !== 'true') {
            fs.unlink(headerData.contactPhoto.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            headerData.contactPhoto = null;
        }
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

    const { presentation, headerPhoto, contactPhoto } = headerData;

    if (presentation) {
        fs.unlinkSync(`uploads/${presentation.filename}`);
    }

    if (headerPhoto) {
        fs.unlinkSync(`uploads/${headerPhoto.filename}`);
    }

    if (contactPhoto) {
        fs.unlinkSync(`uploads/${contactPhoto.filename}`);
    }
    

    res.json({ success: true });
});


module.exports = router;