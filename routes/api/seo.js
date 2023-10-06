const express = require("express");
const router = express.Router();
const SEO = require("../../models/SEO");
const fs = require("fs");

router.get('/seo', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    try {
        const [seo, count] = await Promise.all([
            SEO.find().limit(limit).skip(skip),
            SEO.countDocuments()
        ]);

        const rangeStart = skip;
        const rangeEnd = Math.min(skip + limit - 1, count - 1);
        const contentRange = `seo ${rangeStart}-${rangeEnd}/${count}`;

        res.set('Content-Range', contentRange);
        res.json(seo);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

router.post('/seo', async (req, res) => {
    try {
        const {name, seoPages, seoTitle, seoDescription, seoKeywords} = req.body;
        const newSeo = new SEO({
            name,
            seoTitle,
            seoDescription,
            seoKeywords,
            seoPages
        });

        await newSeo.save();

        res.json(newSeo);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/seo/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const seo = await SEO.findById(id);

        if (!seo) {
            return res.status(404).json({error: 'SEO not found'});
        }

        res.json(seo);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put("/seo/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const seo = await SEO.findById(id);

        if (!seo) {
            return res.status(404).json({error: 'SEO not found'});
        }

        const {name, seoPages, seoTitle, seoDescription, seoKeywords} = req.body;

        seo.name = name;
        seo.seoTitle = seoTitle;
        seo.seoDescription = seoDescription;
        seo.seoKeywords = seoKeywords;
        seo.seoPages = seoPages;
        console.log(seoPages)

        await seo.save();

        res.json(seo);
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

router.delete("/seo/:id", async (req, res) => {
    const {id} = req.params;

    try {
        const deletedSeo = await SEO.findByIdAndDelete(id);

        if (!deletedSeo) {
            return res.status(404).json({error: 'SEO not found'});
        }

        res.json({success: true});
    } catch (error) {
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;