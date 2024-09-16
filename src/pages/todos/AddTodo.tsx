import { Button } from "../../components/Button";

export const AddTodo = ({ onAdd }: any) => {
  const handleOnSubmit = (evt: any) => {
    evt.preventDefault();
    onAdd({
      todo: evt.target.name.value,
      completed: false,
      userId: 5
    });
    evt.target.name.value = "";
    evt.target.email.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit} className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-xl font-semibold mb-2"> Add Todo </h3>
      <input
        className="w-full p-2 border border-gray-500 rounded mb-2"
        placeholder="Name"
        name="name"
      />
      <Button type="submit" className="w-full btn-info text-white p-2 rounded">
        Add
      </Button>
    </form>
  );
};
