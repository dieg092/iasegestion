const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = new Schema({
    _id: Number,
		name: String
});

mongoose.model('community', communitySchema);
