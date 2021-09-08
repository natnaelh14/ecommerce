import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
//instead of doing 'created at' and 'updated at', you can pass an option 'timestamps'.
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;