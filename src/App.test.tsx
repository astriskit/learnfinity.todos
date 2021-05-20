import React from "react";
import { render, screen, act } from "@testing-library/react";
import user from "@testing-library/user-event";
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
/*
 * TODO: clear warnings
 */
test("The todo page test without hash", async () => {
  act(() => {
    render(<App />);
  });

  /* has input-field */
  const todoInput = screen.getByTestId("todo-input");
  expect(todoInput).toBeInTheDocument();

  const firstTodo = "First todo";
  const secondTodo = "Second todo";

  /* input field works ok? */
  await user.type(todoInput, firstTodo);

  expect(todoInput).toHaveValue(firstTodo);

  await user.type(todoInput, "{enter}");
  await user.type(todoInput, secondTodo);
  await user.type(todoInput, "{enter}");

  /* input field entered items are added? */
  const textControls = screen.getByTestId("tasks-wrapper");
  expect(textControls).toBeInTheDocument();
  expect(textControls.children).toHaveLength(2);

  const todoOneTextControl = textControls.children[0].children[0];
  const todoTwoTextControl = textControls.children[1].children[0];
  expect(todoOneTextControl).toHaveTextContent(secondTodo.split(" ").join(""));
  expect(todoTwoTextControl).toHaveTextContent(firstTodo.split(" ").join(""));

  /* task clicked is added to done category? */
  await user.click(todoOneTextControl);
  expect(todoOneTextControl).toHaveAttribute("data-done", "true");

  /* tasks toggled for done are ordered correctly? */
  expect(textControls.children[1].children[0]).toBe(todoOneTextControl);
  await user.click(todoTwoTextControl);
  expect(todoTwoTextControl).toHaveAttribute("data-done", "true");
  expect(textControls.children[0].children[0]).toBe(todoTwoTextControl);

  /* tasks are cleaned by clicking control? */
  const reset = screen.getByTestId("reset-todos");
  expect(reset).toBeInTheDocument();
  await user.click(reset);

  expect(screen.getByTestId("empty-list")).toBeInTheDocument();

  /* tasks provided to App as props renders? */
  act(() => {
    render(<App todos={initTodos} />);
  });
  expect(screen.getByTestId("tasks-wrapper").children).toHaveLength(
    initTodos.length
  );
});
