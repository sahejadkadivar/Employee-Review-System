import mongoose from "mongoose";

// Schema for users
const userSchema = new mongoose.Schema(
    {
        // User's email
        email: {
            type: String,
            required: true,
            unique: true  // Email must be unique
        },
        // User's password
        password: {
            type: String,
            required: true,
        },
        // User's name
        name: {
            type: String,
            required: true,
        },
        // User's permission level (admin OR employee)
        permission: {
            type: String
        },
        // List of reviews assigned to this user
        assignedReviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'AssignedReview',  // Reference to the AssignedReview model
            }
        ],
        // List of reviews received by this user
        myReviews: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'MyReview',  // Reference to the MyReview model
            }
        ]
    },
    {
        // Automatically add createdAt and updatedAt timestamps
        timestamps: true
    }
)

// Creating the model and exporting it
const User = mongoose.model('User', userSchema);

export default User;