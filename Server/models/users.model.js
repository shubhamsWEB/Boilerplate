module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define('users', {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue:Sequelize.UUIDV4
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    image_url: {
      type: Sequelize.TEXT
    },
    phone_number: {
      type: Sequelize.BIGINT
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    latitude: {
      type: Sequelize.FLOAT
    },
    longitude: {
      type: Sequelize.FLOAT
    },
    joinedOn: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Dob: {
      type: Sequelize.DATE
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
      defaultValue:false
    }
  })
  return users
}
