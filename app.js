// Select elements
const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

// Load existing tasks from local storage on page load
window.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    tasks.forEach(task => addToDo(task.text, task.isDone));
});

// Event listener for adding a new task
item.addEventListener(
    "keyup",
    function(event) {
        if (event.key === "Enter" && this.value.trim() !== "") {
            addToDo(this.value);
            this.value = "";
        }
    }
);

// Function to add a task
const addToDo = (item, isDone = false) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        ${item}
        <i class="fas fa-times"></i>
    `;

    if (isDone) {
        listItem.classList.add("done");
    }

    // Toggle the 'done' class on click
    listItem.addEventListener("click", function() {
        this.classList.toggle("done");
        updateLocalStorage();
    });

    // Delete task on click of the 'times' icon
    listItem.querySelector("i").addEventListener("click", function() {
        listItem.remove();
        updateLocalStorage();
    });

    toDoBox.appendChild(listItem);
    updateLocalStorage();
};

// Function to update local storage
const updateLocalStorage = () => {
    const tasks = [];
    document.querySelectorAll("#to-do-box li").forEach(listItem => {
        tasks.push({
            text: listItem.textContent.trim(),
            isDone: listItem.classList.contains("done")
        });
    });
    localStorage.setItem("toDoList", JSON.stringify(tasks));
};
