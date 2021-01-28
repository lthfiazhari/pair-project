'use strict';
const {
  Model
} = require('sequelize');

const {convert} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Room, {
        through: 'ChatRooms',
        foreignKey: 'user_id'
      })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Username tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      // validate: {
      //   rules(value) {
      //     value = value.split('');
      //     let count = 0;

      //     value.forEach(el => {
      //       if (el % 1 == 0) count++;
      //     })

      //     if (!value.length) throw new Error('Password tidak boleh kosong');
      //     else if (value.length < 8 || count == 0 || count == value.length) throw new Error('Password harus minimal 8 digit kombinasi huruf dan angka');
      //   }
      // }
    },
    role: DataTypes.STRING,
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        if (!user.role) user.role = 'client';
        let hashingPassword = convert(user.password)
        user.password = hashingPassword //<=== hooks password dari helper bcrypt
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};