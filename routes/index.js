const router = require('express').Router();


// Import Routers for /notes and /html
const htmlRouter = require('./html');
const notesRouter = require('./notes');


router.use('/', htmlRouter);
router.use('/api/notes', notesRouter);

module.exports = router; 