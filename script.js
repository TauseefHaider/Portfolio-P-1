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
console.log(profile);
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

// input data

const $txtincomeInpute = document.getElementById("txtincome-input");
const $incomeSelect = document.getElementById("selectValue-income");
const $incomeDate = document.getElementById("income-date-input");
const $saveIncome = document.getElementById("save-income");
const $txtexpenseInpute = document.getElementById("txtexpense-input");
const $expenseSelect = document.getElementById("selectValue-expense");
const $expenseDate = document.getElementById("expense-date-input");
const $saveExpense = document.getElementById("save-expense");
let incomeData = [];

function handleSubmitIncome() {
  const income = $txtincomeInpute.value;
  const source = $incomeSelect.value;
  const incomeDate = $incomeDate.value;

  const userIncome = {
    income,
    source,
    incomeDate,
  };
  if (currentUser?.incomeData) {
    currentUser.incomeData.push(userIncome);
    const userIndex = users.findIndex(
      (user) => user.email === currentUser.email
    );
    users.splice(userIndex, 1, currentUser);
    localStorage.setItem("user", JSON.stringify(users));
  } else {
    localStorage.setItem("currentUser", incomeData);
    currentUser.incomeData = [userIncome];
    const userIndex = users.findIndex(
      (user) => user.email === currentUser.email
    );
    users.splice(userIndex, 1, currentUser);
    localStorage.setItem("users", JSON.stringify(users));
  }
}

$saveIncome.addEventListener("click", handleSubmitIncome);
