import express from 'express';
import passport from 'passport';
import employeeSectionController from '../controllers/employeeSection.js';

// Create a new router instance
const router = express.Router();

// Instantiate the employee section controller
const EmployeeSectionController =new employeeSectionController();

// Route to render the home page of the employee section
// Restricts access to pages based on user permissions
router.get('/home', passport.restrictAccessPages, EmployeeSectionController.home);

// Route to update a user by ID
// Checks if the user is authenticated before allowing the update
router.post('/update/:id', passport.checkAuthentication, EmployeeSectionController.update);

// Route to delete a user by ID
router.get('/delete/:id', EmployeeSectionController.delete);

// Route to promote a user to admin by ID
router.get('/makeadmin/:id', EmployeeSectionController.makeadmin);

// Route to demote a user from admin by ID
router.get('/removeadmin/:id', EmployeeSectionController.removeadmin);

// Export the router for use in other parts of the application  
export default router;