const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const db = require('./configs/db');
const cookieSession = require('cookie-session');
const flash = require('express-flash');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();
require('./passport-local');
// app instance of express
const app = express();
const fs = require('fs')
// cors config
const corsOptions = {
  credentials: true,
  origin: true,
};
app.use('*', cors(corsOptions));
app.all('*', (req, res, next) => {
  let origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// For an actual app you should configure this with an experation time, better keys, proxy and secure
app.use(
  cookieSession({
    name: 'client-session',
    keys: ['key1', 'key2'],
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    sameSite:'none',
    secure:true
  })
);

app.use(flash());
// app.use(express.static(path.join(__dirname,'build')));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// passport
app.use(passport.initialize());
app.use(passport.session());

// const server = http.createServer({
//   key: fs.readFileSync(path.join(__dirname,'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname,'cert.pem'))
// },app);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    credentials: true,
    origin: 'http://localhost:3001',
  },
});
//io.set('transports', ['websocket']);

const socketConfig = require('./sockets');
socketConfig.socketConfig(io);

// db.sequelize.sync({
//   force: true,
// });

db.sequelize.sync();

// app.get(/^(?!\/?api).+$/, (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/', (req, res) => {
  res.send('Hello Crickboard');
});

require('./routes/user.routes')(app);
require('./routes/match.routes')(app);
require('./routes/ballsdata.routes')(app);
require('./routes/teams.routes')(app);
require('./routes/player.routes')(app);
require('./routes/playerdata.routes')(app);
require('./routes/creatematch.routes')(app);
require('./routes/matchdata.routes')(app);
require('./routes/livematch.routes')(app);
require('./routes/toss.routes')(app);
require('./routes/subscriptions.routes')(app);

module.exports = server;
