// importing necessary modules
import User from "../models/user.js";
import AssignedReview from "../models/assignedReview.js";
import MyReview from "../models/myReviews.js";

export default class employeeSectionController{
    
    // Method to render the home page with a list of users
    async home(req, res){
        try {

            let users =await User.find({});   // Fetch all users from the database
            res.render('./employeeSection',{
                users:users                   // Pass the users to the template
            }
            )
            
        } catch (error) {
            console.log('Error', error);
        }
    };

    // Method to update user information  
    async update(req,res){
        try {
            let user = await User.findById(req.params.id);   // Find user by ID
            
            // Check if the provided data matches the existing data
            if(user.name==req.body.name&&user.email==req.body.email&&user.password==req.body.password)
            {
              req.flash('success', 'No Values Updated');
              return res.redirect('back');  // Redirect back if no values are updated
            }
            
            // Update user information with new values
               user.name = req.body.name;
               user.email = req.body.email;
               user.password=req.body.password;
  
               user.save();  // Save the updated user to the database
               req.flash('success', 'User Updated succesfully');
               return res.redirect('back');  // Redirect back after update  
   
            
      }catch (error) {
   
         console.log('Error', error);
         return res.redirect('back');
      }
    };

    // Method to delete a user
    async delete(req, res){
        try {
            let user = await User.findById(req.params.id);  // Find user by ID
            user.deleteOne();  // Delete the user
    
            await AssignedReview.deleteMany({fromUser:req.params.id});  // Delete assigned reviews from the user
    
            let MyRiviewIDS = await MyReview.find({fromUser:req.params.id}) // Find reviews written by the user
    
    
            for(let review of MyRiviewIDS)
            {
                let userid= review.toUser
                await User.findByIdAndUpdate(userid, { $pull: { myReviews: review.id } });  // Remove review reference from the reviewed user
                await review.deleteOne();  // Delete the review
    
            }
    
            res.redirect('back')  // Redirect back after deletion
            
        } catch (error) {
            console.log('Error', error);
        }
    };


     // Method to promote a user to admin
    async makeadmin(req, res){

        try {
            let user = await User.findById(req.params.id);
            
               user.permission = 'admin';  // Set user permission to admin
  
               user.save();  // Save the updated user to the database
               req.flash('success', 'User Promoted to Admin');
               return res.redirect('back');  // Redirect back after promotion

      }catch (error) {
   
         console.log('Error', error);
         return res.redirect('back');
      }
    };


    // Method to demote an admin to an employee
    async removeadmin(req, res){
        try {
            let user = await User.findById(req.params.id);
               user.permission = 'employee';  // Set user permission to employee
               user.save();
               req.flash('success', 'User removed as Admin');
               return res.redirect('back');  // Redirect back after demotion
   
            
      }catch (error) {
   
         console.log('Error', error);
         return res.redirect('back');
      }
    };
}