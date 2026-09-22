const inputElement = document.querySelector<HTMLInputElement>("#type");
const buttonElement = document.querySelector("#add");
const listElement = document.querySelector("#list");
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
  const liElement = document.createElement("li");
  const checkboxElement = document.createElement("input");
  const textElement = document.createElement("span");
  const deleteButton = document.createElement("button");

  checkboxElement.type = "checkbox";
  checkboxElement.checked = todo.done;
  textElement.textContent = todo.element;
  deleteButton.textContent = "Delete";

  liElement.append(checkboxElement);
  liElement.append(textElement);
  liElement.append(deleteButton);
  listElement?.append(liElement);

  checkboxElement.addEventListener("change", () => {
    todo.done = checkboxElement.checked;

    updateCount();
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  deleteButton.addEventListener("click", () => {
    liElement.remove();

    todos = todos.filter((item) => {
      return item.id !== todo.id;
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  });
};

todos.forEach((todo) => {
  renderTodo(todo);
});
updateCount();

buttonElement?.addEventListener("click", () => {
  const newTodo: Todo = {
    id: crypto.randomUUID(),
    element: inputElement?.value ?? "",
    done: false,
  };

  todos.push(newTodo);
  renderTodo(newTodo);

  localStorage.setItem("todos", JSON.stringify(todos));
  updateCount();
  if (inputElement) {
    inputElement.value = "";
  }
});
