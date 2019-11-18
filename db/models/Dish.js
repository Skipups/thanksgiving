const Sequelize = require("sequelize");
const { db } = require("../connection");
const { STRING, UUID, UUIDV4 } = Sequelize;

//A dish has name and description.
const Dish = db.define("dish", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

module.exports = { Dish };
