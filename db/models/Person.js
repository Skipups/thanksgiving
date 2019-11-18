const Sequelize = require("sequelize");
const { db } = require("../connection");
const { STRTING, UUID, UUIDV4 } = Sequelize;

//A person has name and an attending status.
const Person = db.define("person", {
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
  isAttending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});

module.exports = { Person };
