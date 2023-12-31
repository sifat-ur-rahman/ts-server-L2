import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TUserName,
  TStudent,
  StudentModel,
  StudentMethods,
} from './student.interface';

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

const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },

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
    admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  },
);

studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}  ${this.name.lastName}`;
});

// Query Middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.methods.isUserExits = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
