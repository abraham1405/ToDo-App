import React, { useState } from "react";
import { type TodoTitle } from "../types";

interface Props {
  saveTodo: ({ title }: TodoTitle) => void;
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveTodo({ title: inputValue });
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        value={inputValue}
        placeholder="What needs to be done?"
        autoFocus
        onChange={(event) => setInputValue(event.target.value)}
      />
    </form>
  );
};
