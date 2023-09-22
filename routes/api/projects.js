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

const addCustomId = async (req, res, next) => {
    try {
        const CustomIdProjects = await Projects.find();
        let maxCustomId = -1;
        for (let index = 0; index < CustomIdProjects.length; index++) {
            if( parseInt(CustomIdProjects[index].customId) > maxCustomId)
            maxCustomId = parseInt(CustomIdProjects[index].customId);
        }
        const newCustomId = maxCustomId ? `${parseInt(maxCustomId) + 1}` : `1`;
        req.body = {
            ...req.body,
            customId: newCustomId,
        };

        next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};


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

router.post(
    '/projects',
    upload.fields([
        { name: 'image' },
        { name: 'bannerFirst' },
        { name: 'bannerSecond' },
        { name: 'bannerSeconds' },
        { name: 'approachListFiles' },
        { name: 'bannerThird' },
        { name: 'bannerThirds' },
        { name: 'bannerFourth' },
        { name: 'bannerFourths' },
        { name: 'bannerFifth' },
        { name: 'bannerFifths' },
        { name: 'imagesExtra' },
        { name: 'mainVideoFile' }]),
    addCustomId,
    async (req, res) => {
    const { name, mainVideo, color, about, task, taskDescr, approach, body, result, taskPersons, approachPersons, resultPersons, main, projectTheme, projectType, bannerFirstVideo, bannerSecondVideo, bannerThirdVideo, bannerFourthVideo, bannerFifthVideo, bannerText, controlURL, projectURL, projectSite, aimColor, workStepsColor, visibilityTitle1, visibilityTitle2, resultsColor,customId, workStepsHeader,resultPersonsText, resultTextColor, technologies, visibility } = req.body;
    const tasksList = JSON.parse(req.body.tasksList);
    const workSteps = JSON.parse(req.body.workSteps);
    const approachList = !!req.body.approachList ? JSON.parse(req.body.approachList) : [];

    var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    const editedName = name.split('').map(function (char) {
        return a[char] || char;
    }).join("");
    var rmPercent = editedName.replace("%",'');
    var editedWithLine = rmPercent.split(' ').join('-');

    const nameInEng = editedWithLine


    // console.log(tasksList);
    // console.log('workSteps', workSteps);
    // console.log(req.files);
    // console.log(req.body);
    console.log('inside', req.body.customId);
    let bannerFirst, bannerSecond, bannerSeconds,approachListFiles, bannerThird, bannerThirds, bannerFourth, bannerFourths, bannerFifth, bannerFifths, imagesExtra, mainVideoFile, visibilityImg1, visibilityImg2;

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

    if (req.files.bannerSeconds) {
        bannerSeconds = req.files.bannerSeconds;
    }
    if (req.files.approachListFiles) {
        approachListFiles = req.files.approachListFiles;
    }

    if (req.files.bannerThirds) {
        bannerThirds = req.files.bannerThirds;
    }

    if (req.files.bannerFourths) {
        bannerFourths = req.files.bannerThirds;
    }

    if (req.files.bannerFifths) {
        bannerFifths = req.files.bannerThirds;
    }

    if (req.files.mainVideoFile) {
        mainVideoFile = req.files.mainVideoFile[0];
    }

    if (req.files.visibilityImg1) {
        visibilityImg1 = req.files.visibilityImg1[0];
    }

    if (req.files.visibilityImg2) {
        visibilityImg2 = req.files.visibilityImg2[0];
    }

    const image = req.files.image[0];

    const projects = new Projects({
        name,
        image,
        mainVideo,
        color,
        about,
        bannerFirstVideo,
        bannerSecondVideo,
        bannerThirdVideo,
        bannerFourthVideo,
        bannerFifthVideo,
        bannerFirst,
        bannerSecond,
        bannerSeconds,
        approachListFiles,
        bannerThird,
        bannerThirds,
        bannerFourth,
        bannerFourths,
        bannerFifth,
        bannerFifths,
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
        imagesExtra,
        bannerText,
        controlURL,
        projectURL,
        projectSite,
        mainVideoFile,
        workSteps,
        aimColor,
        workStepsColor,
        visibilityTitle1,
        visibilityTitle2,
        visibilityImg1,
        visibilityImg2,
        resultsColor,
        customId,
        nameInEng,
        workStepsHeader,
        resultPersonsText,
        resultTextColor,
        technologies,
        visibility,
        approachList
    });

    await projects.save();

    res.json(projects);
});

router.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    if (id.includes("-")) {
        const projects = await Projects.findOne({ nameInEng: id });
        console.log("pr", projects)

        if (!projects) {
            return res.status(404).json({ error: 'projects not found' });
        }

        res.json(projects);
    } else {
        const projects = await Projects.findById(id);

        if (!projects) {
            return res.status(404).json({ error: 'projects not found' });
        }

        res.json(projects);
    }
    // const projects = await Projects.findById(nameInEng);

});
router.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const projects = await Projects.findById(id);


    if (!projects) {
        return res.status(404).json({ error: 'projects not found' });
    }

    res.json(projects);
});

