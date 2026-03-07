import { AccountRoleEnum } from '@enums';

export const role: Record<AccountRoleEnum, string> = {
	[AccountRoleEnum.Admin]: 'account.ROLE.ADMIN',
	[AccountRoleEnum.Member]: 'account.ROLE.MEMBER',
};
