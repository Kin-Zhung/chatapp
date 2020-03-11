const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({
    event:{type: String, enum: ['CONNECTION','DISCONNECT','JOINED','ERROR']},
    userName:{type: String, required:true},
    date:{type:Date, required:true},
    room:{type: String, required: true},
}, {
    timestamps:true,
});

const EventLog = mongoose.model('EventLog', eventSchema);

module.exports = EventLog;