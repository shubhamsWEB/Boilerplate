module.exports = (sequelize, Sequelize) => {
  const matchdata = sequelize.define('matchdata', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    current_batting_team: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    current_bowling_team: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    current_innings: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    team_a_score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    team_a_overs: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    team_a_wickets: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    team_b_wickets: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    team_b_overs: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    team_b_score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    score: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    wickets: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    overs: {
      type: Sequelize.FLOAT,
      defaultValue: 0.0
    },
    isCompleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }

  })
  return matchdata
}
