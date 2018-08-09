const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    // _id: Number,
	  title: { type: String, index: { unique: true }},
    shortDescription: String,
    mainPhoto: String,
    body: String,
		slug: String,
		important: { type: Boolean, default: false },
});

serviceSchema.plugin(mongoosePaginate);
serviceSchema.plugin(uniqueValidator);

mongoose.model('service', serviceSchema);
