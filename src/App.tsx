import React from "react";
import { Provider } from "jotai";

import { AppRoot } from "./App.root";
import { setTasks, Task } from "./utils";

const App = ({ todos = [] }: { todos?: Task[] }) => {
  if (todos) {
    setTasks(todos);
  }
  return (
    <Provider>
      <AppRoot />
    </Provider>
  );
};

export default App;
