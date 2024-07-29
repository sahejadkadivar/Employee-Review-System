import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.js';

//Authentication using Passport
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        //Find a User and establish a identity
        User.findOne({ email: email }).then(function (user) {
            // If user is not found or password does not match
            if (!user || user.password != password) {
                req.flash('error', 'Invalid UserName/Password');
                return done(null, false);
            }

            // If user is found and password matches
            return done(null, user);

        }).catch(function (error) {
            console.log('Error in finding the User')
            return done(error);
        })
    }
))


//Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
})

//Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        return done(null, user); // Retrieve user by ID
    }).catch(function (error) {
        console.log('Error in finding the user--Passport');
        return done(error);
    })
})

// Middleware to check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in then pass on the request to next function(Controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

     // If the user is not signed in, redirect to sign-in page
    return res.redirect('/users/Signin');
}

// Middleware to set the authenticated user in response locals  
passport.setAuthenticatedUser = function (req, res, next) {
    // If the user is authenticated, set req.user in res.locals
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    next();

}

// Middleware to restrict access to non-admin users
passport.restrictAccess = function (req, res, next) {

    // If the user is authenticated and does not have admin permission, redirect back
    if (req.isAuthenticated()&&req.user.permission!='admin') {

        return res.redirect('back');
    }

    next();
}


// Middleware to restrict access to admin-only pages
passport.restrictAccessPages = function (req, res, next) {

     // If the user is authenticated and has admin permission, proceed to next middleware
    if (req.isAuthenticated()&&req.user.permission=='admin') {

        next()
    }
    else{
        return res.redirect('back'); // Redirect back if not an admin
    }
    
}


export default passport;