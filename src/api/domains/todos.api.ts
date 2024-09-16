import { httpClient } from "../../services/http-client/http-client";


export const TodosApi = {

  getAllTodos: async () => {
    const { data } = await httpClient.get(`/todos`);
    return data;
  },

  getTodo: async (id: number | string | undefined) => {
    const { data } = await httpClient.get(`/posts/${id}`);
    return data;
  },

  createTodo: async ({ todo, completed, userId }: any) => {
    const { data } = await httpClient.post(`/todos/add`,
      {
        todo,
        completed,
        userId
      });
    return data;
  },

  updateTodo: async ({ id, todo, userId }: any) => {
    const { data } = await httpClient.put(`/todos/${id}`, { todo, userId });
    return data;
  },

  deleteTodo: async (id: string) => {
    const { data } = await httpClient.delete(`/todos/${id}`);
    return data;
  },

};
