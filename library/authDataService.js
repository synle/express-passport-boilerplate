var Sequelize = require('sequelize');

var STORAGE_PATH = './db.sqlite3';

// db part
var sequelize = new Sequelize(
  'db_user', // 'database',
  'username', // 'username',
  'password', // 'password',
  {
    // sqlite! now!
    dialect: 'sqlite',

    // the storage engine for sqlite
    // - default ':memory:'
    storage: STORAGE_PATH
  });


var UserLocal = sequelize.define('user_local', {
  email        : Sequelize.STRING,
  password     : Sequelize.STRING
});

var UserFacebook = sequelize.define('user_facebook', {
  vendor_id    : Sequelize.STRING,
  token        : Sequelize.STRING,
  email        : Sequelize.STRING,
  name         : Sequelize.STRING
});

var UserTwitter = sequelize.define('user_twitter', {
  vendor_id    : Sequelize.STRING,
  token        : Sequelize.STRING,
  displayName  : Sequelize.STRING,
  username     : Sequelize.STRING
});

var UserGoogle = sequelize.define('user_google', {
  vendor_id    : Sequelize.STRING,
  token        : Sequelize.STRING,
  email        : Sequelize.STRING,
  name         : Sequelize.STRING
});

// might only need to run for init call...
var promiseDbSync = sequelize.sync().then(function (argument) {
  // TODO: remove this log line...
  console.log('database...synced... read to use', STORAGE_PATH);
});

function Table(tableInstance){
  this.create = function(params){
    return promiseDbSync.then(
      function _tableCreate(){
        return tableInstance.create(params)
          .then(function(dataObject){
            return dataObject.dataValues;
          });;
      }
    );
  };


  this.findOne = function(params){
    return promiseDbSync.then(
      function _tableFindOne(){
        return tableInstance.findOne(params)
          .then(function(dataObject){
            return dataObject.dataValues;
          });
      }
    );
  };


  this.findAll = function(params){
    return promiseDbSync.then(
      function _tableFindAll(){
        return tableInstance.findAll(params)
          .then(function(dataObjects){
            return dataObjects.map(function(dataObject){
              return dataObject.dataValues;
            });
          });
      }
    );
  };
}

module.exports = {
  UserLocal: new Table(UserLocal),
  UserFacebook: UserFacebook,
  UserTwitter: UserTwitter,
  UserGoogle: UserGoogle
}
