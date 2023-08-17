const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
todoList = document.getElementById('todoList');



const addTodo = () => {
   inputBox.focus();
   inputText = inputBox.value;
   if (inputText.length <= 0) {
      alert("You must add a todo!")
      return false;
   }

   if (addBtn.value === 'Edit') {
      editTodo.target.previousElementSibling.innerHTML = inputText;
      addBtn.value = "Add";
      inputBox.value = "";
   }
   else{

   // creating li and p tag
   const li = document.createElement('li')
   const p = document.createElement('p')
   p.innerHTML = inputText;
   li.appendChild(p);

   const editBtn = document.createElement('button');
   editBtn.classList.add('editBtn');
   editBtn.innerHTML = 'Edit';
   li.appendChild(editBtn);

   const deleteBtn = document.createElement('button');
   deleteBtn.classList.add('deleteBtn');
   deleteBtn.innerHTML = 'Delete';
   li.appendChild(deleteBtn);

   todoList.appendChild(li);
   inputBox.value = "";
   
};
};

let editTodo = null;


const updateTodo = (e) => {
   if (e.target.innerHTML === "Delete") {
      todoList.removeChild(e.target.parentElement);
   }
   if (e.target.innerHTML === "Edit") {
      inputBox.value = e.target.previousElementSibling.innerHTML;
      inputBox.focus();
      addBtn.value = "Edit";
      editTodo = e;
   }
};

const saveLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = []
   }
   else{
      todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

const getLocalTodos = () => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else{
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo => {
   // creating li and p tag
   const li = document.createElement('li')
   const p = document.createElement('p')
   p.innerHTML = todo;
   li.appendChild(p);

   const editBtn = document.createElement('button');
   editBtn.classList.add('editBtn');
   editBtn.innerHTML = 'Edit';
   li.appendChild(editBtn);

   const deleteBtn = document.createElement('button');
   deleteBtn.classList.add('deleteBtn');
   deleteBtn.innerHTML = 'Delete';
   li.appendChild(deleteBtn);

   todoList.appendChild(li);
      });
   }
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);

