const express = require('express');
const router = express.Router();
const mongoose = require(mongoose);

router.get('/', (req,res)=>{
    res.send('server is up and running');
});

var eventdata =  EventLog.find()
.exec()
.then();

var historydata =  Message.find()
.exec()
.then();

var historyroom =  Message.find({'chat': 'general'})
.exec()
.then();
module.exports = router;