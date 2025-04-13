const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {isEmail} = require('validator');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true,'Email is required'],
        lowercase: true,
        validate: [isEmail,'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        minLength: [6,'Please enter a password with at least 6 characters'],
        
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
    
    this.password = await bcrypt.hash(this.password,10);
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;