// ========================================
// SELECT HTML ELEMENTS
// ========================================

const taskInput =
    document.getElementById("taskInput");

const addBtn =
    document.getElementById("addBtn");

const taskList =
    document.getElementById("taskList");

const emptyState =
    document.getElementById("emptyState");

const totalTasks =
    document.getElementById("totalTasks");

const completedTasks =
    document.getElementById("completedTasks");

const remainingTasks =
    document.getElementById("remainingTasks");

const taskSummary =
    document.getElementById("taskSummary");

const clearCompleted =
    document.getElementById("clearCompleted");

const themeToggle =
    document.getElementById("themeToggle");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// ========================================
// DATA
// ========================================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];

let currentFilter = "all";


// ========================================
// SAVE TASKS
// ========================================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// ========================================
// ADD TASK
// ========================================

function addTask() {

    const text =
        taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false
    };


    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    taskInput.focus();

    renderTasks();
}


// ========================================
// DELETE TASK
// ========================================

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );

    saveTasks();

    renderTasks();
}


// ========================================
// TOGGLE TASK
// ========================================

function toggleTask(id) {

    tasks =
        tasks.map(task => {

            if (task.id === id) {

                return {
                    ...task,
                    completed:
                        !task.completed
                };
            }

            return task;
        });

    saveTasks();

    renderTasks();
}


// ========================================
// FILTER TASKS
// ========================================

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(
            task => !task.completed
        );
    }


    if (currentFilter === "completed") {

        return tasks.filter(
            task => task.completed
        );
    }


    return tasks;
}


// ========================================
// DISPLAY TASKS
// ========================================

function renderTasks() {

    taskList.innerHTML = "";


    const filteredTasks =
        getFilteredTasks();


    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.className = "task";


        const leftSection =
            document.createElement("div");

        leftSection.className =
            "task-left";


        const checkbox =
            document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className =
            "task-checkbox";

        checkbox.checked =
            task.completed;


        const taskText =
            document.createElement("span");

        taskText.className =
            "task-text";

        taskText.textContent =
            task.text;


        if (task.completed) {

            taskText.classList.add(
                "completed"
            );
        }


        checkbox.addEventListener(
            "change",
            () => toggleTask(task.id)
        );


        leftSection.appendChild(
            checkbox
        );

        leftSection.appendChild(
            taskText
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.className =
            "delete-btn";

        deleteButton.textContent =
            "🗑️";

        deleteButton.setAttribute(
            "aria-label",
            "Delete task"
        );


        deleteButton.addEventListener(
            "click",
            () => deleteTask(task.id)
        );


        li.appendChild(
            leftSection
        );

        li.appendChild(
            deleteButton
        );


        taskList.appendChild(li);

    });


    updateStatistics();

    updateEmptyState();
}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    const total =
        tasks.length;


    const completed =
        tasks.filter(
            task => task.completed
        ).length;


    const remaining =
        total - completed;


    totalTasks.textContent =
        total;

    completedTasks.textContent =
        completed;

    remainingTasks.textContent =
        remaining;


    taskSummary.textContent =
        `${total} ${total === 1 ? "task" : "tasks"}`;
}


// ========================================
// EMPTY STATE
// ========================================

function updateEmptyState() {

    const filteredTasks =
        getFilteredTasks();


    if (filteredTasks.length === 0) {

        emptyState.style.display =
            "block";

    } else {

        emptyState.style.display =
            "none";
    }
}


// ========================================
// FILTER BUTTONS
// ========================================

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });


            button.classList.add(
                "active"
            );


            currentFilter =
                button.dataset.filter;


            renderTasks();
        }
    );

});


// ========================================
// CLEAR COMPLETED
// ========================================

clearCompleted.addEventListener(
    "click",
    () => {

        tasks =
            tasks.filter(
                task => !task.completed
            );

        saveTasks();

        renderTasks();
    }
);


// ========================================
// ADD BUTTON
// ========================================

addBtn.addEventListener(
    "click",
    addTask
);


// ========================================
// ENTER KEY
// ========================================

taskInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            addTask();
        }
    }
);


// ========================================
// DARK / LIGHT MODE
// ========================================

function updateThemeIcon() {

    if (
        document.body.classList.contains(
            "light"
        )
    ) {

        themeToggle.textContent =
            "☀️";

    } else {

        themeToggle.textContent =
            "🌙";
    }
}


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const isLight =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            "theme",
            isLight
                ? "light"
                : "dark"
        );


        updateThemeIcon();
    }
);


// ========================================
// LOAD SAVED THEME
// ========================================

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );
}


updateThemeIcon();


// ========================================
// INITIAL RENDER
// ========================================

renderTasks();