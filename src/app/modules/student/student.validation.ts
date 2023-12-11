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

export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().min(1).max(25),
    student: z.object({
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
      admissionSemester: z.string(),
      profileImg: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      admissionSemester: z.string().optional(),
      profileImg: z.string().optional(),
    }),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
