const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const postSchema = new Schema({
	  title: { type: String, index: { unique: true }},
    category: String,
    mainPhoto: String,
    body: String,
		slug: String,
		date: { type: Date, default: Date.now }
});

postSchema.plugin(mongoosePaginate);
postSchema.plugin(uniqueValidator);

mongoose.model('post', postSchema);
