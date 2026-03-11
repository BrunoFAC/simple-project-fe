import { z } from 'zod';

export const loginSchema = z.object({
	email: z.email('errors.INVALID_EMAIL'),
	password: z.string().min(1, 'errors.PASSWORD_MANDATORY'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
