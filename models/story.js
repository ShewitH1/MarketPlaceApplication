const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User' },
    content: {type: String, default: 'Good shoes! New in bag. Please let me know if you have any questions.' ,required: [true, 'content is required'], 
            minLength: [10, 'the content should have at least 10 characters']},
    condition: { type: String, default: 'New' },
    price: { type: Number, default: '$9.99' },
    offers: { type: String, default: '0 Offers' },
    image: { type: String }, 
    seller: { type: String, default: 'Jordan' },
    details: { type: String, default: 'Good shoes! New in bag. Please let me know if you have any questions.', required: [true, 'details is required'] },
    active: { type: String, default: 'active' }
},
{timestamps: true}
);
//collection name is stories in the database
module.exports = mongoose.model('Story', storySchema);


