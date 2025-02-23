import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    clerkId: string; // Clerk's unique user ID
    username: string;
    email: string;
    fullName: string;
    avatar: string;
    coverImage?: string;
    watchHistory: mongoose.Types.ObjectId[]; // Array of video references
}

const UserSchema = new Schema<IUser>(
    {
        clerkId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // Clerk provides an image URL
            required: true,
        },
        coverImage: {
            type: String, // Optional cover image
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
    },
    { timestamps: true }
);

// Export the User model
export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
