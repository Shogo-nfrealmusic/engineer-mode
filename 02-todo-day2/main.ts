const inputEl = document.querySelector<HTMLInputElement>("#todoText");
const addButton = document.querySelector("#add");
const listEl = document.querySelector("#list");
const countEl = document.querySelector("#count");

const allButton = document.querySelector("#all");
const activeButton = document.querySelector("#active");
const doneButton = document.querySelector("#done");

let currentFilter = "all";

type Todo = {
  id: string;
  element: string;
  done: boolean;
};

let todos: Todo[] = [];
const savedTodos = localStorage.getItem("todos");
if (savedTodos) {
  todos = JSON.parse(savedTodos);
}

const updateCount = () => {
  const completeCount = todos.reduce((count, todo) => {
    if (todo.done) {
      return count + 1;
    }
    return count;
  }, 0);
  if (countEl) {
    countEl.textContent = `${completeCount} / ${todos.length} completed`;
  }
};

const renderTodo = (todo: Todo) => {
  const liEl = document.createElement("li");
  const checkboxEl = document.createElement("input");
  const textEl = document.createElement("span");
  const deleteButton = document.createElement("button");

  checkboxEl.type = "checkbox";
  textEl.textContent = todo.element;
  checkboxEl.checked = todo.done;
  deleteButton.textContent = "Delete";

  liEl.append(checkboxEl);
  liEl.append(textEl);
  liEl.append(deleteButton);
  listEl?.append(liEl);

  checkboxEl.addEventListener("change", () => {
    todo.done = checkboxEl.checked;
    renderTodos();
    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  deleteButton.addEventListener("click", () => {
    todos = todos.filter((item) => {
      return item.id !== todo.id;
    });
    renderTodos();
    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
  });
};

const renderTodos = () => {
  if (listEl) {
    listEl.textContent = "";
  }
  if (currentFilter === "all") {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  } else if (currentFilter === "active") {
    const activeTodos = todos.filter((item) => {
      return item.done === false;
    });
    activeTodos.forEach((todo) => {
      renderTodo(todo);
    });
  } else {
    const doneTodos = todos.filter((item) => {
      return item.done === true;
    });
    doneTodos.forEach((todo) => {
      renderTodo(todo);
    });
  }
};

renderTodos();
updateCount();

addButton?.addEventListener("click", () => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    element: inputEl?.value ?? "",
    done: false,
  };
  todos.push(newTodo);
  renderTodos();

  localStorage.setItem("todos", JSON.stringify(todos));
  updateCount();
  if (inputEl) {
    inputEl.value = "";
  }
});

allButton?.addEventListener("click", () => {
  currentFilter = "all";
  renderTodos();
});
activeButton?.addEventListener("click", () => {
  currentFilter = "active";
  renderTodos();
});
doneButton?.addEventListener("click", () => {
  currentFilter = "done";
  renderTodos();
});
