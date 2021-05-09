const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Account already exist"]
    },
    phone: {
        type: String,
        required: true,
        minlength : [10, "Minimum length should be 10"]
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// userSchema.set('collection', "userData");

userSchema.pre('save', async (next) => {
    const saltedPass = await bcrypt.genSalt();
    await bcrypt.hash(this.password, saltedPass, (err, hash) => {
        if(!err) {
            console.log(hash);
            this.password = hash;
        }
    });
    next();
});

userSchema.statics.login = async (email, password) => {
    let user = this.find({ email });
    if (user) {
        if (user.password === password) {
            return user;
        } throw Error('Incorrect Password');
    } throw Error("No account Associated with this email");
};

userSchema.methods.signup = function () {
    console.log(email);
    let user = this.email({email});
    console.log("user:  ", user);
    if(!user) {
        return true;
    } throw Error("Account with this email Already Exist");
}

const userModel = mongoose.model("userData", userSchema);
module.exports = userModel;