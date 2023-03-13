const express = require('express');
const router = express.Router();

// Load test model
const Test = require('../../models/Test');

// @route GET api/test/
// @description test route
// @access Public
router.get('/test', (req, res) => res.send('test route testing!'));

// @route GET api/test
// @description Get all test
// @access Public
router.get('/', (req, res) => {
  Test.find()
    .then(test => res.json(test))
    .catch(err => res.status(404).json({ notestfound: 'No test found' }));
});

// @route GET api/test
// @description add/save test
// @access Public
router.post('/', (req, res) => {
  Test.create(req.body)
    .then(test => res.json({ msg: 'test added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this test' }));
});

// @route GET api/test/:id
// @description Delete test by id
// @access Public
router.delete('/:id', (req, res) => {
  Test.findByIdAndRemove(req.params.id, req.body)
    .then(test => res.json({ mgs: 'test entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a test' }));
});


module.exports = router;