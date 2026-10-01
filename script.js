const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


// Add task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");

    li.className = "task";

    li.innerHTML = `
        <div class="task-left">

            <input
                type="checkbox"
                class="task-checkbox"
            >

            <span>${taskText}</span>

        </div>

        <button class="delete-btn">
            🗑
        </button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    taskInput.focus();
}


// Add task button
addBtn.addEventListener("click", addTask);


// Press Enter to add task
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// Complete or delete task
taskList.addEventListener("click", function(event) {

    // Complete task
    if (event.target.classList.contains("task-checkbox")) {

        const taskText =
            event.target.nextElementSibling;

        taskText.classList.toggle("completed");
    }


    // Delete task
    if (event.target.classList.contains("delete-btn")) {

        const task =
            event.target.parentElement;

        task.remove();
    }

});