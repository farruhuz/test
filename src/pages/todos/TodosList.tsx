import { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";

export const TodosList = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(`https://dummyjson.com/todos`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data.todos)
      })
      .catch((error) => console.log(error));
  };

  const onAdd = async (name: string, email: string) => {
    await fetch(`https://dummyjson.com/todos/add`, {
      method: "POST",
      body: JSON.stringify({
        todo: name,
        completed: false,
        userId: Math.trunc(Math.random() * 500 + 1)
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 201) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setUsers((users) => [data, ...users,]);
      })
      .catch((error) => console.log(error));
  };

  const onEdit = async (id: any, name: string, email: string, userId: any) => {
    await fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        const updatedUsers = users.map((user: any) => {
          if (user.id === id) {
            user.todo = name;
            user.email = email;
          }
          return user;
        });
        setUsers((users) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id: any) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setUsers(
            users.filter((user: any) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App p-4">
      <AddTodo onAdd={onAdd} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <Todo
            id={user.id}
            key={user.id}
            name={user.todo}
            email={user.id}
            userId={user.userId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
