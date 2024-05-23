//=======================================================================================================================================
//TODO: GET /api/notes should read the db.json file and return all saved notes as JSON.

//TODO: POST /api/notes 
        // should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
        // You'll need to find a way to give each note a unique id when it's saved 
        // (look into npm packages that could do this for you).
//=======================================================================================================================================

const express = require('express');
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const db = path.join(__dirname, '../db/db.json');

// Middleware to parse JSON bodies
router.use(express.json());


//=======================================================================================================================================
// GET /api/notes should read the db.json file and return all saved notes as JSON.
//=======================================================================================================================================

router.get('/', (req, res) => {
  fs.readFile(db, 'utf8', (err, data) => {

    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const notes = JSON.parse(data);
      res.json(notes);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).send('Internal Server Error');
    }

    });
  });

//=======================================================================================================================================
// POST /api/notes 
        // should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
        // You'll need to find a way to give each note a unique id when it's saved 
        // (look into npm packages that could do this for you).
//=======================================================================================================================================

router.post('/', (req, res) => {
  const newNote = req.body;
  newNote.id = uuidv4();

  fs.readFile(db, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading db.json:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    try {
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(db, JSON.stringify(notes, null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error writing to db.json:', writeErr);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(201).json(newNote);
      });
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      res.status(500).send('Internal Server Error');
    }
  });
});


  module.exports = router;