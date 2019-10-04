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
  class Users extends Model {
    get(...args) {
      const user = super.get(...args);

      // delete password if get all user properties
      if (args.length === 0) {
        delete user.password;
      }

      return user;
    }

    checkPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  Users.init(
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

  Users.associate = models => {
    Users.hasMany(models.Reviews, { foreignKey: 'reviewerId', as: 'reviews' });
    Users.belongToMany(models.Reviews, {
      foreignKey: 'revieweeId',
      as: 'feedbacks',
    });
  };

  return Users;
};
