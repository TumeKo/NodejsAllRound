var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CvSchema = new Schema({
    created: String,
    name: String,
    address: String,
    birthdate: String,
    email: String,
    tel: String,
    profile: String,
    
    work_history: [String],
    education: [String],
    language_skills: [String],
    it_skills: [String],
    hobbies: [String],
    references: [String],
    },
    {collection: 'cv'}
);

mongoose.model('CV', CvSchema);