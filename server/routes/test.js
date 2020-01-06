const bcrypt = require('bcrypt');

const pw = 'this.should.be.encrypted';
// passwordController.setCookie
const encrypt = password => {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    // storing hashed pw at req.body.password
    console.log(hash);
  });
};

encrypt(pw);
