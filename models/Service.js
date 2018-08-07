const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const serviceSchema = new Schema({
    // _id: Number,
	  title: String,
    shortDescription: String,
    mainPhoto: String,
    body: String,
});



serviceSchema.plugin(mongoosePaginate);

mongoose.model('service', serviceSchema);
