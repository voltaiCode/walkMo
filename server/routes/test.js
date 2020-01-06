const bcrypt = require('bcrypt');

const userObj = {};

const pw = 'this.should.be.encrypted';
const pwCheck = 'this.should.be.encrypted';
const passwords = [pwCheck, pwCheck, pwCheck, pwCheck, pwCheck, pwCheck];

const pwArr = ['123', 'adc'];
const passArr = ['123', 'qwer'];

// passwordController.setCookie
const encrypt = password => {
  const saltRounds = 10;
  userObj.password = bcrypt.hashSync(password, saltRounds);
  // storing hashed pw at req.body.password
  console.log(userObj.password);
};

encrypt(pw);

const checked = [];
for (let i = 0; i < 5; i++) {
  checked.push(bcrypt.compareSync(passwords[i], userObj.password));
}
console.log(checked);
//  if (checked == true) {
//   console.log('approved');
// } else {
//   console.log('does not match');
// }
