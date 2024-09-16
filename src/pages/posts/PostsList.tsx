import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { PostsApi } from "../../api/domains/posts.api";
import { Button } from "../../components/Button";

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
      {allPosts.map(({ id, title, body, tags, reactions, views }: { id: any; title: string; body: string; tags: string[]; reactions: { likes: number; dislikes: number }; views: number }) => (
        <div key={id} className="card w-full bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Post Title */}
            <h4
              className="card-title cursor-pointer hover:text-primary"
              onClick={() => navigate(`/posts/${id}`)}
            >
              {title}
            </h4>

            {/* Post Body */}
            <p className="text-gray-600 text-sm">{body.substring(0, 100)}...</p>

            {/* Post Tags */}
            <div className="mt-2">
              {tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mr-2">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Post Reactions */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <span className="text-green-500 font-semibold mr-2">Likes: {reactions.likes}</span>
                <span className="text-red-500 font-semibold">Dislikes: {reactions.dislikes}</span>
              </div>
              <div className="text-gray-500 text-sm">Views: {views}</div>
            </div>

            {/* Card Actions */}
            <div className="card-actions justify-end mt-4">
              <Button
                className="btn btn-accent text-white"
                onClick={() => navigate(`/post/${id}/edit`)}
              >
                Edit
              </Button>
              <Button
                className="btn btn-primary text-white"
                onClick={() => handleDelete(id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>

  );
};
