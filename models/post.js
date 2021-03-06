const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Populate = require("../utils/autopopulate");


const PostSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    
    url: { type: String, required: true },
    
    title: { type: String, required: true },
    summary: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    
    subreddit: { type: String, required: true },

    upVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    voteScore: { type: Number },
});

// Always populate the author field
PostSchema
    .pre('findOne', Populate('author'))
    .pre('find', Populate('author'))

PostSchema.pre("save", (next) => {
    // SET createdAt AND updatedAt
    const now = new Date();
    this.updatedAt = now;

    if (!this.createdAt) {
        this.createdAt = now;
    }

    next();
});

module.exports = mongoose.model("Post", PostSchema);