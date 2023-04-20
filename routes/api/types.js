const express = require("express");
const router = express.Router();
const Types = require("../../models/Types");


router.get('/types', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [types, count] = await Promise.all([
        Types.find().limit(limit).skip(skip),
        Types.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `types ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(types);
});

router.post('/types', async (req, res) => {
    console.log(req.body.name);
    const { name } = req.body;
    const types = new Types({
        name
    });

    await types.save();

    res.json(types);
});


router.get('/types/:id', async (req, res) => {
    const { id } = req.params;
    const types = await Types.findById(id);

    if (!types) {
        return res.status(404).json({ error: 'Types not found' });
    }

    res.json(types);
});

router.put("/types/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Types.findByIdAndUpdate(id, req.body);
    res.json(post);
});

router.delete("/types/:id", async (req, res) => {
    const { id } = req.params;
    await Types.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;