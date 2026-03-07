import { ErrorsEnum } from '@enums';

export const errorMessages: Record<number, string> = {
	[ErrorsEnum.MissingData]: 'errors.MISSING_DATA',
	[ErrorsEnum.AccountNotFound]: 'errors.ACCOUNT_NOT_FOUND',
	[ErrorsEnum.WrongCredentials]: 'errors.WRONG_CREDENTIALS',
	[ErrorsEnum.UserLocked]: 'errors.USER_LOCKED',
};
