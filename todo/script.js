document.addEventListener('DOMContentLoaded', () => {
    const taskContainer = document.getElementById('task-container');
    const closeButton = document.getElementById('close');
    const openButton = document.getElementById('new-task');
    const submitButton = document.getElementById('submit');
    const todoItemContainer = document.getElementById('todo-items');

    // Function to load todos from localStorage
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];

        todos.forEach(todo => {
            const todoItem = createTodoElement(todo);
            todoItemContainer.appendChild(todoItem);
        });
    };

    // Function to save todos to localStorage
    const saveTodos = todos => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Function to create a new todo item
    const createTodoElement = ({ title, date, priority, category, completed }) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        todoItem.innerHTML = `
            <div class="todo-details">
                <div class="title ${completed ? 'completed' : ''}">${title}</div>
                <div class="info-line">
                    <span class="due-date">Due date: ${date}</span>
                    <span class="category">Category: ${category}</span>
                    <span class="priority">Priority: ${priority}</span>
                </div>
            </div>
            <div class="button-container">
                <button class='completed-btn'>Completed</button>
                <button class='delete-btn'>Delete</button>
            </div>`;

        // Event listener for delete button
        const deleteButton = todoItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            todoItem.classList.add('delete-animation');
            setTimeout(() => {
                todoItem.remove();
                const todos = JSON.parse(localStorage.getItem('todos')) || [];
                const updatedTodos = todos.filter(todo => todo.title !== title);
                saveTodos(updatedTodos);
            }, 500);
        });

        // Event listener for completed button
        const completedButton = todoItem.querySelector('.completed-btn');
        completedButton.addEventListener('click', () => {
            const titleElement = todoItem.querySelector('.title');
            titleElement.classList.toggle('completed');
            const todos = JSON.parse(localStorage.getItem('todos')) || [];
            const updatedTodos = todos.map(todo => {
                if (todo.title === title) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
            saveTodos(updatedTodos);
        });

        return todoItem;
    };

    // Load todos from localStorage when DOM is loaded
    loadTodos();

    // Event listener for opening task creation form
    openButton.addEventListener('click', () => {
        taskContainer.style.display = 'flex';
    });

    // Event listener for closing task creation form
    closeButton.addEventListener('click', () => {
        taskContainer.style.display = 'none';
    });

    // Event listener for form submission
    submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        const formInput = document.getElementById('form-input').value.trim();
        const formDate = document.getElementById('form-date').value.trim();
        const formPriority = document.getElementById('form-priority').value.trim();
        const formCategory = document.getElementById('form-category').value.trim();

        if (formInput === '' || formDate === '' || formPriority === '' || formCategory === '') {
            alert('Enter all the values');
            return;
        }

        // Create new todo object
        const newTodo = {
            title: formInput,
            date: formDate,
            priority: formPriority,
            category: formCategory,
            completed: false // Initially set as not completed
        };

        // Create todo element and append to todo list
        const todoItem = createTodoElement(newTodo);
        todoItemContainer.appendChild(todoItem);

        // Clear form inputs after submission
        document.getElementById('form-input').value = '';
        document.getElementById('form-date').value = '';
        document.getElementById('form-priority').value = 'High';
        document.getElementById('form-category').value = 'Work';

        // Hide task creation form
        taskContainer.style.display = 'none';

        // Save updated todos to localStorage
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(newTodo);
        saveTodos(todos);
    });
});
