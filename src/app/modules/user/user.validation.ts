import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be String' })
    .max(20)
    .optional(),
});

export const UserValidation = {
  userValidationSchema,
};
