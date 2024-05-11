const Participant = require('../models/Participant');
const { StatusCodes } = require('http-status-codes');
const Event = require("../models/Event");

const registerOnEvent = async (req, res) => {
    if(!Object.values(req.body)){ // check all inputs filled
        return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please all input fields' });
    }

    const findUser = await Participant.findOne({ email: req.body.email });
    if(findUser){ // check if user not registered
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "You already registered participant with this email" })
    }

    const participant = Participant.create(req.body);
    console.log('Successfully registered', participant);
    res.status(StatusCodes.CREATED).json({ participant });
};

const getParticipants = async (req, res) => {
    const {id} = req.params;
    try {
        const participants = await Participant.find({event_id: id});
        res.status(StatusCodes.OK).json({ participants });
    } catch (error){
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

module.exports = {registerOnEvent, getParticipants};