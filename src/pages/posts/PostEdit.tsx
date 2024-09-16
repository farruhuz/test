import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { PostForm } from "./PostForm";
import { PostsApi } from "../../api/domains/posts.api";

export const PostEdit = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => PostsApi.getPost(id),
  });

  const updatePostMutation = useMutation({
    mutationFn: PostsApi.updatePost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate(-1)
    }
  })

  if (isLoading) return <div className="text-center">loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;

  const handleSubmit = (updatedPost: any) => {
    updatePostMutation.mutate({ id, ...updatedPost })
  }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post} />
    </div>
  )
}
