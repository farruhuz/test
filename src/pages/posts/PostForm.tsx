import { useState, ChangeEvent, FormEvent } from "react";

interface PostFormProps {
  onSubmit: (post: { title: string; body: string }) => void;
  initialValue: { title: string; body: string };
}

export const PostForm = ({ onSubmit, initialValue }: PostFormProps) => {

  const [post, setPost] = useState<{ title: string; body: string }>({
    title: initialValue.title || "",
    body: initialValue.body || ""
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

  const renderField = (label: "Title" | "Body") => (
    <div className="form-control mb-4">
      <label className="label">{label}</label>
      <input
        className="input input-bordered"
        onChange={handleChangeInput}
        type="text"
        name={label.toLowerCase()}
        value={post[label.toLowerCase() as keyof typeof post]}
      />
    </div>
  );


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(post);
    setPost({
      title: "",
      body: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4">
      {renderField("Title")}
      {renderField("Body")}
      <button type="submit" className="btn btn-primary w-full mt-4">
        Submit
      </button>
    </form>
  );
};
