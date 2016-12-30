const express = require('express'),
      http = require('http'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      app = express(),
      router = require('./router'),
      mongoose = require('mongoose');
// Db Setup
mongoose.connect('mongodb://localhost:auth/auth');
// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));

router(app);

// Server Setup
const port = process.env.PORT || 3090,
      server = http.createServer(app);

server.listen(port, () => {
  console.log('Listening on port: ' + port);
})
