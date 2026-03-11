import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Paths } from '@utils';

import { useRegisterMutation } from '@hooks';
import { registerSchema, type RegisterFormData } from './schema';

export function Register() {
	const { t } = useTranslation();
	const { mutateAsync, isPending } = useRegisterMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: { username: '', email: '', password: '' },
		mode: 'onSubmit',
	});

	const onSubmit = async (data: RegisterFormData) => await mutateAsync(data);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
			<Paper elevation={0} sx={{ width: '100%', maxWidth: 440, p: 4, borderRadius: 3 }}>
				<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} noValidate>
					<Stack spacing={1}>
						<Typography variant="h4">{t('screens.REGISTER.FORM_TITLE')}</Typography>
						<Typography variant="body2" color="text.secondary">
							{t('screens.REGISTER.FORM_DESCRIPTION')}{' '}
						</Typography>
					</Stack>

					<TextField
						label="Username"
						autoComplete="username"
						error={!!errors.username}
						helperText={errors.username?.message ? t(errors.username.message) : undefined}
						{...register('username')}
					/>

					<TextField
						label="Email"
						type="email"
						autoComplete="email"
						error={!!errors.email}
						helperText={errors.email?.message ? t(errors.email.message) : undefined}
						{...register('email')}
					/>

					<TextField
						label="Password"
						type="password"
						autoComplete="new-password"
						error={!!errors.password}
						helperText={errors.password?.message ? t(errors.password.message) : undefined}
						{...register('password')}
					/>
					<Button type="submit" disabled={isSubmitting || isPending}>
						{t('screens.REGISTER.FORM_BUTTON')}
					</Button>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography variant="body2" color="text.secondary">
							{t('screens.REGISTER.ALREADY_GOT_ACCOUNT')}
							<Typography
								component={Link}
								to={Paths.Login}
								variant="body2"
								sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
							>
								{t('screens.REGISTER.ALREADY_GOT_ACCOUNT_BUTTON')}
							</Typography>
						</Typography>
					</Box>
				</Stack>
			</Paper>
		</Box>
	);
}
