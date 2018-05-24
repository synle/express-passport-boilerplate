var authDataService = require('./authDataService');

var AuthResourceService = {
  createUserLocal: function(email, password) {
    return authDataService.UserLocal.create({
      email: email,
      password: password
    });
  },
  createUserGmail: function(accessToken, refreshToken, profile) {
    return Promise.resolve();
  },
  findLocalUser: function(email) {
    return authDataService.UserLocal.findAll({
      where: { email: email }
    });
  }
};

module.exports = AuthResourceService;
