import { useState } from "react";

export const Todo = ({ name, email, id, onEdit, onDelete, userId }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnEditSubmit = (evt: any) => {
    evt.preventDefault();
    onEdit(id, evt.target.name.value, email, userId);
    setIsEdit(!isEdit);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit}>
          <input
            className="w-full p-2 border border-gray-300 rounded mb-2"
            placeholder="Name"
            name="name"
            defaultValue={name}
          />
          <span className="block text-gray-600">{email}</span>
          <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
            Save
          </button>
        </form>
      ) : (
        <div>
          <div className="mb-2">
            <span className="block font-semibold text-lg">{name}</span>
            <span className="block text-gray-600">{email}</span>
          </div>
          <div className="flex justify-end space-x-2">
            <button onClick={handleEdit} className="bg-yellow-500 text-white p-2 rounded">
              Edit
            </button>
            <button onClick={() => onDelete(id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
