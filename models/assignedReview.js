import mongoose from 'mongoose';

// Schema to define assigned reviews
const assignedReviewSchema = new mongoose.Schema(
    {
        // Reference to the user who assigned the review
        fromUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },

        // Reference to the user who is the recipient of the review
        toUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
)

// Creating model and exporting the same
const AssignedReview = mongoose.model('AssignedReview', assignedReviewSchema);

export default AssignedReview;