router.put("/projects/:id",
    upload.fields([
        { name: 'image' },
        { name: 'bannerFirst' },
        { name: 'bannerSecond' },
        { name: 'bannerSeconds' },
        { name: 'approachListFiles' },
        { name: 'bannerThird' },
        { name: 'bannerThirds' },
        { name: 'bannerFourth' },
        { name: 'bannerFourths' },
        { name: 'bannerFifth' },
        { name: 'bannerFifths' },
        { name: 'imagesExtra' },
        { name: 'mainVideoFile' },
        { name: 'visibilityImg1'},
        { name: 'visibilityImg2'}
    ]), async (req, res) => {
    const { id } = req.params;
    const project = await Projects.findById(id);

    if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
    }
    console.log(req.body);
    console.log(req.files);

    const { name, mainVideo, color, about, task, taskDescr, approach, body, result, taskPersons, approachPersons, resultPersons, main, projectTheme, projectType, bannerFirstVideo, bannerSecondVideo, bannerThirdVideo, bannerFourthVideo, bannerFifthVideo, bannerText, controlURL, projectURL, projectSite, aimColor, workStepsColor, visibilityTitle1, visibilityTitle2,resultsColor,customId, nameInEng, workStepsHeader, resultPersonsText,resultTextColor, technologies, visibility } = req.body;

    const tasksList = JSON.parse(req.body.tasksList);
    const workSteps = JSON.parse(req.body.workSteps);
    const approachList = JSON.parse(req.body.approachList);

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

        if (req.files.bannerSeconds) {
            if (project.bannerSeconds && project.bannerSeconds.length > 0) {
                project.bannerSeconds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerSeconds = req.files.bannerSeconds;
        } else {
            if (project.bannerSeconds && project.bannerSeconds.length > 0) {
                project.bannerSeconds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerSeconds = null;
            }
        }
        if (req.files.approachListFiles) {
            if (project.approachListFiles && project.approachListFiles.length > 0) {
                project.approachListFiles.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.approachListFiles = req.files.approachListFiles;
        } else {
            if (project.approachListFiles && project.approachListFiles.length > 0) {
                project.approachListFiles.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.approachListFiles = null;
            }
        }

        if (req.files.bannerThirds) {
            if (project.bannerThirds && project.bannerThirds.length > 0) {
                project.bannerThirds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerThirds = req.files.bannerThirds;
        } else {
            if (project.bannerThirds && project.bannerThirds.length > 0) {
                project.bannerThirds.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerThirds = null;
            }
        }

        if (req.files.bannerFourths) {
            if (project.bannerFourths && project.bannerFourths.length > 0) {
                project.bannerFourths.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerFourths = req.files.bannerFourths;
        } else {
            if (project.bannerFourths && project.bannerFourths.length > 0) {
                project.bannerFourths.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerFourths = null;
            }
        }

        if (req.files.bannerFifths) {
            if (project.bannerFifths && project.bannerFifths.length > 0) {
                project.bannerFifths.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
            }
            project.bannerFifths = req.files.bannerFifths;
        } else {
            if (project.bannerFifths && project.bannerFifths.length > 0) {
                project.bannerFifths.forEach((image) => {
                    fs.unlink(image.path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                });
                project.bannerFifths = null;
            }
        }

    if (req.files.mainVideoFile) {
        if (project.mainVideoFile) {
            fs.unlink(project.mainVideoFile.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.mainVideoFile = req.files.mainVideoFile[0];
    } else {
        if (project.mainVideoFile && project.mainVideoFile.path && req.body.mainVideoFile !== 'true') {
            fs.unlink(project.mainVideoFile.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.mainVideoFile = null;
        }
    }

    if (req.files.visibilityImg1) {
        if (project.visibilityImg1) {
            fs.unlink(project.visibilityImg1.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.visibilityImg1 = req.files.visibilityImg1[0];
    } else {
        if (project.visibilityImg1 && project.visibilityImg1.path && req.body.visibilityImg1 !== 'true') {
            fs.unlink(project.visibilityImg1.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.visibilityImg1 = null;
        }
    }

    if (req.files.visibilityImg2) {
        if (project.visibilityImg2) {
            fs.unlink(project.visibilityImg2.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
        project.visibilityImg2 = req.files.visibilityImg2[0];
    } else {
        if (project.visibilityImg2 && project.visibilityImg2.path && req.body.visibilityImg2 !== 'true') {
            fs.unlink(project.visibilityImg2.path, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            project.visibilityImg2 = null;
        }
    }

    project.name = name;
    // var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    // const editedName = name.split('').map(function (char) {
    //     return a[char] || char;
    // }).join("");
    // var rmPercent = editedName.replace("%",'');
    // var editedWithLine = rmPercent.split(' ').join('-');
    project.nameInEng = nameInEng;
    project.mainVideo = mainVideo;
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
    project.bannerText = bannerText,
    project.controlURL = controlURL,
    project.projectURL = projectURL,
    project.projectSite = projectSite,
    project.workSteps = workSteps,
    project.aimColor = aimColor,
    project.workStepsColor = workStepsColor,
    project.visibilityTitle1 = visibilityTitle1,
    project.visibilityTitle2 = visibilityTitle2,
    project.resultsColor = resultsColor,
    project.customId = customId,
    project.workStepsHeader = workStepsHeader,
    project.resultPersonsText = resultPersonsText,
    project.resultTextColor = resultTextColor,
    project.technologies = technologies,
    project.visibility = visibility,
    project.approachList = approachList

    await project.save();

    res.json(project);
});

router.delete("/projects/:id", async (req, res) => {
    const { id } = req.params;
    const project = await Projects.findByIdAndDelete(id);
    if (!project) {
        return res.status(404).json({ success: false, message: "Project not found" });
    }

    const { image, bannerFirst, bannerSecond, bannerSeconds,approachListFiles, bannerThird, bannerThirds, bannerFourth, bannerFourths, bannerFifth, bannerFifths, imagesExtra, mainVideoFile, visibilityImg1, visibilityImg2 } = project;

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

    if (bannerSeconds) {
        bannerSeconds.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }
    if (approachListFiles) {
        approachListFiles.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }
    if (bannerThirds) {
        bannerThirds.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }

    if (bannerFourths) {
        bannerFourths.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }

    if (bannerFifths) {
        bannerFifths.forEach((image) => {
            fs.unlinkSync(`uploads/${image.filename}`);
        });
    }

    if (mainVideoFile) {
        fs.unlinkSync(`uploads/${mainVideoFile.filename}`);
    }

    if (visibilityImg1) {
        fs.unlinkSync(`uploads/${visibilityImg1.filename}`);
    }

    if (visibilityImg2) {
        fs.unlinkSync(`uploads/${visibilityImg2.filename}`);
    }

    res.json({ success: true });
});


module.exports = router;