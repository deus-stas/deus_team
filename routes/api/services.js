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
        position } = req.body;
    const services = new Services({
        name,
        descrTotal,
        descr,
        benefitsTitle,
        benefits,
        servicesServices,
        work,
        tariffs,
        position
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

// router.put("/services/:id", async (req, res) => {
//     const { id } = req.params;
//     const post = await Services.findByIdAndUpdate(id, req.body);
//     res.json(post);
// });

router.put("/services/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { position, name, descrTotal, descr, benefitsTitle, benefits, servicesServices, work, tariffs } = req.body;
  
      const service = await Services.findById(id);
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }


      const oldServicesServices = service.servicesServices;
      console.log("old", oldServicesServices)
      service.servicesServices = []; // Clearing the field
  
      const oldPosition = service.position;
  
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