// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;


// load up the user model
var AuthResourceService = require('./library/authResourceService');

module.exports = function(passport){
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log('passport.serializeUser', user);
        done(null, user.email);
    });

    // used to deserialize the user
    passport.deserializeUser(function(email, done) {
        console.log('passport.deserializeUser', email);

        AuthResourceService.findLocalUser(email)
            .then(function(user) {
                if(user.length > 0){
                    console.log('found', email, user);
                    done(null, user[0]);
                } else {
                    console.log('not found', email, user);
                    done('not found...', null);
                }
            });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            // asynchronous
            // User.findOne wont fire unless data is sent back
            process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            AuthResourceService.findLocalUser(email)
                .then(function(user){
                    // TODO: remove console.log
                    console.log(email)
                    if (user.length > 0) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        return AuthResourceService.createUserLocal(email, password)
                            .then(function(newUser){
                                console.log('done',email, newUser)
                                return done(null, newUser);
                            });
                    }
                })

            });
        })
    );


    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form
            AuthResourceService.findLocalUser(email)
                .then(function(user) {
                    if(user.length > 0){
                        if(user[0].password !== password){
                            return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                        }

                        return done(null, user[0]);
                    } else {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }
                });
        }
    ));


}