const express = require("express");
const router = express.Router();
const Themes = require("../../models/Themes");


router.get('/themes', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [themes, count] = await Promise.all([
        Themes.find().limit(limit).skip(skip),
        Themes.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `themes ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(themes);
});

router.post('/themes', async (req, res) => {
    console.log(req.body.name);
    const { name, href } = req.body;
    const themes = new Themes({
        name,
        href
    });

    await themes.save();

    res.json(themes);
});


router.get('/themes/:id', async (req, res) => {
    const { id } = req.params;
    const themes = await Themes.findById(id);

    if (!themes) {
        return res.status(404).json({ error: 'Themes not found' });
    }

    res.json(themes);
});

router.put("/themes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, href } = req.body;

        if (!name || !href) {
            return res.status(400).json({ error: "Name and href are required" });
        }

        const updatedTheme = await Themes.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedTheme) {
            return res.status(404).json({ error: "Theme not found" });
        }

        res.json(updatedTheme);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
});

router.delete("/themes/:id", async (req, res) => {
    const { id } = req.params;
    await Themes.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;