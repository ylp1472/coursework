const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	role: {
		type: String,
		default: 'Customer',
		enum: ['Customer', 'Admin']
	},
	password: String,
});

UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;