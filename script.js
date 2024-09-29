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

// Initialize the logged in user
let loggedInUser = null;

// Add event listener to the login button
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    // Check if the username and password are correct
    if (username === 'admin' && password === 'password') {
        // Log in the user
        loggedInUser = username;
        // Show the students container
        studentsContainer.style.display = 'block';
        // Hide the login container
        document.querySelector('.login-container').style.display = 'none';
        // Update the students table
        updateStudentsTable();
    } else {
        // Show an error message
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Invalid username or password';
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
    // TO DO: implement the logic to update the students table
    const studentsData = [
        { firstName: 'John', surname: 'Doe', age: 20, grade: 'A', teacher: 'Ms. Smith', class: 'Math', score: 90 },
        { firstName: 'Jane', surname: 'Doe', age: 22, grade: 'B', teacher: 'Mr. Johnson', class: 'Science', score: 80 },
        { firstName: 'Bob', surname: 'Smith', age: 21, grade: 'C', teacher: 'Ms. Johnson', class: 'English', score: 70 },
    ];
    studentsTbody.innerHTML = '';
    studentsData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.surname}</td>
            <td>${student.age}</td>
            <td>${student.grade}</td>
            <td>${student.teacher}</td>
            <td>${student.class}</td>
            <td>${student.score}</td>
            <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
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
        // Update the students table
        updateStudentsTable();
    });
}