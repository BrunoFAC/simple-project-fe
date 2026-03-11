import { AccountSummaryDTO } from '@apiClient';
import { apiAxios } from '@startup';

export async function getAccountDetails(): Promise<AccountSummaryDTO> {
	const { data } = await apiAxios.get<AccountSummaryDTO>('/accounts/summary');
	return data;
}
