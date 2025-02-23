import mongoose, { Schema, Document } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

interface IVideo extends Document {
    videoFile: string;
    thumbnail: string;
    title: string;
    description: string;
    views: number;
    duration: number;
    isPublic: boolean;
    category: string;
    owner: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];  // Users who liked the video
    dislikes: mongoose.Types.ObjectId[]; // Users who disliked the video
    comments: mongoose.Types.ObjectId[]; // Reference to comments
}

const VideoSchema = new Schema<IVideo>(
    {
        videoFile: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        duration: {
            type: Number, // From Cloudinary / Mux
            required: true,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

// Pagination plugin
VideoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema);
