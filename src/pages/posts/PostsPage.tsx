import { PageTitle } from '../../components/PageTitle/PageTitle';
import { PostsList } from './PostsList';


export const PostsPage = () => {
  return (
    <div>
      <PageTitle title="Posts" className="mb-8" />
      <PostsList />
    </div>
  );
};
