import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Name,
  Student,
} from './student/student.interface';

const NameSchema = new Schema<Name>({
  firstName: { type: String, required: [true, 'First name is required '] },
  lastName: { type: String },
});
const GuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContactNo: { type: String, required: true },
  motherOccupation: { type: String, required: true },
});

const LocalGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique: true },
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
  email: { type: String, required: true },
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
});

export const StudentModel = model<Student>('Student', studentSchema);
