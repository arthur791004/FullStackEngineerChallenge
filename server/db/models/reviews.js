module.exports = (sequelize, DataTypes) => {
  const Reviews = sequelize.define(
    'Reviews',
    {
      reviewerId: DataTypes.INTEGER,
      revieweeId: DataTypes.INTEGER,
      feedback: DataTypes.STRING,
      rate: DataTypes.INTEGER,
    },
    {}
  );

  Reviews.associate = models => {
    Reviews.belongsTo(models.Users, {
      foreignKey: 'reviewerId',
      as: 'reviewer',
    });

    Reviews.hasOne(models.Users, {
      foreignKey: 'revieweeId',
      as: 'reviewee',
    });
  };

  return Reviews;
};
