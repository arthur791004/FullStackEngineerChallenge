const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const secureUser = require('../utils/secureUser');

module.exports = (sequelize, DataTypes) => {
  class Users extends Sequelize.Model {
    get(options) {
      const user = super.get(options);

      // delete password if get all user properties
      if (user && user.password) {
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
      id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.INTEGER,
      createdAt: 'TIMESTAMP',
      updatedAt: 'TIMESTAMP',
    },
    {
      sequelize,
      hooks: {
        beforeBulkCreate: users => users.map(user => secureUser(user)),
        beforeSave: user => secureUser(user),
      },
    }
  );

  Users.associate = models => {
    Users.hasMany(models.Reviews, {
      as: 'requiringReviews',
      foreignKey: 'reviewerId',
    });

    Users.hasMany(models.Reviews, {
      as: 'feedbacks',
      foreignKey: 'revieweeId',
    });
  };

  return Users;
};
