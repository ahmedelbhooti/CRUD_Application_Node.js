const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
    },
    email: { type: 'string', required: true, unique: true },
    gender: { type: String, },
    status: { type: String, },
});


const userDb = mongoose.model('userDB', schema);

module.exports = userDb;