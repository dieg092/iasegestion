const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    // _id: Number,
	  name: String,
    lastName: String,
    nif: { type: String, unique: true, default: null },
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: null },
    gender: Boolean,
    // birthDate: Date,
    _population: String,
    rol: Boolean,
    // photo: String,
    createDate: Date,
    requestDate: Date,
    passwordResetToken: String,
    passwordResetExpires: Date
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password)  {
	if(this.password != null) {
			 return bcrypt.compareSync(password, this.password);
	 } else {
			 return false;
	 }
};

userSchema.plugin(mongoosePaginate);

mongoose.model('user', userSchema);
