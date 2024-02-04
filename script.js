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

const $username = document.getElementById("user-name");

const profile = JSON.parse(localStorage.getItem("users"));

$username.textContent = profile[0].name;

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

const $txtincomeInpute = document.getElementById("txtincome-input");
const $incomeSelect = document.getElementById("selectValue-income");
const $incomeDate = document.getElementById("income-date-input");
const $saveIncome = document.getElementById("save-income");

let incomeData = [];

function handleSubmitIncome() {
  const money = $txtincomeInpute.value;
  const source = $incomeSelect.value;
  const date = $incomeDate.value;

  if (!money) {
    alert("Put Your Income");
    return;
  }
  if (!date) {
    alert("Add Date");
    return;
  }

  const userData = {
    money,
    source,
    date,
    type: "Income",
    delete: "Delete",
  };

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];

  existingData.push(userData);

  localStorage.setItem("userData", JSON.stringify(existingData));

  displayData();
  cleanupSlate();
}

// displaying data in table

function displayData() {
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const tableBody = document.querySelector("#dataTable tbody");

  tableBody.innerHTML = "";

  userData.forEach((user) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = user.type;
    cell2.textContent = user.money;
    cell3.textContent = user.source;
    cell4.textContent = user.date;
    cell5.textContent = user.delete;
  });
}

function cleanupSlate() {
  $txtincomeInpute.value = "";
  $incomeSelect.value = "Not Categorized";
  $incomeDate.value = "";
}

displayData();

$saveIncome.addEventListener("click", handleSubmitIncome);

// Expense Input
const $txtexpenseInpute = document.getElementById("txtexpense-input");
const $expenseSelect = document.getElementById("selectValue-expense");
const $expenseDate = document.getElementById("expense-date-input");
const $saveExpense = document.getElementById("save-expense");

function handleSubmitExpense() {
  const money = $txtexpenseInpute.value;
  const source = $expenseSelect.value;
  const date = $expenseDate.value;

  if (!money) {
    alert("Put Your Expense");
    return;
  }
  if (!date) {
    alert("Add Date");
    return;
  }

  const userData = {
    money,
    source,
    date,
    type: "Expense",
    delete: "Delete",
  };

  const existingData = JSON.parse(localStorage.getItem("userData")) || [];

  existingData.push(userData);

  localStorage.setItem("userData", JSON.stringify(existingData));

  displayDataEx();
  cleanupSlateEx();
}

// displaying data in table

function displayDataEx() {
  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const tableBody = document.querySelector("#dataTable tbody");

  tableBody.innerHTML = "";

  userData.forEach((user) => {
    const row = tableBody.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);

    cell1.textContent = user.type;
    cell2.textContent = user.money;
    cell3.textContent = user.source;
    cell4.textContent = user.date;
    cell5.textContent = user.delete;
  });
}

function cleanupSlateEx() {
  $txtexpenseInpute.value = "";
  $expenseSelect.value = "Not Categorized";
  $expenseDate.value = "";
}

displayData();
displayDataEx();

$saveExpense.addEventListener("click", handleSubmitExpense);
