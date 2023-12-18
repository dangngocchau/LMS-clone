require('dotenv').config();
import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ValidateMessage } from '../constant/ValidateMessage';
import { PasswordConst, Role } from '../constant/Common';
import { IUser } from '../interfaces/interface';
import jwt from 'jsonwebtoken';

const emailRegexPattern: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, ValidateMessage.RequireUserName],
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: ValidateMessage.InvalidEmail,
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, ValidateMessage.RequriePassword],
      minlength: [PasswordConst.MIN, ValidateMessage.MinLengthPassword],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: Role.USER,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

/** Hash password before saving */
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  //Hash password
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/** Sign access token */
UserSchema.methods.SignAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.ACCESS_TOKEN || '',
    {
      expiresIn: '5m',
    }
  );
};

/** Sign refresh token */
UserSchema.methods.SignRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN || '',
    {
      expiresIn: '3d',
    }
  );
};

/** Compare password */
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel: Model<IUser> = mongoose.model('User', UserSchema);
export default UserModel;
