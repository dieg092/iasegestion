const mongoose = require('mongoose');
const { Schema } = mongoose;

const populationSchema = new Schema({
    _id: Number,
		name: String,
    _city: { type: Schema.ObjectId, ref: 'City' }
});

mongoose.model('population', populationSchema);
