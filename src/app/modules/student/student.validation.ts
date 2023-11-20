import { z } from 'zod';

const NameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(25)
    .nonempty({ message: 'First name is required' }),
  lastName: z.string().min(1).max(25),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(255),
  fatherContactNo: z.string().min(1).max(255),
  fatherOccupation: z.string().min(1).max(255),
  motherName: z.string().min(1).max(255),
  motherContactNo: z.string().min(1).max(255),
  motherOccupation: z.string().min(1).max(255),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string().min(1).max(255),
  contactNo: z.string().min(1).max(255),
  occupation: z.string().min(1).max(255),
});

const studentValidationSchema = z.object({
  id: z.string().min(1).max(25),
  name: NameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string().min(1).max(25),
  emergencyContactNo: z.string().min(1).max(255),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z.string().min(1).max(255),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string(),
  isActive: z.enum(['active', 'inactive']).default('active'),
});

export default studentValidationSchema;
