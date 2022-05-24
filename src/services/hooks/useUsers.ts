import { useQuery, UseQueryOptions } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type GetUsersResponse = {
  totalCount: number;
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get<{ users: User[] }>('/users', {
    params: {
      page,
    }
  });

  const totalCount = Number(headers['x-total-count']);
  const users = data.users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-br', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }),
  }))
  return {
    users,
    totalCount,
  };
}

export const useUsers = (page: number, options?: UseQueryOptions<GetUsersResponse>) =>
  useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10,
    ...options,
  });