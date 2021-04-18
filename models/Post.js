const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    img: {
        type: String,
        default: '/uploads/images/1618764714110SaudiTrips.png',
      },
    caption: {
        type: String,
        required: true,
      },
    location: String,
    city: {
        type: String,
        required: true,
      },
    rate: String,
    isPublished: Boolean,
    user: String,   
}, 

{
    timestamps: true // means createdAt and updatedAt  
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
    
    