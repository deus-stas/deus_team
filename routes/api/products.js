const express = require("express");
const router = express.Router();
const multer = require("multer");
const Products = require("../../models/Products");
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

router.get('/products', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [products, count] = await Promise.all([
        Products.find().limit(limit).skip(skip),
        Products.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `products ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(products);
});

router.post('/products', upload.fields([{ name: 'img' }, { name: 'video' }]), async (req, res) => {
    const { name, descr, link, videoUrl } = req.body;
    
    console.log(req.files);

    let video, img;

    if (req.files.video) {
        video = req.files.video[0];
    }

    if (req.files.img) {
        img = req.files.img[0];
    }


    const products = new Products({
        name,
        descr,
        link,
        video,
        videoUrl,
        img
    });

    await products.save();

    res.json(products);
});



router.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const products = await Products.findById(id);

    if (!products) {
        return res.status(404).json({ error: 'Products not found' });
    }
    res.json(products);
});

router.put("/products/:id", upload.fields([{ name: 'video' }, { name: 'img' }]), async (req, res) => {
    const { id } = req.params;

    // Check if the product exists in the database
    const product = await Products.findById(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const { name, descr, link, videoUrl } = req.body;

    if (req.files && req.files.video) {
        if (product.video) {
            fs.unlink(product.video.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        product.video = req.files.video[0];
    } else {
        if (product.video && product.video.path && req.body.video !== 'true') {
            fs.unlink(product.video.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            product.video = null;
        }
    }

    if (req.files && req.files.img) {
        if (product.img) {
            fs.unlink(product.img.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        product.img = req.files.img[0];
    } else {
        if (product.img && product.img.path && req.body.img !== 'true') {
            fs.unlink(product.img.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            product.img = null;
        }
    }

    // Update the other fields of the document
    product.name = name;
    product.descr = descr;
    product.videoUrl = videoUrl;
    product.link = link;

    // Save the changes
    await product.save();

    res.json(product);
});



router.delete("/products/:id", async (req, res) => {
    const { id } = req.params;

    // Check if the product exists in the database
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { video, img } = product;

    // If there is a video file associated with the product, delete it
    if (video) {
        fs.unlinkSync(`uploads/${video.filename}`);
        console.log('delete')
    }

    // If there is an image file associated with the product, delete it
    if (img) {
        fs.unlinkSync(`uploads/${img.filename}`);
    }

    res.json({ success: true });
});



module.exports = router;