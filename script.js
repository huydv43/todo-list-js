const todoList = [];
const todoListElement = document.querySelector('#myUL')
const day = new Date();
const currentDate = [day.getDate(), day.getMonth() + 1, day.getFullYear()].join("/");
document.querySelector("#add_button").addEventListener("click", addTodo);

function addTodo(event){
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    

    if (title === '' || content === '') {
        const errorMessage = "please enter valid form";
        const elementMessage = document.querySelector("#error");
        elementMessage.innerHTML = errorMessage;
      } else {
          const Todo = {
            id: todoList.length,
            title: title,
            content: content,
            day: currentDate,
          };
          todoList.push(Todo);
          displayTodos();
        }
    event.preventDefault();
}
function clearMessage() {
  const elementError = document.querySelector("#error");
  elementError.innerHTML = "";
}

function deleteItem(x) {
  todoList.splice(
    todoList.findIndex((item) => item.id == x),
    1
  );
  displayTodos();
}

function displayTodos(){
    todoListElement.innerHTML = '';
    document.querySelector("#title").value = '';
    document.querySelector("#content").value = '';
    todoList.forEach((item) =>{
        const idTodo = document.createElement("span");
        const listElement = document.createElement("div");
        const timeTodo = document.createElement('span');
        const deleteTodo = document.createElement('span');
        const titleTodo = document.createElement('h2');
        const contentTodo = document.createElement('p');
        
        listElement.setAttribute("class","list-element");
        titleTodo.setAttribute("class", "title");
        contentTodo.setAttribute("class","main-content");
        deleteTodo.setAttribute("class","btn-delete");
        timeTodo.setAttribute("class","time");
        idTodo.setAttribute("class","id-todo");
        
        idTodo.innerHTML = item.id + 1;
        timeTodo.innerHTML = currentDate;
        titleTodo.innerHTML = item.title;
        contentTodo.innerHTML = item.content;
        deleteTodo.innerHTML = "X";
        
        listElement.appendChild(idTodo);
        listElement.appendChild(titleTodo);
        listElement.appendChild(timeTodo);
        listElement.appendChild(deleteTodo);
        listElement.appendChild(contentTodo);
        
        todoListElement.appendChild(listElement);
        
        
         deleteTodo.setAttribute("data-id", item.id);
         deleteTodo.addEventListener("click", function (e) {
           const idItem = e.target.getAttribute("data-id");
           deleteItem(idItem);
         });
    });
    clearMessage();
}