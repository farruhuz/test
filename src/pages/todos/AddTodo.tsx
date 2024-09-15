

export const AddTodo = ({ onAdd }: any) => {
  const handleOnSubmit = (evt: any) => {
    evt.preventDefault();
    onAdd(evt.target.name.value, evt.target.email.value);
    evt.target.name.value = "";
    evt.target.email.value = "";
  };

  return (
    <form onSubmit={handleOnSubmit} className="bg-white p-4 shadow-md rounded-md mb-4">
      <h3 className="text-xl font-semibold mb-2"> Add Todo </h3>
      <input
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Name"
        name="name"
      />
      <input
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Email"
        name="email"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Add
      </button>
    </form>
  );
};
