const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
	name: String,
	email: String,
	role: {
		type: String,
		default: 'Admin',
		enum: ['Customer', 'Admin']
	},
	password: String,
});

AdminSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

const AdminModel = mongoose.model('admins', AdminSchema);
module.exports = AdminModel;