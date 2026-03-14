import { ErrorsEnum } from '@enums';

export const errorMessages: Record<number, string> = {
	[ErrorsEnum.MissingData]: 'errors.MISSING_DATA',
	[ErrorsEnum.InvalidData]: 'errors.INVALID_DATA',
	[ErrorsEnum.InvalidUsername]: 'errors.INVALID_USERNAME',
	[ErrorsEnum.InvalidEmail]: 'errors.INVALID_EMAIL',
	[ErrorsEnum.InvalidPassword]: 'errors.INVALID_PASSWORD',
	[ErrorsEnum.AccountFoundUsername]: 'errors.ACCOUNT_FOUND_USERNAME',
	[ErrorsEnum.AccountFoundEmail]: 'errors.ACCOUNT_FOUND_EMAIL',
	[ErrorsEnum.AccountNotFoundEmail]: 'errors.ACCOUNT_NOT_FOUND_EMAIL',
	[ErrorsEnum.AccountNotFound]: 'errors.ACCOUNT_NOT_FOUND',
	[ErrorsEnum.WrongCredentials]: 'errors.WRONG_CREDENTIALS',
	[ErrorsEnum.UserLocked]: 'errors.USER_LOCKED',
	[ErrorsEnum.FileTooLarge]: 'errors.FILE_TOO_LARGE',
	[ErrorsEnum.InternalServerError]: 'errors.INTERNAL_SERVER_ERROR',
};
