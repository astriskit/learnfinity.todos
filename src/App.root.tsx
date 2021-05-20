import React from "react";
import { useAtomValue, useUpdateAtom } from "jotai/utils";
import { TextField, Grid, Button, Typography } from "@material-ui/core";
import cx from "classnames";

import {
  addTask,
  tagFilterTasks,
  toggleTaskDone,
  clearTasks as cT,
  textMode,
  tags as tgs,
} from "./atoms";
import styles from "./App.root.module.scss";
import { useAtom } from "jotai";

const scrollToElement = (el: HTMLElement) => {
  el.scrollIntoView();
};

const findFirstDone = () => {
  const firstDone =
    document.querySelectorAll('[data-done="true"]')?.[0] ?? null;
  return firstDone;
};

const findFirstUnDone = () => {
  const firstUnDone =
    document.querySelectorAll('[data-done="false"]')?.[0] ?? null;
  return firstUnDone;
};

export const AppRoot = () => {
  const [tField, setTField] = React.useState({ error: false, helperText: "" });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [mode, setMode] = useAtom(textMode);
  const [tags, setTags] = useAtom(tgs);
  const addTags = useUpdateAtom(tgs);
  const tasks = useAtomValue(tagFilterTasks);
  const pushTask = useUpdateAtom(addTask);
  const toggleDone = useUpdateAtom(toggleTaskDone);
  const clearTasks = useUpdateAtom(cT);

  const handleToggleDone = (idx: string) => () => toggleDone(idx);

  const handlePushTask = () => {
    if (inputRef.current?.value) {
      pushTask({ title: inputRef.current.value, done: false });
      inputRef.current.value = "";
    }
  };

  const handleSearchTasks = () => {
    const tags = inputRef.current?.value.split(" ");
    if (!inputRef.current?.value) {
      if (tField.error) {
        setTField({ error: false, helperText: "" });
      }
      addTags([]);
      return;
    }
    if (
      inputRef.current?.value &&
      tags?.every((tag) => !!tag && tag.startsWith("#") && tag.length > 1)
    ) {
      if (tField.error) {
        setTField({ error: false, helperText: "" });
      }
      addTags(tags);
    } else {
      setTField({
        error: true,
        helperText: "Field has invalid tag(s). Use '#' to start a tag.",
      });
    }
  };

  const handleEnter = ({ altKey, ctrlKey, key }: React.KeyboardEvent): void => {
    if (!altKey && !ctrlKey && key === "Enter") {
      if (mode === "add") {
        handlePushTask();
      } else if (mode === "search") {
        handleSearchTasks();
      }
    }
  };

  const handleClearTodos = () => clearTasks();

  const handleToggleMode = () => {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    if (mode === "search" && tags.length) {
      setTags([]);
      if (tField.error) {
        setTField({ error: false, helperText: "" });
      }
    }
    setMode((m) => (m === "add" ? "search" : "add"));
    inputRef.current?.focus();
  };

  const handleEnterClick = () => {
    if (mode === "add") {
      handlePushTask();
    } else if (mode === "search") {
      handleSearchTasks();
    }
  };

  const doneTasks = tasks.filter(({ done }) => done).length;
  const todoTasks = tasks.filter(({ done }) => !done).length;

  const scrollToFinished = () => {
    const first = findFirstDone();
    if (first) {
      scrollToElement(first as HTMLElement);
    }
  };

  const scrollToUnFinished = () => {
    const first = findFirstUnDone();
    if (first) {
      scrollToElement(first as HTMLElement);
    }
  };

  return (
    <Grid
      container
      alignItems="stretch"
      direction="column"
      className={styles.appRoot}
      wrap="nowrap"
    >
      <Grid
        item
        container
        justify="space-between"
        alignItems={tField.error ? "center" : "flex-end"}
        className={styles.inputWrapper}
      >
        <Grid item>
          <TextField
            autoFocus
            onKeyPress={handleEnter}
            inputRef={inputRef}
            label={mode === "add" ? "Add Todo" : "Find tags"}
            placeholder={
              mode === "add"
                ? "Add todo to the list by typing and pressing enter"
                : "Type #tags separated by space and hit enter"
            }
            color="primary"
            fullWidth
            error={tField.error}
            helperText={tField.helperText}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleEnterClick}
            variant="contained"
            color="primary"
            size="small"
            title="clear all items"
          >
            Go
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleToggleMode}
            variant="contained"
            color="primary"
            size="small"
            title={
              mode === "add" ? "Switch to find mode" : "Switch to add mode"
            }
          >
            {mode === "add" ? "Find" : "Add"}
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleClearTodos}
            variant="contained"
            color="secondary"
            size="small"
            title="clear all items"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
      {!!tasks.length && (
        <Grid
          item
          container
          className={styles.tasksWrapper}
          direction="column"
          alignItems="stretch"
          wrap="nowrap"
        >
          {tasks.map(({ id, done, uTitle }) => {
            return (
              <Grid item key={id} className={styles.taskWrapper}>
                <div
                  className={cx(styles.todoItem, {
                    [styles.doneTodoItem]: done,
                  })}
                  onClick={handleToggleDone(id)}
                  data-done={done ? "true" : "false"}
                  data-type="todo-item"
                >
                  {uTitle.map((contents) => {
                    const st = contents.flat(2);
                    return st.map(({ component, content, className }, idx) => {
                      if (component && content) {
                        return React.createElement(component, {
                          children: content,
                          className,
                          key: idx,
                        });
                      }
                      return content;
                    });
                  })}
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
      {!!!tasks.length && !!tags.length && mode === "search" && (
        <Grid item>
          <Typography variant="subtitle2">No results found!</Typography>
        </Grid>
      )}
      {!!!tasks.length && !!!tags.length && mode === "search" && (
        <Grid item>
          <Typography variant="subtitle2">
            Add tags using the text-field above
          </Typography>
        </Grid>
      )}
      {!!!tasks.length && mode === "add" && (
        <Grid item>
          <Typography variant="subtitle2">
            Add items using the text-field above
          </Typography>
        </Grid>
      )}
      {!!tasks.length && (
        <Grid
          item
          container
          justify="space-evenly"
          title="summary"
          className={styles.summary}
        >
          <Grid item>
            <Typography onClick={scrollToFinished}>
              Done: {doneTasks}
            </Typography>
          </Grid>
          <Grid item>
            <Typography onClick={scrollToUnFinished}>
              Yet to do: {todoTasks}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
