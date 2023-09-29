const input = document.querySelector('.input');
const ul = document.querySelector('ul');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.addBtn');
const itemsLeft = document.querySelector('.no-of-items');

let todos = [];
input.addEventListener('keypress', (e)=> {
    if (e.key === 'Enter') {
      if (input.value === '') {
        alert('You must add a todo');
      }
      else{
  e.preventDefault();
  let inputText = input.value;

  const li = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checkBox');
  checkBox.addEventListener('click',() => {
    checkBox.classList.add('checkBox-active')
  })
  const p = document.createElement('p');
  p.innerHTML = inputText;

  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('deleteBtn');
  deleteBtn.addEventListener('click', () => {
    li.remove();
    todos = todos.filter(todo => todo !== li.textContent);
    itemsLeft.innerHTML = `${todos.length} ${todos.length === 1 ? 'item' : 'items'} left`;
  });

  li.appendChild(checkBox);
  li.appendChild(p);
  li.appendChild(deleteBtn);  

  todos.push(li.textContent);
  itemsLeft.innerHTML = `${todos.length} ${todos.length === 1 ? 'item' : 'items'} left`;

  ul.appendChild(li);
  input.value = '';
  }
}
})
