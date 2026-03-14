import {
	AccountsQuery,
	AccountSummaryDTO,
	AccountUpdateRoleDTO,
	AccountUpdateRoleRequest,
	TableResultAccountsListDTO,
} from '@apiClient';
import { apiAxios } from '@startup';

export async function getAccountDetails(): Promise<AccountSummaryDTO> {
	const { data } = await apiAxios.get<AccountSummaryDTO>('/accounts/summary');
	return data;
}

export async function getAccounts(params: AccountsQuery): Promise<TableResultAccountsListDTO> {
	const response = await apiAxios.get<TableResultAccountsListDTO>('/accounts', { params });
	return response.data;
}

export async function updateAccountRole(
	accountId: number,
	data: AccountUpdateRoleRequest
): Promise<AccountUpdateRoleDTO> {
	const response = await apiAxios.patch<AccountUpdateRoleDTO>(`/accounts/${accountId}/role`, data);
	return response.data;
}
