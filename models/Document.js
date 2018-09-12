const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const documentSchema = new Schema({
	  name: { type: String, index: { unique: true }},
		number: String,
    type: String,
    pdf: String,
		slug: String,
		date: { type: Date, default: Date.now }
});

documentSchema.plugin(mongoosePaginate);
documentSchema.plugin(uniqueValidator);

mongoose.model('document', documentSchema);
