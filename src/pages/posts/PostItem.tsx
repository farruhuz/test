import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { PostsApi } from "../../api/domains/posts.api";

export const PostItem = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: post, isLoading, isError, error, } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => PostsApi.getPost(id),
  });

  if (isLoading) return <div className="text-center">loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <Button className="btn mb-4" onClick={() => navigate(-1)}>
        Back to List Posts
      </Button>
      <div className="card w-full md:w-1/2 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">{post.title}</h1>
          <p>{post.body}</p>
        </div>
      </div>
    </div>
  )
}
