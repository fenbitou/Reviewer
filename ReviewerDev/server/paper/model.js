var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Paper schema
var PaperSchema = new Schema({
    paper_title   :  String,
    paper_author  :  String,
    paper_link    :  String,
    paper_isPublic:  Boolean,
    paper_status  :  String,
    paper_owner_id:  String,
    update_Date:{
        type: Date,
        default: Date.now
    },
    create_Date: {
        type: Date,
        default: Date.now
    }
});

// add schema to model
mongoose.model('Paper', PaperSchema);
