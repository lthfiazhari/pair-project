const bcrypt = require('bcryptjs');


function convert(input) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(input, salt);

    return hash
}

// let pass = convert('password')


function checkPass(password, passwordDB) {
    let result = bcrypt.compareSync(password, passwordDB); // true
    // bcrypt.compareSync("not_bacon", hash); // false
    return result
}

// console.log(checkPass('passwored', pass));

module.exports = {convert, checkPass}