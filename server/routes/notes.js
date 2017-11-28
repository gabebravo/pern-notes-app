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
router.put('/:id', (req, response, next) => {
  const { id } = req.params;
  const keys = [ 'title', 'note' ];
  const fields = [];

  keys.forEach( key => {
    if( req.body[key] ) {
      fields.push(key)
    }
  })

  fields.forEach( (field, index) => {
    pool.query(
      `UPDATE notes SET ${field}=($1) WHERE id =($2)`, 
      [req.body[field], id],
      (err, result) => {
        if(err) { return next(err) }
        if(index === (fields.length - 1)){
          response.redirect('/notes')
        }
    })
  })
});

// delete a note 
router.delete('/:id', (req, response, next) => {
  const { id } = req.params;
  pool.query('DELETE FROM notes WHERE id=($1)', [id], (err, result) => {
    if(err) { return next(err) } // passes error to middleware handler
    response.redirect('/notes')
  })
});

module.exports = router;