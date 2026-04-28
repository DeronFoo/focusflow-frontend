// Timer Logic
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

// Basic Task Logic (Local UI only for Task 3.1)
document.getElementById('add-task-btn').addEventListener('click', () => {
    const input = document.getElementById('new-task');
    if (!input.value.trim()) return;

    const li = document.createElement('li');
    li.innerHTML = `<span>${input.value}</span> <button class="delete-btn" onclick="this.parentElement.remove()">X</button>`;
    document.getElementById('task-list').appendChild(li);
    input.value = '';
});