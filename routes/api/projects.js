const express = require("express");
const router = express.Router();
const multer = require("multer");
const Projects = require("../../models/Projects");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

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

router.get('/projects', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);

    const [projects, count] = await Promise.all([
        Projects.find().limit(limit).skip(skip),
        Projects.countDocuments()
    ]);

    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `projects ${rangeStart}-${rangeEnd}/${count}`;

    res.set('Content-Range', contentRange);
    res.json(projects);
});

router.post('/projects', upload.fields([{ name: 'image' }, { name: 'bannerFirst' }, { name: 'bannerSecond' }, { name: 'bannerThird' }, { name: 'bannerFourth' }, { name: 'bannerFifth' }, { name: 'imagesExtra' }]), async (req, res) => {
    const { name, color, about, task, taskDescr, approach, body, result, taskPersons, approachPersons, resultPersons, main, projectTheme, projectType, bannerFirstVideo, bannerSecondVideo, bannerThirdVideo, bannerFourthVideo, bannerFifthVideo } = req.body;
    const tasksList = JSON.parse(req.body.tasksList);

    console.log(tasksList);
    console.log(req.files);
    console.log(req.body);
    let bannerFirst, bannerSecond, bannerThird, bannerFourth, bannerFifth, imagesExtra;

    if (req.files.bannerFirst) {
        bannerFirst = req.files.bannerFirst[0];
    }

    if (req.files.bannerSecond) {
        bannerSecond = req.files.bannerSecond[0];
    }

    if (req.files.bannerThird) {
        bannerThird = req.files.bannerThird[0];
    }

    if (req.files.bannerFourth) {
        bannerFourth = req.files.bannerFourth[0];
    }

    if (req.files.bannerFifth) {
        bannerFifth = req.files.bannerFifth[0];
    }

    if (req.files.imagesExtra) {
        imagesExtra = req.files.imagesExtra;
    }

    const image = req.files.image[0];

    const projects = new Projects({
        name,
        image,
        color,
        about,
        bannerFirstVideo,
        bannerSecondVideo,
        bannerThirdVideo,
        bannerFourthVideo,
        bannerFifthVideo,
        bannerFirst,
        bannerSecond,
        bannerThird,
        bannerFourth,
        bannerFifth,
        task,
        taskDescr,
        tasksList,
        approach,
        body,
        result,
        taskPersons,
        approachPersons,
        resultPersons,
        main,
        projectTheme,
        projectType,
        imagesExtra
    });

    await projects.save();

    res.json(projects);
});


router.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const projects = await Projects.findById(id);

    if (!projects) {
        return res.status(404).json({ error: 'projects not found' });
    }

    res.json(projects);
});

