import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PostsApi } from "../../api/domains/posts.api";

export const PostsList = () => {
  const [allPosts, setAllPosts] = useState<any[]>([])
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const hasModifiedPosts = useRef(false);

  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: PostsApi.getAllPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: PostsApi.deletePost,
    onSuccess: (data) => {
      setAllPosts((prevAllProducts) => {
        hasModifiedPosts.current = true;
        return prevAllProducts.filter((el: any) => el.id !== data.id);
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });

  const handleDelete = (id: string) => {
    deletePostMutation.mutate(id)
  }

  useEffect(() => {
    if (posts && posts.posts) {
      setAllPosts(posts.posts.map((el: any) => ({ ...el, isDeleted: false })));
    }
  }, [posts]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allPosts.map(({ id, title }: { id: any; title: string }) => (
        <div key={id} className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            <h4
              className="card-title cursor-pointer hover:text-primary"
              onClick={() => navigate(`/posts/${id}`)}
            >
              {title}
            </h4>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/post/${id}/edit`)}
              >
                Edit
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
