import express from 'express';
import passport from 'passport';
import reviewController from '../controllers/review.js';

// Create a new router instance
const router = express.Router();


// Create an instance of reviewController
const ReviewController = new reviewController();

// Route to render the page for assigning work
// Restricts access to pages based on user permissions
router.get('/assignWork',passport.restrictAccessPages, ReviewController.home);

// Route to create a new review
router.post('/createReview', ReviewController.createReview);

export default router;