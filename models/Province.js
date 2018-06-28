const mongoose = require('mongoose');
const { Schema } = mongoose;

const provinceSchema = new Schema({
  _id: {
		$oid: {
			type: 'ObjectId'
		}
	},
  _community: {
    $oid: {
      type: 'ObjectId'
    }
  },
  name: {
    type: 'String'
  }
});

mongoose.model('province', provinceSchema);
