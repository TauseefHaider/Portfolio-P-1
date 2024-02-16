let $toggle = document.getElementById("toggle");
let $sidebar = document.getElementById("mob-sidebar");
const activeuser = localStorage.getItem("activeuser");
let users = [];
let currentUser;

const currentUsers = localStorage.getItem("currentUsers");

// check Auth func

checkAuth();

// menu btn

if ($toggle) {
  $toggle.addEventListener("click", function () {
    if ($sidebar.classList.contains("hidden")) {
      $sidebar.classList.replace("hidden", "flex");
    } else {
      $sidebar.classList.replace("flex", "hidden");
    }
  });
}

// percentage circle

let $circle = document.getElementById("progress-circle");
let $percent = document.getElementById("progress-percent");
let progressStartValue = "0";
let progressEndValue = "90";
const speed = 20;
let progress = setInterval(() => {
  progressStartValue++;
  if ($percent) {
    $percent.textContent = `${progressStartValue}`;
  }
  if ($circle) {
    $circle.style.background = `conic-gradient(#51d289 ${
      progressStartValue * 3.5
    }deg, #ededed 0deg)`;
  }

  if (progressStartValue == progressEndValue) {
    clearInterval(progress);
  }
}, speed);

// UserName Show on Head

function username() {
  const $username = document.getElementById("user-name");

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find the current user in the array
  const currentUserObject = users.find((user) => user.email === activeuser);

  // Check if userData exists for the current user
  const profile =
    currentUserObject && currentUserObject.name ? currentUserObject.name : [];

  $username.textContent = profile;
}

username();

// Income Expense btn

let $incomeBtn = document.getElementById("income-btn");
let $expenseBtn = document.getElementById("expense-btn");
let $incomeInput = document.getElementById("income-input");
let $expenseInput = document.getElementById("expense-input");

if ($incomeBtn) {
  $incomeBtn.addEventListener("click", function () {
    if ($expenseBtn.classList.contains("hidden")) {
      $expenseInput.classList.replace("hidden", "block");
      $incomeInput.classList.replace("block", "hidden");
    } else {
      $incomeInput.classList.replace("hidden", "block");
      $expenseInput.classList.replace("block", "hidden");
    }
  });
}

if ($expenseBtn) {
  $expenseBtn.addEventListener("click", function () {
    if ($incomeBtn.classList.contains("hidden")) {
      $incomeInput.classList.replace("hidden", "block");
      $expenseInput.classList.replace("block", "hidden");
    } else {
      $expenseInput.classList.replace("hidden", "block");
      $incomeInput.classList.replace("block", "hidden");
    }
  });
}

// Auth Func

function checkAuth() {
  if (!activeuser) {
    location.assign("./login.html");
  } else {
    console.log({ users });
    currentUser = users.find((user) => user.email === activeuser);
  }
}

// income input data

var selectElement = document.getElementById("selectValue-income");
if (selectElement) {
  function populateSelect() {
    // Retrieve categories from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the current user in the array
    const currentUserObject = users.find((user) => user.email === activeuser);

    // Check if userData exists for the current user
    const income =
      currentUserObject && currentUserObject.income
        ? currentUserObject.income
        : [];

    // Populate select options
    income.forEach(function (category) {
      var option = document.createElement("option");
      option.value = category;
      option.text = category;
      selectElement.add(option);
    });
  }
}
// Initial population of the select dropdown
var selectElement2 = document.getElementById("selectValue-expense");
if (selectElement2) {
  function populateSelect1() {
    // Retrieve categories from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find the current user in the array
    const currentUserObject = users.find((user) => user.email === activeuser);

    // Check if userData exists for the current user
    const expense =
      currentUserObject && currentUserObject.expense
        ? currentUserObject.expense
        : [];

    // Populate select options
    expense.forEach(function (category) {
      var option = document.createElement("option");
      option.value = category;
      option.text = category;
      selectElement2.add(option);
    });
  }
}

function logout() {
  // Clear the relevant data from local storage
  localStorage.removeItem("activeuser");
  location.replace("./login.html");
}
