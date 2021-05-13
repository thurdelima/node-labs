const express = require('express');

const routes = express.Router();

// const { Address } = require('./models');

const AddressController = require('./controllers/AddressController');
const LabController = require('./controllers/LabController');
const ExamController = require('./controllers/ExamController');
const ExamToLabsController = require('./controllers/ExamToLabsController');

routes.get('/', (req, res) => res.json('hello thurdelima'));

routes.get('/address', AddressController.index);
routes.post('/address', AddressController.store);

routes.post('/lab', LabController.store);
routes.put('/lab/:id', LabController.update);
routes.delete('/lab/:id', LabController.delete);
routes.get('/labs', LabController.index);

routes.post('/exam', ExamController.store);
routes.get('/exam', ExamController.index);
routes.put('/exam/:id', ExamController.update);
routes.delete('/exam/:id', ExamController.delete);

routes.get('/examlabs', ExamToLabsController.index);
routes.get('/examlabs/:exam', ExamToLabsController.searchExam);
routes.post('/associate', ExamToLabsController.associate);
routes.delete('/disassociate', ExamToLabsController.disassociate);


module.exports = routes;
