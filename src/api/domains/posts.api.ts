import { httpClient } from "../../services/http-client/http-client";


export const PostsApi = {

  getAllPosts: async () => {
    const { data } = await httpClient.get(`/posts`);
    return data;
  },

  getPost: async (id: number | string | undefined) => {
    const { data } = await httpClient.get(`/posts/${id}`);
    return data;
  },

  createPost: async (newPost: unknown) => {
    const { data } = await httpClient.post(`/posts`, { newPost });
    return data;
  },

  updatePost: async ({ id, title, body }: any) => {
    const { data } = await httpClient.put(`/posts/${id}`, { title, body });
    return data;
  },

  deletePost: async (id: string) => {
    const { data } = await httpClient.delete(`/posts/${id}`);
    return data;
  },

};
