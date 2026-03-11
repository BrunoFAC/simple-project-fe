import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@hooks';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Paths } from '@utils';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LoginFormData, loginSchema } from './schema';

export function Login() {
	const { t } = useTranslation();

	const { mutateAsync, isPending } = useLoginMutation();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
		mode: 'onSubmit',
	});

	const onSubmit = async (data: LoginFormData) => await mutateAsync(data);

	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
			<Paper elevation={0} sx={{ p: 4, borderRadius: 3, width: '100%', maxWidth: 420 }}>
				<Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={3}>
					<Stack spacing={1}>
						<Typography variant="h4">{t('screens.LOGIN.FORM_TITLE')}</Typography>
						<Typography variant="body2" color="text.secondary">
							{t('screens.LOGIN.FORM_DESCRIPTION')}
						</Typography>
					</Stack>

					<TextField
						label="Email"
						type="email"
						autoComplete="email"
						error={!!errors.email}
						{...(errors.email?.message && { helperText: t(errors.email.message) })}
						{...register('email')}
					/>

					<TextField
						label="Password"
						type="password"
						autoComplete="current-password"
						error={!!errors.password}
						{...(errors.password?.message && { helperText: t(errors.password.message) })}
						{...register('password')}
					/>

					<Button type="submit" disabled={isSubmitting || isPending}>
						{t('screens.LOGIN.FORM_BUTTON')}
					</Button>
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<Typography variant="body2" color="text.secondary">
							{t('screens.LOGIN.NO_ACCOUNT')}
							<Typography
								component={Link}
								to={Paths.Register}
								variant="body2"
								sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 600 }}
							>
								{t('screens.LOGIN.NO_ACCOUNT_BUTTON')}
							</Typography>
						</Typography>
					</Box>
				</Stack>
			</Paper>
		</Box>
	);
}
