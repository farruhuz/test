
import { useRef, useState, useEffect } from "react";
import { Modal } from "../../components/Modal/Modal";

export const AddUser = ({ onAdd, isOpen, onClose, ...rest }: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const onCloseRef = useRef(onClose); // Initialize ref with onClose

  useEffect(() => {
    onCloseRef.current = onClose; // Update ref when onClose changes
  }, [onClose]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (firstName === "" || lastName === "" || email === "") { // Use || instead of &&
      alert("You Must Write Something!");
      return;
    }
    onAdd(firstName, lastName, email);
    setFirstName("");
    setLastName("");
    setEmail("");
    // Close the modal if onClose is provided
    if (onCloseRef.current) {
      onCloseRef.current();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCloseRef.current}
        canOutsideClickClose={false}
        className="w-6/12 max-w-5xl"
        {...rest}
      >
        <Modal.Title className="mb-6 text-center"> Add New User </Modal.Title>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="form-control">
              <label htmlFor="firstName" className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                className="input border-2 border-red outline-none"
                id="firstName"
                placeholder="John"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
              />
            </div>
            <div className="form-control">
              <label htmlFor="lastName" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                value={lastName}
                type="text"
                className="input input-bordered"
                id="lastName"
                placeholder="Doe"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                placeholder="user123@gmail.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
