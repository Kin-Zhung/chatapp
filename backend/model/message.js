const mongoose = require('mongoose');

const schema = mongoose.Schema;

const messageSchema = new schema({
    chat:{type: String, enum: ['general','game']},
    userName:{type: String, required:true},
    message:{type:String, required:true},
    //date:{type:Date, required:true}
}, {
    timestamps:true,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;