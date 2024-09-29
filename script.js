const fs = require('fs');

// Get the login form and register form
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Get the login button and register button
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Get the register link
const registerLink = document.getElementById('register-link');

// Get the students container and table
const studentsContainer = document.getElementById('students-container');
const studentsTable = document.getElementById('students-table');
const studentsTbody = document.getElementById('students-tbody');

// Get the username and password input fields
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Get the error message element
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Initialize the logged in user
let loggedInUser = null;

// Initialize the students data
let studentsData = [];

// Function to load students data from JSON file
function loadStudentsData() {
    fs.readFile('students.json', 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Create a new JSON file if it doesn't exist
                fs.writeFile('students.json', '[]', (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('New JSON file created');
                });
            } else {
                console.error(err);
                return;
            }
        } else {
            studentsData = JSON.parse(data);
            if (studentsData.length > 0) {
                updateStudentsTable();
            }
        }
    });
}

// Function to save students data to JSON file
function saveStudentsData() {
    const jsonData = JSON.stringify(studentsData);
    fs.writeFile('students.json', jsonData, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Students data saved to JSON file');
    });
}

// Add event listener to the login button
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    // Check if the username and password are correct
    if (username === 'admin' && password === 'password') {
        // Log in the user
        loggedInUser = username;
        // Show the success message
        successMessage.style.display = 'block';
        successMessage.textContent = 'Login successful!';
        // Hide the error message
        errorMessage.style.display = 'none';
        // Show the students container
        studentsContainer.style.display = 'block';
        // Hide the login container
        document.querySelector('.login-container').style.display = 'none';
        // Load students data from JSON file
        loadStudentsData();
    } else {
        // Show an error message
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Invalid username or password';
        // Hide the success message
        successMessage.style.display = 'none';
        // Clear the input fields
        usernameInput.value = '';
        passwordInput.value = '';
    }
});

// Add event listener to the register link
registerLink.addEventListener('click', () => {
    // Show the register form
    document.querySelector('.register-container').style.display = 'block';
    // Hide the login form
    document.querySelector('.login-container').style.display = 'none';
});

// Add event listener to the register button
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Hide the register form
    document.querySelector('.register-container').style.display = 'none';
    // Show the login form
    document.querySelector('.login-container').style.display = 'block';
    // Clear the input fields
    usernameInput.value = '';
    passwordInput.value = '';
});

// Function to update the students table
function updateStudentsTable() {
    studentsTbody.innerHTML = '';
    studentsData.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.surname}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.teacher}</td>
            <td>${student.class}</td>
            <td>${student.score}</td>
            <td><button class="edit-btn" onclick="editStudent(${index})">Edit</button> <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
        `;
        studentsTbody.appendChild(row);
    });
    // Add event listener to the add student button
    const addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn.addEventListener('click', () => {
        // Get the student's name
        const studentName = prompt('Enter the student\'s name');
        // Add the student to the students array
        const newStudent = { firstName: studentName, surname: '', age: '', grade: '', teacher: '', class: '', score: '' };
        studentsData.push(newStudent);
        // Save students data to JSON file
        saveStudentsData();
        // Update the students table
        updateStudentsTable();
    });
}

// Call the loadStudentsData function to load the students data
loadStudentsData();