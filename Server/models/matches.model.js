module.exports = (sequelize, Sequelize) => {
  const matches = sequelize.define('matches', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    match_name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    team_a_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    team_b_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    max_overs: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    venue: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    start_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW 
    },
    result: {
      type: Sequelize.TEXT,
      defaultValue: 'Match yet to start'
    },
    toss: {
      type: Sequelize.TEXT,
      defaultValue: 'Waiting for toss'
    },
    isCompleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    }
  })
  return matches
}
