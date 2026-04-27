import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Overtime = db.define("overtime", {
  workerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true
});

export default Overtime;