import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.js';

// Create a new router instance
const router = express.Router();

// Create an instance of userController
const UserController = new userController();

// Route to render the sign-in page
// Restricts access based on user permissions
router.get('/Signin', passport.restrictAccess, UserController.Signin);

// Route to render the sign-up page
// Restricts access based on user permissions
router.get('/Signup', passport.restrictAccess, UserController.SignUp);

// Route to create a new user
router.post('/create', UserController.create);

// Route to create a new session (log in)
// Redirects to '/users/Signin' on failure
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/Signin' }
), UserController.createSession);

// Route to sign out (destroy the session)
router.get('/Signout', UserController.destroySession);

export default router;
