const mongoose = require('mongoose');

const EventScheme = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        event_date:{
            type: Date,
            default: Date.now,
            required:true
        },
        organizer:{
            type:String,
            required:true
        },
    }
);

module.exports = mongoose.model('Event', EventScheme);