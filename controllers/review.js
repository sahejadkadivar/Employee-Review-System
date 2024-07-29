import User from "../models/user.js";
import AssignedReview from "../models/assignedReview.js";
import MyReview from "../models/myReviews.js";

export default class reviewController{

    // Method to render the page to assign reviews
    async home(req, res){
        try {

            let users =await User.find({}); // Fetch all users from the database
            res.render('./assignwork',{
                users:users  // Pass the users to the template
            }
            )
            
        } catch (error) {
            console.log('Error', error);
        }
    };


    // Method to create a new review assignment
    async createReview(req, res){
        try {

             // Check if a review assignment already exists between the same reviewer and recipient
            let review = await AssignedReview.findOne({ fromUser: req.body.reviewer,toUser: req.body.recipient});
    
            if (review) {
                req.flash('success', 'Review Already Assigned for same Recipient and Reviewer');
                return res.redirect('back'); // Redirect back if review already exists
            }
            
            // Create a new review assignment
            review=await AssignedReview.create({
                fromUser: req.body.reviewer,
                toUser: req.body.recipient
            })
    

            // Find the reviewer and add the review assignment to their assignedReviews array
            let user = await User.findById(req.body.reviewer);
            user.assignedReviews.push(review);
            user.save();
    
    
    
            req.flash('success', 'Review Assigned Successfully');
                return res.redirect('back');   // Redirect back after assignment
    
            
        } catch (error) {
            console.log('Error', error);
        }
    };
}