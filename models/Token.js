const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const tokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});

mongoose.model('token', tokenSchema);
