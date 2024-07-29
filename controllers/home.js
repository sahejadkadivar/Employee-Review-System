import User from "../models/user.js";
import AssignedReview from "../models/assignedReview.js";
import MyReview from "../models/myReviews.js";

export default class homeController {

    // Method to render the home page with user details
    async home(req, res){
        try {

            // Find the user by ID and populate the assignedReviews and myReviews fields
            let user =await User.findById(req.user.id).populate({
                path: 'assignedReviews',
                populate:
                    {
                        path: 'toUser'  // Populate the 'toUser' field in assignedReviews
                    }}).populate({
                        path: 'myReviews',
                        populate:
                            {
                                path: 'fromUser'  // Populate the 'fromUser' field in myReviews
                            }})
    
            
            // Render the home page template with the user data
            res.render('./home',{
                user:user
            }
            )
            
        } catch (error) {
            console.log('Error', error);
        }
    };

    // Method to complete a review
    async completeReview(req, res){
        try {

            // Find the assigned review where the current user is the reviewer and the reviewed user matches req.body.toUser
            let review = await AssignedReview.findOne({ fromUser: req.user,toUser: req.body.toUser});
            
            // Remove the review from the user's assignedReviews array
            await User.findByIdAndUpdate(req.user, { $pull: { assignedReviews: review.id } });
            
             // Delete the assigned review
            await AssignedReview.findByIdAndDelete(review.id);
    
             // Create a new review in the MyReview collection
            review=await MyReview.create({
                fromUser: req.user,
                toUser: req.body.toUser,
                message:req.body.message
            })
            
            // Find the reviewed user and add the new review to their myReviews array
            let user = await User.findById(req.body.toUser);
            
            user.myReviews.push(review);
            user.save();
    
            req.flash('success', 'Review Submitted Successfully');
                return res.redirect('back'); // Redirect back after completing the review
    
            
        } catch (error) {
            console.log('Error', error);
        }
    };
};

