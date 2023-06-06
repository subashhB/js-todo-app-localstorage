const tasksStorage = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
console.log(tasksStorage);

document.querySelector("#enter").addEventListener("click", () => {
  const task = document.querySelector("#task");
  createItem(task);
});

function createItem(task) {
  tasksStorage.push(task.value);
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
  location.reload();
}

function displayItems() {
  let items = "";
  for (let i = 0; i < tasksStorage.length; i++) {
    items += `<div class="item">
        <div class="input-controller">
          <textarea disabled>${tasksStorage[i]}</textarea>
          <div class="edit-controller">
            <button class="deleteBtn">Delete</button>
            <button class="editBtn">Edit</button>
          </div>
        </div>
        <div class="update-controller">
          <button class="saveBtn">Save</button>
          <button class="cancelBtn">Cancel</button>
        </div>
      </div>`;
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateDeleteListeners() {
  let deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteTask(i);
    });
  });
}

function activateEditListeners() {
  const editbtn = document.querySelectorAll(".editBtn");
  const updateController = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");
  editbtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  });
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateTask(inputs[i].value, i);
    });
  });
}

function updateTask(updatedTask, i) {
  console.log(updatedTask, i);
  tasksStorage[i] = updatedTask;
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
  location.reload();
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const updateControllers = document.querySelectorAll(".update-controller");
  const inputs = document.querySelectorAll(".input-controller textarea");

  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateControllers[i].style.display = "none";
      inputs[i].disabled = true;
    });
  });
}

function deleteTask(i) {
  tasksStorage.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(tasksStorage));
  location.reload();
}

window.onload = () => {
  displayItems();
};
