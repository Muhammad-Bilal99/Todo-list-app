const input = document.querySelector('.input');
const ul = document.querySelector('ul');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.addBtn');
const itemsLeft = document.querySelector('.no-of-items');

let todos = [];

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