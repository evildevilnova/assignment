const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        min: 3,
        max: 20
    },
    hash_password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum:['user','team'],
        default: 'user'
    },
    phone:{
        type: Number,
        required: true,
        unique: true,
    },
    username:{
        type: String,
        unique: true
    },
    profilepic:{ type: String}
},{ timestamps: true});


userSchema.methods = {
    authenticate: async function(password){
        return await bcrypt.compare(password, this.hash_password)
    }
};

module.exports = mongoose.model('user', userSchema);