const dbConfig = require('./db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize.authenticate();

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

// sequelize tables
db.users = require('../models/users.model')(sequelize, Sequelize);

db.teams = require('../models/teams.model')(sequelize, Sequelize);

db.matches = require('../models/matches.model')(sequelize, Sequelize);

db.players = require('../models/players.model')(sequelize, Sequelize);

db.playersdata = require('../models/playersdata.model')(sequelize, Sequelize);

db.matchdata = require('../models/matchdata.model')(sequelize, Sequelize);

db.ballsdata = require('../models/ballsdata.model')(sequelize, Sequelize);

db.subscriptions = require('../models/subscriptions.model')(
  sequelize,
  Sequelize
);
// table assosiations

// db.teams.belongsTo(db.users,)
db.users.hasMany(db.teams, {
  foreignKey: 'ownerId',
});

// db.players.belongsTo(db.teams,{as: 'team' })
db.teams.hasMany(db.players, {
  foreignKey: 'teamId',
});

// db.matches.belongsTo(db.users,{as: 'admin' })
db.users.hasMany(db.matches, {
  foreignKey: 'adminId',
});

// db.playersdata.belongsTo(db.matches,{as: 'match' })
db.matches.hasMany(db.playersdata, {
  foreignKey: 'matchId',
});

// db.playersdata.belongsTo(db.players,{as: 'player' })
db.players.hasMany(db.playersdata, {
  foreignKey: 'playerId',
});

db.matches.hasOne(db.matchdata, { foreignKey: 'matchId' });
db.matchdata.belongsTo(db.matches, {
  as: 'match',
});

// db.matchdata.belongsTo(db.playersdata,{as: 'stricker' })
db.playersdata.hasMany(db.matchdata, {
  foreignKey: 'strickerId',
});

// db.matchdata.belongsTo(db.playersdata,{as: 'non_stricker' })
db.playersdata.hasMany(db.matchdata, {
  foreignKey: 'nonStrickerId',
});

// db.matchdata.belongsTo(db.playersdata,{as: 'bowler' })
db.playersdata.hasMany(db.matchdata, {
  foreignKey: 'bowlerId',
});

// db.ballsdata.belongsTo(db.matches,{as: 'match' })
db.matches.hasMany(db.ballsdata, {
  foreignKey: 'matchId',
});

db.users.hasMany(db.subscriptions, {
  foreignKey: 'userId',
});

db.matches.hasMany(db.subscriptions, {
  foreignKey: 'matchId',
});

module.exports = db;
