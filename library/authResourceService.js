var authDataService = require('./authDataService');

var AuthResourceService = {
  createUserLocal: function(email, password) {
    return authDataService.UserLocal.create({
      vendor_id: email,
      vendor_type: 'local',
      email: email,
      password: password
    });
  },
  createUserGmail: function(accessToken, refreshToken, profile) {
    const {id, displayName, emails, photos} = profile;
    const email = emails[0].value;
    const photo = photos[0].value;

    const user_object = {
      vendor_id: id,
      vendor_type: 'google',
      token: accessToken,
      email,
      name: displayName,
    };

    // remove then create
    // TODO: explore upsert
    return authDataService.UserGoogle.destroy({
        where: {
          vendor_id: id,
        }
      })
      .catch()
      .then( authDataService.UserGoogle.create(user_object) )
      .then( () => Promise.resolve(user_object) );
  },
  findLocalUser: function(email) {
    return authDataService.UserLocal.findAll({
      where: { email: email }
    });
  }
};

module.exports = AuthResourceService;
