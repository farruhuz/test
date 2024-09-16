import { useState } from "react";
import { Button } from "../../components/Button";

export const Todo = ({ id, todo, completed, userId, onEdit, onDelete }: any) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnEditSubmit = (evt: any) => {
    evt.preventDefault();
    onEdit({ id, todo: evt.target.name.value, userId });
    setIsEdit(!isEdit);
  };

  return (
    <div className="p-4 bg-white shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] rounded-md">
      {isEdit ? (
        <form onSubmit={handleOnEditSubmit} className="flex flex-col justify-between h-full">
          <input
            className="w-full p-2 border border-gray-500 rounded mb-2 "
            placeholder="todo"
            name="name"
            defaultValue={todo}
          />
          <Button type="submit" className="w-full btn-info text-white p-2 rounded">
            Save
          </Button>
        </form>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="mb-2">
            <span className="block font-semibold text-lg">{todo}</span>
            <span className="block text-gray-600 mb-4">
              Completed : {completed ? "Completed" : "not Compleated"}
            </span>
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={handleEdit} className="btn-accent text-white p-2 rounded">
              Edit
            </Button>
            <Button onClick={() => onDelete(id)} className="btn-primary text-white p-2 rounded">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
