const moment = require('moment');

class Helper {
  static format_message (username, text) {
    return {
      username,
      text,
      time: moment().format('h:mm a')
    }
  };
};

module.exports = { Helper };