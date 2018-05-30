module.exports = function(app, passport){
    // =====================================
    // LANDING PAGE =====================
    // =====================================
    app.get('/', function(req, res, next) {
        res.render('index', {});
    });


    // =====================================
    // GOOGLE LOGIN SECTION ================
    // more details here.   ================
    // https://github.com/jaredhanson/passport-google-oauth2
    // =====================================
    app.get('/login/google',
        passport.authenticate(
            'google',
            {
                // check this out for more scope related
                // https://developers.google.com/identity/protocols/googlescopes
                scope: [
                    'profile', // always needed
                    'email',
                    'https://mail.google.com/',
                    'https://www.googleapis.com/auth/contacts',
                    'https://www.googleapis.com/auth/calendar',
                    'https://www.googleapis.com/auth/drive',
                ]
            }
        )
    );

    app.get('/login/google/callback',
        passport.authenticate(
            'google',
            {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/', // redirect back to the signup page if there is an error
            }
        )
    );


    // =====================================
    // MANUAL SIGNUP SECTION =====================
    // =====================================
    app.get('/login', function(req, res, next) {
        res.render('login', { message: req.flash('loginMessage') });
    });

    app.get('/signup', function(req, res, next) {
        res.render('signup', { message: req.flash('signupMessage') }  );
    });


    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // process login
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));



    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user : req.user // get the user out of session and pass to template
        });
    });


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
