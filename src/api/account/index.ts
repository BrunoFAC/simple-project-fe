import { apiAxios } from '@startup';
import { AccountDetailsDTO } from './interface';

export async function getAccountDetails(): Promise<AccountDetailsDTO> {
	const { data } = await apiAxios.get<AccountDetailsDTO>('/account');
	return data;
}
