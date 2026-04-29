// TIMER LOGIC
let timeLeft = 25 * 60; // 25 minutes
let timerId = null;
const timerDisplay = document.getElementById('timer-display');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

document.getElementById('start-btn').addEventListener('click', () => {
    if (timerId) return; // Prevent multiple intervals
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("Pomodoro complete! Take a break.");
        }
    }, 1000);
});

document.getElementById('reset-btn').addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
});


// FULL-STACK DATABASE LOGIC (Task 3.3)

// Render API URL
const API_URL = 'https://focusflow-api-deron.onrender.com/api/tasks';

// READ: Fetch tasks from database on load
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        
        taskList.innerHTML = ''; // Clear current list before loading new ones
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.title}</span> <button class="delete-btn" onclick="this.parentElement.remove()">X</button>`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching tasks from database:", error);
    }
}

// WRITE: Send new task to database
document.getElementById('add-task-btn').addEventListener('click', async () => {
    const input = document.getElementById('new-task');
    const taskTitle = input.value.trim();
    
    if (!taskTitle) return; // Don't submit empty tasks

    // Clear the input box immediately for a snappy user experience
    input.value = '';

    try {
        // Send the data to your Fastify backend
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle })
        });

        // Once successfully saved, reload the list from the database
        loadTasks(); 
    } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task to database. Check the console.");
    }
});

// Initial load when the page opens
loadTasks();