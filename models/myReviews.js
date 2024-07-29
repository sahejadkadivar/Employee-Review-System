import mongoose from "mongoose";

// schema for reviews
const myReviewSchema = new mongoose.Schema({
    message: {
      // Message content of the review
      type: String,
      required:true
    },
    // Reference to the user who wrote the review
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  // Reference to the User model
      },
      // Reference to the user who received the review
      toUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',   // Reference to the User model
          }
  },
  
   {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true
  }
  )

  // Creating the model and exporting it
  const MyReview = mongoose.model('MyReview', myReviewSchema);

  export default MyReview;  
