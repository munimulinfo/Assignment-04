import { Schema, model } from 'mongoose';
import { TPreviousPassword, TUser } from './Auth.interface';
import { passwordHelpers } from '../../middlewears/passwordChekar';

const subPasswordSchema = new Schema<TPreviousPassword>(
  {
    password: { type: String },
    timestamp: { type: Date },
  },
  {
    _id: false,
  },
);

const userSchema = new Schema<TUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    previousPassword: { type: [subPasswordSchema], required: true },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password') || this.isNew) {
      const hashedPassword = await passwordHelpers.hashPassword(this.password);
      this.password = hashedPassword;
      const newPasswordEntry = {
        password: hashedPassword,
        timestamp: new Date(),
      };
      this.previousPassword = [
        ...(this.previousPassword || []),
        newPasswordEntry,
      ];
    }
    next();
  } catch (error) {
    throw new Error(`hashing password error ${error}`);
  }
});

//check userEmail exsists
userSchema.pre('save', async function (next) {
  const exsitingUser = await UserModel.findOne({ email: this.email });
  if (exsitingUser) {
    throw new Error(
      'This Email Alredy use change This Email and Create Acount',
    );
  }
  next();
});

//check userName is exsits
userSchema.pre('save', async function (next) {
  const exsitingUserName = await UserModel.findOne({ username: this.username });
  if (exsitingUserName) {
    throw new Error(
      'This UserName Alredy use change This UserNmae and Create Acount',
    );
  }
  next();
});

// delet password field ton respnse data after added to database
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.previousPassword;
    delete ret.passwordChangedAt;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = model<TUser>('user', userSchema);
