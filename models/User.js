const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    // _id: Number,
		// name: String,
    // lastName: String,
    // dni: Number,
    // dniLetter: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: null },
    // sex: Boolean,
    // birthDate: Date,
    // _population: { type: Schema.ObjectId, ref: 'Population' },
    // rol: String,
    // photo: String,
    // createDate: Date,
     requestDate: Date,
     passwordResetToken: String,
     passwordResetExpires: Date
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

mongoose.model('user', userSchema);
