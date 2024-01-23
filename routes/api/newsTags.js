const express = require("express");
const router = express.Router();
const NewsTags = require("../../models/NewsTags");


router.get('/newsTags', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [newsTags, count] = await Promise.all([
        NewsTags.find().limit(limit).skip(skip),
        NewsTags.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `newsTags ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(newsTags);
});

router.post('/newsTags', async (req, res) => {
    console.log(req.body.name);
    const { name } = req.body;
    const newsTags = new NewsTags({
        name
    });

    await newsTags.save();

    res.json(newsTags);
});


router.get('/newsTags/:id', async (req, res) => {
    const { id } = req.params;
    const newsTags = await NewsTags.findById(id);

    if (!newsTags) {
        return res.status(404).json({ error: 'Tags not found' });
    }

    res.json(newsTags);
});

router.put("/newsTags/:id", async (req, res) => {
    const { id } = req.params;
    const post = await NewsTags.findByIdAndUpdate(id, req.body);
    res.json(post);
});

router.delete("/newsTags/:id", async (req, res) => {
    const { id } = req.params;
    await NewsTags.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;