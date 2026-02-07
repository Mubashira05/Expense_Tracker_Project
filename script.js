// Get elements
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const expenseTable = document.getElementById('expenseTable');
const totalElement = document.getElementById('total');
const addBtn = document.getElementById('add-btn');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];


function renderExpenses() {
  expenseTable.innerHTML = '';
  let total = 0;

  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>₹${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
    `;
    expenseTable.appendChild(row);
    total += expense.amount;
  });

  totalElement.textContent = `Total: ₹${total.toFixed(2)}`;
}


function addExpense() {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;

  if (!description || isNaN(amount) || !category) {
    alert('Please fill all fields!');
    return;
  }

  const expense = {
    description,
    amount,
    category,
    date: new Date().toLocaleDateString('en-GB'),
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();


  descriptionInput.value = '';
  amountInput.value = '';
  categorySelect.value = '';
}


function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

addBtn.addEventListener('click', addExpense);


renderExpenses();
