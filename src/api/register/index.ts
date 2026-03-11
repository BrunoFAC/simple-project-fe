import { RegisterRequest } from '@apiClient';
import { apiAxios } from '@startup';

export async function register(data: RegisterRequest): Promise<void> {
	const response = await apiAxios.post('/register', data);
	return response.data;
}
