const todoList = [];
const todoListElement = document.querySelector('#myUL')
document.querySelector('#add_button').addEventListener("click", addTodo);

function addTodo(event){
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    // console.log(title);
    // console.log(content);
    

    if(title === '' || content === ''){
        alert('nhap todo');
    }
    else{
        const Todo = {
          id: todoList.length,
          title: title,
          content: content,
          date: new Date(),
        };
        todoList.push(Todo);
        displayTodos();
    }
    event.preventDefault();
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
        const listElement = document.createElement("div");
        const span = document.createElement('span');
        const spanDelete = document.createElement('span');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const currentDate = item.date;
        const month = currentDate.getUTCMonth() + 1;
        const day = currentDate.getUTCDate();
        const year = currentDate.getUTCFullYear();
        newdate = year + "/" + month + "/" + day;
        listElement.setAttribute("class","list-element");
        h2.setAttribute("class","title");
        spanDelete.setAttribute("class","btn-delete");
        span.setAttribute("class","time");
        
        
        span.innerHTML = newdate;
        h2.innerHTML = item.title;
        p.innerHTML = item.content;
        spanDelete.innerHTML = "X";
        // listElement.appendChild(spanDelete);
        listElement.appendChild(h2);
        listElement.appendChild(span);
        listElement.appendChild(p);
        todoListElement.appendChild(listElement);
        todoListElement.appendChild(spanDelete);
        
         spanDelete.setAttribute("data-id", item.id);
         spanDelete.addEventListener("click", function (e) {
           const idItem = e.target.getAttribute("data-id");
           deleteItem(idItem);
         });
    });
    
}