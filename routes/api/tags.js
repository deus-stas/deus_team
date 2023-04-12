const express = require("express");
const router = express.Router();
const Tags = require("../../models/Tags");


router.get('/tags', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);
  
    const [tags, count] = await Promise.all([
      Tags.find().limit(limit).skip(skip),
      Tags.countDocuments()
    ]);
  
    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `tags ${rangeStart}-${rangeEnd}/${count}`;
  
    res.set('Content-Range', contentRange);
    res.json(tags);
  });

router.post('/tags', async (req, res) => {
    const { name } = req.body;
    try {
        const tag = await Tags.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create tag' });
    }
});


router.get('/tags/:id', async (req, res) => {
    const { id } = req.params;
    const tags = await Tags.findById(id);

    if (!tags) {
        return res.status(404).json({ error: 'Tags not found' });
    }

    res.json(tags);
});

router.put("/tags/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Tags.findByIdAndUpdate(id, req.body);
    res.json(post);
});

router.delete("/tags/:id", async (req, res) => {
    const { id } = req.params;
    await Tags.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;