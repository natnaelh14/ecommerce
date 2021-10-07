import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
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
    // instead of doing 'created at' and 'updated at', you can pass an option 'timestamps'.
  },
  {
    timestamps: true,
  },
);
/* eslint-disable */
userSchema.methods.matchPassword = async function (enteredPassword) {
  const compare = await bcrypt.compare(enteredPassword, this.password);
  return compare;
};
/* eslint-disable */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  /* eslint-disable */
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
