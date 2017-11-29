const pool = require('../db');
const { Router } = require('express');
const router = Router();

// get all notes
router.get('/', (req, response, next) => {
  pool.query('SELECT * FROM notes', (err, result) => {
    if(err) { return next(err) }
    response.json(result.rows);
  })
});

// create a new note 
router.post('/', (req, response, next) => {
  const { title, note } = req.body;
  pool.query(
    'INSERT INTO notes(title, note) VALUES($1, $2)', 
    [title, note], 
    (err, result) => {
      if(err) { return next(err) } // passes error to middleware handler
      response.redirect('/notes')
    })
});

// update a note
router.put('/', (req, response, next) => {
  const { id, title, note } = req.body.note;
    pool.query(
      `UPDATE notes SET title=($1), note=($2) WHERE id=($3)`, 
      [title, note, id],
      (err, result) => {
        if(err) { return next(err) }
        pool.query('SELECT * FROM notes', (err, result) => {
          if(err) { return next(err) }
          response.json(result.rows);
        })
    })
});

// delete a note 
router.delete('/', (req, response, next) => {
  const { id } = req.body;
  pool.query('DELETE FROM notes WHERE id=($1)', [id], (err, result) => {
    if(err) { return next(err) } // passes error to middleware handler
    pool.query('SELECT * FROM notes', (err, result) => {
      if(err) { return next(err) }
      response.json(result.rows);
    })
  })
});

module.exports = router;