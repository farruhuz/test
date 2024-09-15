
export const User = ({ id, email, firstName, lastName, onDelete }: any) => {

  const handleDelete = () => onDelete(id);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow mb-4">
        <div className="card-body flex justify-between items-center">
          <div>
            <span className="font-bold">{firstName && lastName ? `${firstName} ${lastName}` : "N/A"}</span>
            <p>{email || "N/A"}</p>
          </div>
          <div className="flex space-x-2">
            <button type="button" className="btn btn-primary">
              Edit
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

