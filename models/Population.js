const mongoose = require('mongoose');
const { Schema } = mongoose;

const populationSchema = new Schema({
  _id: {
		$oid: {
			type: 'ObjectId'
		}
	},
  _province: { type: mongoose.Schema.Types.ObjectId, ref: 'Community'},
  name: {
    type: 'String'
  }
});

mongoose.model('population', populationSchema);
