const mongoose = require('mongoose');

const ParticipantScheme = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        date_of_birth:{
            type: String,
            required:true
        },
        know_from:{
            type: String,
            required:true
        },
        registration_date:{
            type: Date,
            default: Date.now,
        },
        event_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Event',
            required: true
        }
    }
);

module.exports = mongoose.model('Participant', ParticipantScheme);