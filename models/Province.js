const mongoose = require('mongoose');
const { Schema } = mongoose;

const provinceSchema = new Schema({
    _id: Number,
		name: String,
    _community: { type: Schema.ObjectId, ref: 'Community' }
});

mongoose.model('province', provinceSchema);
