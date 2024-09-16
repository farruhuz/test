import { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";
import { Todo } from "./Todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TodosApi } from "../../api/domains/todos.api";

export const TodosList = () => {
  const [todos, setUsers] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: TodosApi.getAllTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: TodosApi.deleteTodo,
    onSuccess: (data) => {
      setUsers((prevUsers) => {
        return prevUsers.filter((el: any) => el.id !== data.id);
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  const onDelete = (id: string) => deleteTodoMutation.mutate(id)

  const editTodoMutation = useMutation({
    mutationFn: TodosApi.updateTodo,
    onSuccess: (data) => {
      setUsers((prevTodos) => {
        return prevTodos.map((el: any) => {
          if (el.id === data.id) {
            el.todo = data.todo
          }
          return el
        });
      });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  const onEdit = (params: any) => editTodoMutation.mutate(params)

  const addTodoMutation = useMutation({
    mutationFn: TodosApi.createTodo,
    onSuccess: (data) => {
      setUsers((prevTodos) => [data, ...prevTodos]);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  const onAdd = (params: any) => addTodoMutation.mutate(params)

  useEffect(() => {
    if (data && data.todos) {
      setUsers(data.todos.map((el: any) => ({ ...el, isDeleted: false })));
    }
  }, [data]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;


  return (
    <div className="App p-4">
      <AddTodo onAdd={onAdd} />
      <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo.todo}
            completed={todo.completed}
            userId={todo.userId}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
