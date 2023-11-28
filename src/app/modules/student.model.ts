import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TUserName,
  TStudent,
  StudentModel,
  StudentMethods,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const NameSchema = new Schema<TUserName>({
  firstName: { type: String, required: [true, 'First name is required '] },
  lastName: { type: String },
});
const GuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: NameSchema, required: true },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender field can only be one of the following: 'male', 'female' or 'other'",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, trim: true, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message: '{VALUE} is not valid',
    },
  },
  presentAddress: { type: String, required: true },
  guardian: { type: GuardianSchema, required: true },
  localGuardian: { type: LocalGuardianSchema, required: true },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  idDeleted: {
    type: Boolean,
    default: false,
  },
});

studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS),
  );
  next();
});

studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

studentSchema.pre(/^find/, function (next) {
  this.find({ idDeleted: { $ne: true } });
  next();
});

studentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
