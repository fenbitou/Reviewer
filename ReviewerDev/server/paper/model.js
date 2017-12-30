var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define Paper schema
var PaperSchema = new Schema({
    paper_title   :  String,
    paper_author  :  String,
    paper_link    :  String,
    paper_status  :  String,
    paper_isPublic:  Boolean,
    paper_owner_id:  String
});

// add schema to model
mongoose.model('Paper', PaperSchema);
