const mongoose = require('mongoose');
mongoose.pluralize(null)

const bcrypt = require('bcrypt');
const saltround = 10;

var Schema = mongoose.Schema;
var userSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pageRoll: { type: Number, required: true }, //0 for customer 1 for Admin
})

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltround);
    next();
})

module.exports = mongoose.model('Users', userSchema)