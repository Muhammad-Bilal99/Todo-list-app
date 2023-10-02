const input = document.querySelector('.input');
const ul = document.querySelector('ul');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.addBtn');
const itemsLeft = document.querySelector('.no-of-items');
const activeBtn = document.querySelector('.activeBtn');
const all = document.querySelector('.all');
const completed = document.querySelector('.completed');

let todos = [];
let checkedTodos = [];

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (input.value === '') {
      alert('You must add a todo');
    } else {
      e.preventDefault();
      let inputText = input.value;

      const li = document.createElement('li');
      li.draggable = true; // Make the li element draggable

      const checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.classList.add('checkBox');
      checkBox.addEventListener('click', () => {
        checkBox.classList.add('checkBox-active');
        if (checkBox.checked) {
          // Add the checked li element to the checkedTodos array
          checkedTodos.push(li);
        } else {
          // Remove the unchecked li element from the checkedTodos array
          checkedTodos = checkedTodos.filter((todo) => todo !== li);
        }
        console.log(checkedTodos);
      });

      const p = document.createElement('p');
      p.innerHTML = inputText;

      const deleteBtn = document.createElement('button');
      deleteBtn.classList.add('deleteBtn');
      deleteBtn.addEventListener('click', () => {
        li.remove();
        todos = todos.filter((todo) => todo !== li.textContent);
        itemsLeft.innerHTML = `${todos.length} ${
          todos.length === 1 ? 'item' : 'items'
        } left`;
      });

      li.appendChild(checkBox);
      li.appendChild(p);
      li.appendChild(deleteBtn);

      todos.push(li.textContent);
      itemsLeft.innerHTML = `${todos.length} ${
        todos.length === 1 ? 'item' : 'items'
      } left`;

      ul.appendChild(li);
      input.value = '';

      // Add drag-and-drop event listeners
      li.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', li.textContent);
      });

      li.addEventListener('dragover', (e) => {
        e.preventDefault();
      });

      li.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const sourceIndex = todos.indexOf(data);
        const targetIndex = todos.indexOf(li.textContent);

        if (sourceIndex !== -1 && targetIndex !== -1) {
          // Swap the todos in the array
          [todos[sourceIndex], todos[targetIndex]] = [
            todos[targetIndex],
            todos[sourceIndex],
          ];

          // Update the list order
          ul.insertBefore(ul.children[sourceIndex], ul.children[targetIndex]);
        }
      });
    }
  }
});

// Add an event listener to the activeBtn
activeBtn.addEventListener('click', () => {
  document.querySelector('.active').classList.remove('active');
  activeBtn.classList.add('active');
  // Iterate through the checkedTodos array and remove each checked li element
  checkedTodos.forEach((checkedLi) => {
    checkedLi.remove();

    // Remove the corresponding item from the todos and checkedTodos arrays
    todos = todos.filter((todo) => todo !== checkedLi.textContent);
    checkedTodos = checkedTodos.filter((checkedTodo) => checkedTodo !== checkedLi);
  });

  // Clear the checkedTodos array
});

// Add an event listener to the "All" button
all.addEventListener('click', () => {
  document.querySelector('.active').classList.remove('active');
  all.classList.add('active');
  
  // Show all li elements
  todos.forEach((todo) => {
    const liElement = ul.querySelector(`li:contains("${todo}")`);
    if (liElement) {
      liElement.style.display = 'block';
    }
  });
});

// Add an event listener to the "Completed" button
completed.addEventListener('click', () => {
  document.querySelector('.active').classList.remove('active');
  completed.classList.add('active');
  
  // Hide all li elements
  todos.forEach((todo) => {
    const liElement = ul.querySelector(`li:contains("${todo}")`);
    if (liElement) {
      liElement.style.display = 'none';
    }
  });
  
  // Show only checked li elements
  checkedTodos.forEach((checkedLi) => {
    checkedLi.style.display = 'block';
  });
});
