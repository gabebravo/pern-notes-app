const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// import routes
const notes = require('./routes/notes')

// THIS MUST BE BEFORE THE ROUTES
app.use(bodyParser.json());

// routing middleware >> 2 params >> name of route and routes imported from router
app.use( '/notes', notes );

// THIS MUST BE AFTER THE ROUTES
app.use( (err, req, res, next) => {
  res.json(err);
});

const port = process.env.PORT;
app.listen( port, () => {
  console.log(`Listening on port ${port}`)
})