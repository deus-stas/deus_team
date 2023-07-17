const express = require("express");
const router = express.Router();
const Services = require("../../models/Services");


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
      res.status(500).json({ error: 'Internal server error' });
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

router.post('/services', addPosition, async (req, res) => {
    console.log(req.body);
    const { name,
        descrTotal,
        descr,
        benefitsTitle,
        benefits,
        servicesServices,
        work,
        tariffs,
        position,
        blockTitle,
        subProjects } = req.body;

    var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

    const editedName = name.split('').map(function (char) { 
        return a[char] || char; 
    }).join("");
    var rmPercent = editedName.replace("%",'');
    var editedWithLine = rmPercent.split(' ').join('-');

    const path = editedWithLine

    const services = new Services({
        name,
        descrTotal,
        descr,
        benefitsTitle,
        benefits,
        servicesServices,
        work,
        tariffs,
        position,
        blockTitle,
        subProjects,
        path
    });

    await services.save();

    res.json(services);
});


router.get('/services/:id', async (req, res) => {
    const { id } = req.params;
    if (id.includes("-")) {
        const services = await Services.findOne({ path: id });
        console.log("srvcs", services)
        
        if (!services) {
            return res.status(404).json({ error: 'Services not found' });
        }

        res.json(services);
    } else {
        const services = await Services.findById(id);

        if (!services) {
            return res.status(404).json({ error: 'Services not found' });
        }

        res.json(services);
    }
});

router.put("/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { position, name, descrTotal, descr, benefitsTitle, benefits, servicesServices, work, tariffs, blockTitle, subProjects, path } = req.body;
  
      const service = await Services.findById(id);
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }


      const oldServicesServices = service.servicesServices;
      console.log("old", oldServicesServices)
      service.servicesServices = []; // Clearing the field
  
      const oldPosition = service.position;
      // var a = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"A","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};

      // const editedName = name.split('').map(function (char) { 
      //     return a[char] || char; 
      // }).join("");
      // var rmPercent = editedName.replace("%",'');
      // var editedWithLine = rmPercent.split(' ').join('-');
      // service.path = editedWithLine
  
      // Update the fields of the service
      service.position = position;
      service.name = name;
      service.descrTotal = descrTotal;
      service.descr = descr;
      service.benefitsTitle = benefitsTitle;
      service.benefits = benefits;
      service.servicesServices = servicesServices;
      service.work = work;
      service.tariffs = tariffs;
      service.blockTitle = blockTitle;
      service.subProjects = subProjects;
      service.path = path;

      

      console.log("new", servicesServices)
  
      await service.save();
  
      if (position !== oldPosition) {
        if (position < oldPosition) {
          // Increase the positions of services between position and oldPosition (excluding the current service)
          await Services.updateMany(
            { position: { $gte: position, $lt: oldPosition }, _id: { $ne: id } },
            { $inc: { position: 1 } }
          );
        } else {
          // Decrease the positions of services between oldPosition and position
          await Services.updateMany(
            { position: { $gt: oldPosition, $lte: position }, _id: { $ne: id }  },
            { $inc: { position: -1 } }
          );
        }
      }
  
      res.json(service);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  



router.delete("/services/:id", async (req, res) => {
    const { id } = req.params;
    await Services.findByIdAndDelete(id);
    res.json({ success: true });
});

module.exports = router;