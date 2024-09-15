import { PageTitle } from '../../components/PageTitle/PageTitle';
import { TodosList } from './TodosList';


export const TodosPage = () => {
  return (
    <div>
      <PageTitle title="Todos" className="mb-8" />
      <TodosList />
    </div>
  );
};
