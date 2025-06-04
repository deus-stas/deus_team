const express = require("express");
const router = express.Router();
const Services = require("../../models/Services");
const multer = require("multer");
const path = require("path");
const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const {uploadFile} = require("./file");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newFilename = `${file.originalname}`;
        cb(null, newFilename);
    },
});

const upload = multer({storage: storage});
const addPosition = async (req, res, next) => {
    try {
        // Retrieve the maximum position from the database
        const maxPosition = await Services.findOne()
            .sort('-position') // Sort in descending order to get the maximum position
            .select('position');

        // Calculate the new position value
        const newPosition = maxPosition ? maxPosition.position + 1 : 1;

        // Assign the new position to the req.body
        req.body.position = newPosition;

        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
};

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

router.post('/services', upload.fields([{name: 'serviceBanner'}, {name: 'brief'}]), addPosition, async (req, res) => {
    console.log(req.body);

    const brief = req.files.brief ? req.files.brief[0] : undefined;
    const benefits = !!req.body.benefits && req.body.benefits !== 'undefined' ? JSON.parse(req.body.benefits) : [];
    const work = !!req.body.work && req.body.work !== 'undefined' ? JSON.parse(req.body.work) : [];
    const tariffs = req.body.tariffs && req.body.tariffs !== 'undefined' ? JSON.parse(req.body.tariffs) : [];
    const subProjects = !!req.body.subProjects && req.body.subProjects !== 'undefined' ? JSON.parse(req.body.subProjects) : [];
    const whyChooseUsOptions = req.body.whyChooseUsOptions && req.body.whyChooseUsOptions !== 'undefined' ? JSON.parse(req.body.whyChooseUsOptions) : [];
    const serviceIncludesOptions = req.body.serviceIncludesOptions && req.body.serviceIncludesOptions !== 'undefined' ? JSON.parse(req.body.serviceIncludesOptions) : [];
    const faqOptions = req.body.faqOptions && req.body.faqOptions !== 'undefined' ? JSON.parse(req.body.faqOptions) : [];
    const asproTemplatesOptions = req.body.asproTemplatesOptions && req.body.asproTemplatesOptions !== 'undefined' ? JSON.parse(req.body.asproTemplatesOptions) : [];
    
    const {
        name,
        types,
        descrTotal,
        descr,
        benefitsTitle,
        servicesServices,
        position,
        blockTitle,
        seoTitle,
        seoDescription,
        seoKeywords,
        isInvisible,
        serviceIncludesTitle,
        serviceIncludesDescription,
        faqTitle,
        asproTemplatesTitle,
        asproTemplatesDescription,
    } = req.body;

    var a = {
        "Ё": "YO",
        "Й": "I",
        "Ц": "TS",
        "У": "U",
        "К": "K",
        "Е": "E",
        "Н": "N",
        "Г": "G",
        "Ш": "SH",
        "Щ": "SCH",
        "З": "Z",
        "Х": "H",
        "Ъ": "'",
        "ё": "yo",
        "й": "i",
        "ц": "ts",
        "у": "u",
        "к": "k",
        "е": "e",
        "н": "n",
        "г": "g",
        "ш": "sh",
        "щ": "sch",
        "з": "z",
        "х": "h",
        "ъ": "'",
        "Ф": "F",
        "Ы": "I",
        "В": "V",
        "А": "A",
        "П": "P",
        "Р": "R",
        "О": "O",
        "Л": "L",
        "Д": "D",
        "Ж": "ZH",
        "Э": "E",
        "ф": "f",
        "ы": "i",
        "в": "v",
        "а": "a",
        "п": "p",
        "р": "r",
        "о": "o",
        "л": "l",
        "д": "d",
        "ж": "zh",
        "э": "e",
        "Я": "Ya",
        "Ч": "CH",
        "С": "S",
        "М": "M",
        "И": "I",
        "Т": "T",
        "Ь": "'",
        "Б": "B",
        "Ю": "YU",
        "я": "ya",
        "ч": "ch",
        "с": "s",
        "м": "m",
        "и": "i",
        "т": "t",
        "ь": "'",
        "б": "b",
        "ю": "yu"
    };

    const editedName = name.split('').map(function (char) {
        return a[char] || char;
    }).join("");
    var rmPercent = editedName.replace("%", '');
    var editedWithLine = rmPercent.toLowerCase().split(' ').join('-');

    const path = editedWithLine

    const serviceBanner = req.files.serviceBanner ? req.files.serviceBanner[0] : undefined;

    const services = new Services({
        name,
        types,
        brief,
        description,
        descrTotal,
        descr,
        benefitsTitle,
        whyChooseUsTitle,
        whyChooseUsOptions,
        serviceIncludesTitle,
        serviceIncludesDescription,
        serviceIncludesOptions,
        faqTitle,
        faqOptions,
        benefits,
        servicesServices,
        work,
        tariffs,
        position,
        blockTitle,
        subProjects,
        path,
        seoTitle,
        seoDescription,
        seoKeywords,
        isInvisible,
        asproTemplatesTitle,
        asproTemplatesDescription,
        asproTemplatesOptions,
        serviceBanner,
    });

    await services.save();

    res.json(services);
});


router.get('/services/:id', async (req, res) => {
    const {id} = req.params;
    if (id.includes("-")) {
        const services = await Services.findOne({path: id});

        if (!services) {
            return res.status(404).json({error: 'Services not found'});
        }

        res.json(services);
    } else {
        const services = await Services.findById(id);

        if (!services) {
            return res.status(404).json({error: 'Services not found'});
        }

        res.json(services);
    }
});

router.put("/services/:id", upload.fields([{name: 'serviceBanner'}, {name: 'brief'}]), async (req, res) => {
    try {
        const {id} = req.params;

        const {
            position,
            name,
            types,
            description,
            descrTotal,
            descr,
            benefitsTitle,
            whyChooseUsTitle,
            serviceIncludesTitle,
            serviceIncludesDescription,
            servicesServices,
            blockTitle,
            path,
            seoTitle,
            seoDescription,
            seoKeywords,
            isInvisible,
            faqTitle,
            asproTemplatesTitle,
            asproTemplatesDescription,
        } = req.body;
        const benefits = !!req.body.benefits && req.body.benefits !== 'undefined' && typeof req.body.benefits === 'string'
            ? JSON.parse(req.body.benefits)
            : [];
        const work = !!req.body.work && req.body.work !== 'undefined' && typeof req.body.work === 'string'
            ? JSON.parse(req.body.work)
            : [];

        const tariffs = req.body.tariffs && req.body.tariffs!== 'undefined' ? JSON.parse(req.body.tariffs) : [];
        const whyChooseUsOptions = req.body.whyChooseUsOptions && req.body.whyChooseUsOptions!== 'undefined' ? JSON.parse(req.body.whyChooseUsOptions) : [];
        const serviceIncludesOptions = req.body.serviceIncludesOptions && req.body.serviceIncludesOptions!== 'undefined' ? JSON.parse(req.body.serviceIncludesOptions) : [];
        const faqOptions = req.body.faqOptions && req.body.faqOptions !== 'undefined' ? JSON.parse(req.body.faqOptions) : [];
        const asproTemplatesOptions = req.body.asproTemplatesOptions && req.body.asproTemplatesOptions!== 'undefined' ? JSON.parse(req.body.asproTemplatesOptions) : [];

        const subProjects = !!req.body.subProjects && req.body.subProjects !== 'undefined' && typeof req.body.subProjects === 'string'
            ? JSON.parse(req.body.subProjects)
            : [];

        const service = await Services.findById(id);

        if (!service) {
            return res.status(404).json({error: 'Service not found'});
        }

        const brief = req.files.brief ? req.files.brief[0] : undefined;
        uploadFile(brief, 'brief', service, req, 'brief')

        const oldServicesServices = service.servicesServices;
        service.servicesServices = []; // Clearing the field

        const oldPosition = service.position;
        // var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

        // const editedName = name.split('').map(function (char) {
        //     return a[char] || char;
        // }).join("");
        // var rmPercent = editedName.replace("%",'');
        // var editedWithLine = rmPercent.split(' ').join('-');
        // service.path = editedWithLine
        const serviceBanner = req.files.serviceBanner ? req.files.serviceBanner[0] : undefined;

        if (serviceBanner) {
            if (service.serviceBanner) {
                const path = `uploads/${service.serviceBanner.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

            }
            service.serviceBanner = serviceBanner;
        } else {
            if (service.serviceBanner && service.serviceBanner.path && req.body.serviceBanner !== 'true') {
                const path = `uploads/${service.serviceBanner.filename}`
                if (fs.existsSync(path)) {
                    fs.unlink(path, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });
                }

                service.serviceBanner = null;
            }
        }

        // Update the fields of the service
        service.position = position;
        service.name = name;
        service.types = types;
        service.description = description;
        service.descrTotal = descrTotal;
        service.descr = descr;
        service.benefitsTitle = benefitsTitle;
        service.whyChooseUsTitle = whyChooseUsTitle;
        service.whyChooseUsOptions = whyChooseUsOptions;
        service.serviceIncludesTitle = serviceIncludesTitle;
        service.serviceIncludesDescription = serviceIncludesDescription;
        service.serviceIncludesOptions = serviceIncludesOptions;
        service.faqTitle = faqTitle;
        service.faqOptions = faqOptions;
        service.benefits = benefits;
        service.servicesServices = servicesServices;
        service.work = work;
        service.tariffs = tariffs;
        service.blockTitle = blockTitle;
        service.subProjects = subProjects;
        service.path = path;
        service.isInvisible = isInvisible;
        service.seoTitle = seoTitle;
        service.seoDescription = seoDescription;
        service.seoKeywords = seoKeywords;
        service.asproTemplatesTitle = asproTemplatesTitle,
        service.asproTemplatesDescription = asproTemplatesDescription,
        service.asproTemplatesOptions = asproTemplatesOptions;
        await service.save();

        if (position !== oldPosition) {
            if (position < oldPosition) {
                // Increase the positions of services between position and oldPosition (excluding the current service)
                await Services.updateMany(
                    {position: {$gte: position, $lt: oldPosition}, _id: {$ne: id}},
                    {$inc: {position: 1}}
                );
            } else {
                // Decrease the positions of services between oldPosition and position
                await Services.updateMany(
                    {position: {$gt: oldPosition, $lte: position}, _id: {$ne: id}},
                    {$inc: {position: -1}}
                );
            }
        }

        res.json(service);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.delete("/services/:id", async (req, res) => {
    const {id} = req.params;

    const services = await Services.findByIdAndDelete(id);
    await Services.findByIdAndDelete(id);

    if (!services) {
        return res.status(404).json({success: false, message: "Services not found"});
    }

    const {brief} = services;

    if (brief) {
        fs.unlinkSync(`uploads/${brief.filename}`);
    }

    res.json({success: true});
});

module.exports = router;