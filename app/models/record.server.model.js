var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RecordSchema = new Schema ({
    created: {
        type: Date,
        default : Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    weather: String,
    location: [Number],
    name: String,
    weight: String,
    length: String,
    
    creator : {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Record', RecordSchema);