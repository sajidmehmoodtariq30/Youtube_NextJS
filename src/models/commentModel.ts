import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
    content: string;
    owner: mongoose.Types.ObjectId;
    video: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    dislikes: mongoose.Types.ObjectId[];
    replies: mongoose.Types.ObjectId[];
}

const CommentSchema = new Schema<IComment>(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
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
        replies: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

export const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", CommentSchema);
