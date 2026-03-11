import { LoginDTO, LoginRequest } from '@apiClient';
import { apiAxios } from '@startup';

export async function login(data: LoginRequest): Promise<LoginDTO> {
	const response = await apiAxios.post<LoginDTO>('/login', data);
	return response.data;
}
