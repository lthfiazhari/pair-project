const bcrypt = require('bcryptjs');

function convert(input) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(input, salt);
  return hash;
}

function checkPass(password, passwordDB) {
  let result = bcrypt.compareSync(password, passwordDB);
  return result;
}

module.exports = { convert, checkPass }