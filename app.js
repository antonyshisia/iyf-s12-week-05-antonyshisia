const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const itemsLeft = document.getElementById("items-left");
const clearCompleted = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";

// Add a new task
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    input.focus();
    return;
  }

  tasks.push({
    id: Date.now() + Math.random(),
    text: text,
    completed: false
  });

  input.value = "";
  renderTasks();
  input.focus();
});

// Display tasks according to the selected filter
function renderTasks() {
  taskList.replaceChildren();

  const visibleTasks = tasks.filter(function (task) {
    if (currentFilter === "active") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;
  });

  visibleTasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.text;

    if (task.completed) {
      taskText.classList.add("completed");
    }

    // Click once to complete or uncomplete a task
    taskText.addEventListener("click", function () {
      task.completed = !task.completed;
      renderTasks();
    });

    // Double-click to edit a task
    taskText.addEventListener("dblclick", function () {
      editTask(task, li);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-task";
    deleteButton.textContent = "×";
    deleteButton.setAttribute("aria-label", "Delete " + task.text);

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      renderTasks();
    });

    li.append(taskText, deleteButton);
    taskList.appendChild(li);
  });

  // Update the number of unfinished tasks
  const remaining = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  itemsLeft.textContent =
    remaining + (remaining === 1 ? " item left" : " items left");
}

// Edit a task using Enter to save and Escape to cancel
function editTask(task, li) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = task.text;
  editInput.setAttribute("aria-label", "Edit task");

  li.replaceChildren(editInput);
  editInput.focus();
  editInput.select();

  let finished = false;

  function finishEdit(save) {
    if (finished) return;
    finished = true;

    const newText = editInput.value.trim();

    if (save && newText !== "") {
      task.text = newText;
    } else if (save && newText === "") {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
    }

    renderTasks();
  }

  editInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      finishEdit(true);
    }

    if (event.key === "Escape") {
      finishEdit(false);
    }
  });

  editInput.addEventListener("blur", function () {
    finishEdit(true);
  });
}

// Switch between All, Active and Completed
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      item.classList.toggle("active", item === button);
    });

    renderTasks();
  });
});

// Remove every completed task
clearCompleted.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  renderTasks();
});

// Show the initial empty list
renderTasks();