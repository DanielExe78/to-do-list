"use strict";

const input = document.querySelector(".work");
const addBtn = document.querySelector(".add");
const taskContainer = document.querySelector(".tasks");

class List {
  #tasks = [];
  constructor() {
    this.task = input;

    // Event Listener
    addBtn.addEventListener("click", this.add.bind(this));
    taskContainer.addEventListener("click", this.removeTask.bind(this));
    taskContainer.addEventListener("click", this.editBtn.bind(this));

    // Calling functions
    this.getLocalStorage();
  }

  add(taskVal) {
    taskVal = this.task.value;

    if (taskVal.length < 1) {
      input.style.border = "1px solid red";
      input.placeholder = "Don't leave the field empty";

      return;
    }

    if (taskVal.length >= 1) {
      input.style.border = "none";
      input.placeholder = "Add a new task!";

      this.renderTask(taskVal);

      // Save to tasks array
      this.#tasks.push(taskVal);

      // Removing the input text
      this.task.value = "";

      // Set local storage
      this.setLocalStorage();
    }
  }

  removeTask(e) {
    const name = document.querySelectorAll(".task-name");
    const clicked = e.target.closest(".delete");

    if (clicked) {
      const parent = clicked.parentElement.parentElement;
      parent.remove();

      name.forEach((name) => {
        let tried = name.textContent.trim("");
        let index = this.#tasks.indexOf(tried);

        if (parent.textContent.trim("") === tried) {
          this.#tasks.splice(index, 1);
          this.setLocalStorage();
        }
      });
    }
  }

  editBtn(e) {
    const name = document.querySelectorAll(".task-name");
    const clicked = e.target.closest(".edit");

    if (clicked) {
      name.forEach((text) => {
        let index = this.#tasks.indexOf(text.textContent.trim(""));

        clicked.innerHTML = ` 
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="check-icon icon">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>`;
        text.contentEditable = true;

        clicked.addEventListener(
          "click",
          function () {
            clicked.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="edit-icon icon">
             <path stroke-linecap="round" stroke-linejoin="round"
               d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>`;

            this.#tasks.splice(index, 1, text.textContent.trim(""));
            this.setLocalStorage();
            text.contentEditable = false;
          }.bind(this)
        );
      });
    }
  }

  renderTask(taskVal) {
    const html = ` 
    <li class="task">
    <div class="task-name">
        ${taskVal}
      </div>
        <div class="edit-btns">
        <button class="edit"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke-width="1.5" stroke="currentColor" class="edit-icon icon">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </button> <button class="delete"><svg xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="close-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
    `;

    taskContainer.insertAdjacentHTML("beforeend", html);
  }

  setLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("tasks"));

    if (!data) return;

    this.#tasks = data;

    this.#tasks.forEach((task) => {
      this.renderTask(task);
    });
  }
}

const toDoList = new List();
