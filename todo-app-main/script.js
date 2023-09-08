const input = document.querySelector('.input');
const ul = document.querySelector('ul');
const todoList = document.querySelector('.todo-list');
const addBtn = document.querySelector('.addBtn')

input.addEventListener('keypress', (e)=> {
    if (e.key === 'Enter') {
      if (input.value === '') {
        alert('You must add a todo')
      }
      else{
  e.preventDefault();
  let inputText = input.value;

  const li = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  checkBox.classList.add('checkBox');
  const p = document.createElement('p');
  p.innerHTML = inputText;
  li.appendChild(checkBox);
  li.appendChild(p);


  todoList.appendChild(li)
  input.value = ''
}
}
})
