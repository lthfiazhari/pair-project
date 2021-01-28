'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChatRoom.belongsTo(models.User, {
        hooks: true
      })
      ChatRoom.belongsTo(models.Room, {
        hooks: true
      })
    }
  };
  ChatRoom.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};