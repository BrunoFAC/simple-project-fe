import { z } from 'zod';

import { emailRegex, passwordRegex, usernameRegex } from '@utils';

export const registerSchema = z.object({
	username: z
		.string()
		.trim()
		.min(1, 'errors.USERNAME_MANDATORY')
		.regex(usernameRegex, 'errors.INVALID_USERNAME_CREATION'),

	email: z.string().trim().min(1, 'errors.EMAIL_MANDATORY').regex(emailRegex, 'errors.INVALID_EMAIL_CREATION'),

	password: z.string().min(1, 'errors.PASSWORD_MANDATORY').regex(passwordRegex, 'errors.INVALID_PASSWORD_CREATION'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