router.put("/projects/:id", upload.fields([{ name: 'image' }, { name: 'bannerFirst' }, { name: 'bannerSecond' }, { name: 'bannerThird' }, { name: 'bannerFourth' }, { name: 'bannerFifth' }, { name: 'imagesExtra' }]), async (req, res) => {
    const { id } = req.params;
    const project = await Projects.findById(id);

    if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
    }
    console.log(req.body);
    console.log(req.files);

    const { name, color, about, task, taskDescr, approach, body, result, taskPersons, approachPersons, resultPersons, main, projectTheme, projectType, bannerFirstVideo, bannerSecondVideo, bannerThirdVideo, bannerFourthVideo, bannerFifthVideo } = req.body;

    const tasksList = JSON.parse(req.body.tasksList);

    if (req.files.image) {
        project.image = req.files.image[0];
    }

    if (req.files.bannerFirst) {
        if (project.bannerFirst) {
            fs.unlink(project.bannerFirst.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.bannerFirst = req.files.bannerFirst[0];
    } else {
        if (project.bannerFirst && project.bannerFirst.path && req.body.bannerFirst !== 'true') {
            fs.unlink(project.bannerFirst.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.bannerFirst = null;
        }
    }

    if (req.files.bannerSecond) {
        if (project.bannerSecond) {
            fs.unlink(project.bannerSecond.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.bannerSecond = req.files.bannerSecond[0];
    } else {
        if (project.bannerSecond && project.bannerSecond.path && req.body.bannerSecond !== 'true') {
            fs.unlink(project.bannerSecond.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.bannerSecond = null;
        }
    }

    if (req.files.bannerThird) {
        if (project.bannerThird) {
            fs.unlink(project.bannerThird.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.bannerThird = req.files.bannerThird[0];
    } else {
        if (project.bannerThird && project.bannerThird.path && req.body.bannerThird !== 'true') {
            fs.unlink(project.bannerThird.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.bannerThird = null;
        }
    }

    if (req.files.bannerFourth) {
        if (project.bannerFourth) {
            fs.unlink(project.bannerFourth.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.bannerFourth = req.files.bannerFourth[0];
    } else {
        if (project.bannerFourth && project.bannerFourth.path && req.body.bannerFourth !== 'true') {
            fs.unlink(project.bannerFourth.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.bannerFourth = null;
        }
    }

    if (req.files.bannerFifth) {
        if (project.bannerFifth) {
            fs.unlink(project.bannerFifth.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.bannerFifth = req.files.bannerFifth[0];
    } else {
        if (project.bannerFifth && project.bannerFifth.path && req.body.bannerFifth !== 'true') {
            fs.unlink(project.bannerFifth.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.bannerFifth = null;
        }
    }

    if (req.files.imagesExtra) {
        if (project.imagesExtra && project.imagesExtra.length > 0) {
            project.imagesExtra.forEach((image) => {
                fs.unlink(image.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
        }
        project.imagesExtra = req.files.imagesExtra;
    } else {
        if (project.imagesExtra && project.imagesExtra.length > 0) {
            project.imagesExtra.forEach((image) => {
                fs.unlink(image.path, (err) => {
                    if (err) {
                        console.error(err);
                    }
                });
            });
            project.imagesExtra = null;
        }
    }

    project.name = name;
    project.color = color;
    project.about = about;
    project.task = task;
    project.bannerFirstVideo = bannerFirstVideo;
    project.bannerSecondVideo = bannerSecondVideo;
    project.bannerThirdVideo = bannerThirdVideo;
    project.bannerFourthVideo = bannerFourthVideo;
    project.bannerFifthVideo = bannerFifthVideo;
    project.taskDescr = taskDescr;
    project.tasksList = tasksList;
    project.approach = approach;
    project.body = body;
    project.result = result;
    project.taskPersons = taskPersons;
    project.projectTheme = projectTheme;
    project.projectType = projectType;
    project.approachPersons = approachPersons;
    project.resultPersons = resultPersons;
    project.main = main;

    await project.save();

    res.json(project);
});

router.delete("/projects/:id", async (req, res) => {
    const { id } = req.params;
    const project = await Projects.findByIdAndDelete(id);
    if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
    }

    const { image, bannerFirst, bannerSecond, bannerThird, bannerFourth, bannerFifth, imagesExtra } = project;

    // Проверяем каждое изображение и удаляем его, если оно существует
    if (image) {
        fs.unlinkSync(`uploads/${image.filename}`);
    }
    if (bannerFirst) {
        fs.unlinkSync(`uploads/${bannerFirst.filename}`);
    }
    if (bannerSecond) {
        fs.unlinkSync(`uploads/${bannerSecond.filename}`);
    }
    if (bannerThird) {
        fs.unlinkSync(`uploads/${bannerThird.filename}`);
    }
    if (bannerFourth) {
        fs.unlinkSync(`uploads/${bannerFourth.filename}`);
    }
    if (bannerFifth) {
        fs.unlinkSync(`uploads/${bannerFifth.filename}`);
    }

    if (imagesExtra) {
        imagesExtra.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }

    res.json({ success: true });
});


module.exports = router;