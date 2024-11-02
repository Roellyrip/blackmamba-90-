const toggleTheme = document.getElementById('toogle-theme');
const body = document.body;
const wrapper = document.querySelector('.wrapper');

toggleTheme.addEventListener('change', () => {
    body.classList.toggle('dark', toggleTheme.checked);
    wrapper.classList.toggle('dark', toggleTheme.checked);
});

// code untuk penambahan list, hapus , dan selesai

// Ambil elemen dari HTML
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Variabel untuk menyimpan nomor urut
let taskCount = 0;

// Fungsi untuk menambah tugas
function addTask() {
    const taskText = todoInput.value.trim();

    // Validasi input (tidak menampilkan alert)
    if (taskText === '') {
        return; // Jika kosong, keluar dari fungsi tanpa alert
    }

    // Increment nomor urut
    taskCount++;

    // Buat elemen list
    const li = document.createElement('li');

    // Buat elemen span untuk teks tugas
    const taskSpan = document.createElement('span');
    taskSpan.textContent = `${taskCount}. ${taskText}`;

    // Tombol untuk menghapus tugas
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.className = 'delete-btn';
    deleteButton.onclick = function() {
        todoList.removeChild(li);
        updateTaskNumbers(); // Memperbarui nomor urut setelah tugas dihapus
    };

    // Tombol untuk menandai tugas sebagai selesai
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Selesai';
    completeButton.onclick = function() {
        li.classList.toggle('completed');
    };

    // Tambahkan elemen span dan tombol ke list item
    li.appendChild(taskSpan);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    // Tambahkan list item ke dalam todo list
    todoList.appendChild(li);

    // Reset input
    todoInput.value = '';
}

// Fungsi untuk memperbarui nomor urut setelah tugas dihapus
function updateTaskNumbers() {
    const tasks = todoList.querySelectorAll('li');
    taskCount = 0; // Reset nomor urut
    tasks.forEach((task) => {
        taskCount++;
        task.firstChild.textContent = `${taskCount}. ${task.firstChild.textContent.split('. ')[1]}`; // Update nomor urut
    });
}

// Tambahkan event listener ke tombol tambah
addButton.addEventListener('click', addTask);

// Tambahkan event listener untuk menekan tombol Enter
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});



// const toggleTheme = document.getElementById('toogle-theme');
// const body = document.body;
// const wrapper = document.querySelector('.wrapper');


function updateDateTime() {
    const now = new Date();

    // Format the date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);
    
    // Format the time
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // Display the date and time
    document.getElementById('current-date').innerText = dateString;
    document.getElementById('current-time').innerText = timeString;

    // Display the current week's dates
    displayWeekDates(now);
}

function displayWeekDates(currentDate) {
    const weekStart = new Date(currentDate);
    const weekDates = [];

    // Set the start of the week (Sunday)
    weekStart.setDate(currentDate.getDate() - currentDate.getDay());

    // Generate the dates for the week
    for (let i = 0; i < 7; i++) {
        const weekDate = new Date(weekStart);
        weekDate.setDate(weekStart.getDate() + i);
        weekDates.push(weekDate.getDate()); // Get the date (day of the month)
    }

    // Update the HTML with the week's dates
    for (let i = 0; i < weekDates.length; i++) {
        document.getElementById(`date${i}`).innerText = weekDates[i];
    }
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Initial call to set the date and time immediately when the page loads
updateDateTime();

