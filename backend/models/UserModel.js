const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/db");

const User = db.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

const Profile = db.define(
  "Profile",
  {
    bio: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasOne(Profile, { foreignKey: "userId" });
User.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Profile };
