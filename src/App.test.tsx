import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const initTodos = [
  {
    title: "Hello world",
    done: false,
    id: "01",
    lastUpdated: Date.now(),
  },
  {
    title: "Hello world 2",
    done: true,
    id: "02",
    lastUpdated: Date.now() + 1000 * 60 * 10,
  },
];

test("The todo page and features", () => {
  render(<App />);

  const todoInput = screen.getByTestId("todo-input");
  expect(todoInput).toBeInTheDocument();

  const firstTodo = "First todo";
  const secondTodo = "Second todo";

  fireEvent.change(todoInput, { target: { value: firstTodo } });
  expect(todoInput).toHaveValue(firstTodo);

  fireEvent.keyPress(todoInput, { key: "enter", keyCode: 13, code: 13 });
  fireEvent.change(todoInput, { target: { value: secondTodo } });
  fireEvent.keyPress(todoInput, { key: "enter", keyCode: 13, code: 13 });

  const todoOneTextControl = screen.getByTestId("first-todo");
  const todoTwoTextControl = screen.getByTestId("second-todo");
  expect(todoOneTextControl).toBeInTheDocument();
  expect(todoTwoTextControl).toBeInTheDocument();

  fireEvent.click(todoOneTextControl);
  expect(todoOneTextControl).toHaveAttribute("data-done", "true");
  const todosParent = todoOneTextControl.parentNode;
  expect(todosParent?.lastChild).toBe(todoOneTextControl);
  fireEvent.click(todoTwoTextControl);
  expect(todoTwoTextControl).toHaveAttribute("data-done", "true");
  expect(todosParent?.lastChild).toBe(todoTwoTextControl);

  const reset = screen.getByTestId("reset-todos");
  expect(reset).toBeInTheDocument();
  fireEvent.click(reset);

  expect(todosParent?.children.length).toHaveLength(0);

  render(<App todos={initTodos} />);
  expect(todosParent?.children.length).toHaveLength(initTodos.length);
});
