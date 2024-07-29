import User from "../models/user.js";

export default class userController {
    // Method to render the sign-in page
    Signin(req, res) {
        res.render('./signinPage');
    };

    // Method to render the sign-up page
    SignUp(req, res) {
        res.render('./signupPage');
    };

    // Method to handle user sign-up data
    async create(req, res) {
        try {
            // Check if passwords match
            if (req.body.password != req.body.confirm_password) {
                req.flash('error', 'Passwords do not match');
                return res.redirect('back');  // Redirect back if passwords don't match
            }

             // Check if a user with the provided email already exists
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                // Create a new user if one doesn't already exist
                await User.create(req.body);
                req.flash('success', 'User Created succesfully');
                return res.redirect('back'); // Redirect back after successful creation
            }
            else {
                req.flash('error', 'User Already exits,Try signing in');
                return res.redirect('back');  // Redirect back if user already exists
            }

        }
        catch (error) {
            console.log('Error', error);
            return res.redirect('back');  // Redirect back in case of an error
        }
    };

    // Method to create a session after successful login
    createSession(req, res) {
        return res.redirect('/');  // Redirect to the home page
    };

    // Method to destroy a session (log out)
    destroySession(req, res) {
        req.logout(function (error) {
            if (error) {
                console.log('Error while signing out');
                return res.redirect('back'); // Redirect back in case of an error
            }

            return res.redirect('/users/Signin');  // Redirect to the sign-in page after logout
        });
    }

}