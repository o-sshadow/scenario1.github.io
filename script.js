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
        { firstName: 'John', surname: 'Doe', birth: 20, address: 'A', number: 'Ms. Smith', gender: 'Math', tutour: 90, email: 'email@gmail.com' },
        { firstName: 'Jane', surname: 'Doe', birth: 22, address: 'B', number: 'Mr. Johnson', gender: 'Science', tutour: 80, email: 'email@gmail.com' },
        { firstName: 'Bob', surname: 'Smith', birth: 21, address: 'C', number: 'Ms. Johnson', gender: 'English', tutour: 70, email: 'email@gmail.com' },
    ];
    studentsTbody.innerHTML = '';
    studentsData.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.surname}</td>
            <td>${student.birth}</td>
            <td>${student.address}</td>
            <td>${student.number}</td>
            <td>${student.gender}</td>
            <td>${student.tutour}</td>
            <td>${student.email}</td>
            <td><button class="edit-btn">Edit</button> <button class="delete-btn">Delete</button></td>
        `;
        studentsTbody.appendChild(row);
    });
    // Add event listener to the add student button
    const addStudentBtn = document.getElementById('add-student-btn');
    addStudentBtn.addEventListener('click', () => {
        // Get the student's name
        const studentfirstName = prompt('First Name:');
        const studentsurname = prompt('Surname Name:');
        const studentbirth = prompt('Birth:');
        const studentaddress = prompt('Address:');
        const studentnumber = prompt('Number:');
        const studentgender = prompt('Gender:');
        const studenttutour = prompt('Tutour:');
        const studentemail = prompt('Email:');
        // Add the student to the students array
        const newStudent = { firstName: studentfirstName, surname: studentsurname, birth: studentbirth, address: studentaddress, number: studentnumber, gender: studentgender, tutour: studenttutour, email: studentemail };
        studentsData.push(newStudent);
        // Update the students table
        updateStudentsTable();
    });
}
