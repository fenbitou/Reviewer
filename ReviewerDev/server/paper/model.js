var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Paper schema
var PaperSchema = new Schema({
    paper_title: String,
    paper_author: [String],
    paper_link: String,
    paper_isPublic: Boolean,
    paper_status: String,
    paper_owner_id: String,
    update_Date: {
        type: Date,
        default: Date.now
    },
    create_Date: {
        type: Date,
        default: Date.now
    },
    update_paper_sum: Number,
    paper_content: {
        type: [{
            current_content: String,
            update_time: { type: Date, default: Date.now },
        }]
    }
});

var UserSchema = new Schema({
    username: String,
    hashed_pwd: String,
    user_role: String
});

// add schema to model
mongoose.model('Paper', PaperSchema);
