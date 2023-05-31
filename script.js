//defining expenses array to store and manipulate the expenses
let expenses =  [];

// Function to add an expense
function addExpense(event) {
    event.preventDefault();

    const amountInput = document.getElementById('amount');
    const descriptionInput = document.getElementById('description');
    const categoryInput = document.getElementById('category');

    const amount = amountInput.value;
    const description = descriptionInput.value;
    const category = categoryInput.value;

    // Create a new expense object
    const expense = {
        amount: amount,
        description: description,
        category: category
    };

    // Add the expense to the expenses array
    expenses.push(expense);

    // Saving the expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Clear the input fields
    amountInput.value = '';
    descriptionInput.value = '';

    // Refresh the expense table
    displayExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
    // Remove the expense from the expenses array
    expenses.splice(index, 1);

    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Refresh the expense table
    displayExpenses();
}

// Function to display the expenses
function displayExpenses() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        const amountCell = document.createElement('td');
        amountCell.textContent = expense.amount;
        row.appendChild(amountCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = expense.description;
        row.appendChild(descriptionCell);

        const categoryCell = document.createElement('td');
        categoryCell.textContent = expense.category;
        row.appendChild(categoryCell);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editExpense(index));
        actionCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteExpense(index));
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}

// Function to edit an expense
function editExpense(index) {
    const expense = expenses[index];

    // Prompt the user to enter the updated values
    const updatedAmount = prompt('Enter the updated amount:', expense.amount);
    const updatedDescription = prompt('Enter the updated description:', expense.description);
    const updatedCategory = prompt('Enter the updated category:', expense.category);

    // Update the expense object
    expense.amount = updatedAmount;
    expense.description = updatedDescription;
    expense.category = updatedCategory;

    // Save the updated expenses array to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Refresh the expense table
    displayExpenses();
}

// Initial display of expenses
displayExpenses();

// Submit event listener for the expense form
const expenseForm = document.getElementById('expenseForm');
expenseForm.addEventListener('submit', addExpense);
