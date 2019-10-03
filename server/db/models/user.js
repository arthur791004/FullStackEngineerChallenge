const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

const secureUser = user => {
  const { password } = user;
  if (!password) {
    return;
  }

  user.password = bcrypt.hashSync(password, bcrypt.genSaltSync()); // eslint-disable-line no-param-reassign
};

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
    },
    {
      sequelize,
      hooks: {
        beforeSave: user => {
          secureUser(user);
        },
      },
    }
  );

  return User;
};
