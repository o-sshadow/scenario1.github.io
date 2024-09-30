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
  fetch('api.php?students')
    .then(response => response.json())
    .then(data => {
      studentsTbody.innerHTML = '';
      data.forEach(student => {
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
          <td>
            <button class="edit-btn">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="delete-btn">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        `;
        studentsTbody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}

// Add event listener to the add student button
const addStudentBtn = document.getElementById('add-student-btn');
addStudentBtn.addEventListener('click', () => {
  const studentfirstName = prompt('First Name:');
  const studentsurname = prompt('Surname Name:');
  const studentbirth = prompt('Birth:');
  const studentaddress = prompt('Address:');
  const studentnumber = prompt('Number:');
  const studentgender = prompt('Gender:');
  const studenttutour = prompt('Tutour:');
  const studentemail = prompt('Email:');
  fetch('api.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `firstName=${studentfirstName}&surname=${studentsurname}&birth=${studentbirth}&address=${studentaddress}&number=${studentnumber}&gender=${studentgender}&tutour=${studenttutour}&email=${studentemail}`
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  updateStudentsTable();
});