import express from 'express';
import passport from 'passport';
import homeController from '../controllers/home.js';
import userRoutes from './users.js';
import reviewRoutes from './review.js';
import employeeRoutes from './employeeSection.js';

// Create a new router instance
const router = express.Router();

// Create an instance of homeController
const HomeController = new homeController();

// Route to render the home page
// Checks if the user is authenticated before rendering the page
router.get('/', passport.checkAuthentication, HomeController.home);

// Route to complete a review
// Checks if the user is authenticated before allowing the completion of the review
router.post('/completeReview',passport.checkAuthentication,HomeController.completeReview);

// Use the user routes for any requests starting with /users
router.use('/users', userRoutes);

// Use the review routes for any requests starting with /review
router.use('/review', reviewRoutes)

// Use the employee section routes for any requests starting with /employee
router.use('/employee', employeeRoutes)

// Export the router 
export default router;