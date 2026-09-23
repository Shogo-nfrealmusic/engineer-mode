const inputEl = document.querySelector<HTMLInputElement>("#todoText");
const addButton = document.querySelector("#add");
const listEl = document.querySelector("#list");
const countEl = document.querySelector("#count");

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
    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  deleteButton.addEventListener("click", () => {
    liEl.remove();

    todos = todos.filter((item) => {
      return item.id !== todo.id;
    });
    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
  });
};

todos.forEach((todo) => {
  renderTodo(todo);
});
updateCount();

addButton?.addEventListener("click", () => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    element: inputEl?.value ?? "",
    done: false,
  };
  todos.push(newTodo);
  renderTodo(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  updateCount();
  if (inputEl) {
    inputEl.value = "";
  }
});
