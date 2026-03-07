import { AccountRoleEnum } from '@enums';

/**
 * @typedef AccountDetailsDTO
 * @property {number} id.required
 * @property {string} name.required
 * @property {number} role.required
 */
export interface AccountDetailsDTO {
	id: number;
	role: AccountRoleEnum;
	name: string;
}
