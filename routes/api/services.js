const express = require("express");
const router = express.Router();
const Services = require("../../models/Services");


router.get('/services', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [services, count] = await Promise.all([
        Services.find().limit(limit).skip(skip),
        Services.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `services ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(services);
});

router.post('/services', async (req, res) => {
    console.log(req.body);
    const { name,
        descrTotal,
        descr,
        benefitsTitle,
        benefits,
        servicesServices,
        work,
        tariffs } = req.body;
    const services = new Services({
        name,
        descrTotal,
        descr,
        benefitsTitle,
        benefits,
        servicesServices,
        work,
        tariffs
    });

    await services.save();

    res.json(services);
});


router.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    const services = await Services.findById(id);

    if (!services) {
        return res.status(404).json({ error: 'Services not found' });
    }

    res.json(services);
});

router.put("/services/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Services.findByIdAndUpdate(id, req.body);
    res.json(post);
});

router.delete("/services/:id", async (req, res) => {
    const { id } = req.params;
    await Services.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;