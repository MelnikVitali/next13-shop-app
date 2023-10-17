import { IUser } from '@/interfaces/user';
import mongoose, { Schema, model, Model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Full name is required'],
      minLength: [2, 'Full name should be at least 4 characters long'],
      maxLength: [30, 'Full name should be less than 30 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address'],
    },
    password: { type: String, required: false },
    role: {
      type: String,
      enum: {
        values: ['admin', 'client', 'super-user', 'SEO'],
        message: '{VALUE} it is not a valid role',
        default: 'client',
        required: true,
      },
    },
  },
  { timestamps: true },
);

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;
