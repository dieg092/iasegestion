const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = new Schema({
  _id: {
		$oid: {
			type: 'ObjectId'
		}
	},
  name: {
    type: 'String'
  }
});

mongoose.model('community', communitySchema);
