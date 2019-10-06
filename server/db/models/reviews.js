module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    'Reviews',
    {
      revieweeId: {
        type: DataTypes.UUIDV4,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      reviewerId: {
        type: DataTypes.UUIDV4,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'cascade',
      },
      rating: DataTypes.INTEGER,
      content: DataTypes.STRING,
      createdAt: 'TIMESTAMP',
      updatedAt: 'TIMESTAMP',
    },
    {}
  );

  Reviews.associate = models => {
    Reviews.belongsTo(models.Users, {
      as: 'reviewer',
      foreignKey: 'reviewerId',
    });

    Reviews.belongsTo(models.Users, {
      as: 'reviewee',
      foreignKey: 'revieweeId',
    });
  };

  return Reviews;
};
