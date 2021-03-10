module.exports = (sequelize, Sequelize) => {
  const teams = sequelize.define('teams', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team_name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    is_registered: {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    }
  })
  return teams
}
