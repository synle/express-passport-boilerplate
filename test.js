var authResourceService = require('./library/authResourceService');

// authResourceService.createUserLocal('admin@admin.com', 'admin')
//     .then(function (argument) {
//         // console.log('done...', argument)
//     });


authResourceService.findLocalUser('admin@admin.js555')
    .then(function(user) {
        console.log(user)
    });


authResourceService.findLocalUser('admin@admin.com')
    .then(function(user) {
        console.log(user)
    });
