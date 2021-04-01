const todoList = [];
const todoListElement = document.querySelector('#myUL')
const day = new Date();
const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const currentDate = 
    monthNamesShort[day.getMonth()] + " " +
    day.getDate()+ "," +
    day.getFullYear();

 addTodo = (event) => {
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    const elementMessage = document.querySelector("#error");
    if (title === '') {
        const errorMessageTitle = "please enter valid title";
        elementMessage.innerHTML = errorMessageTitle;
    } else if(content === '') {
        const errorMessageContent = "please enter valid content";
        elementMessage.innerHTML = errorMessageContent;
    }
     else {
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
document.querySelector("#add_button").addEventListener("click", addTodo);
clearMessage = () => {
    const elementError = document.querySelector("#error");
    elementError.innerHTML = "";
}

deleteItem = (x) => {
    todoList.splice(
        todoList.filter((item) => item.id === x),
        1
    );
    displayTodos();
}

displayTodos = () => {
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
        listElement.setAttribute("draggable","true");
        titleTodo.setAttribute("class", "main-title");
        contentTodo.setAttribute("class","main-content");
        deleteTodo.setAttribute("class","btn-delete");
        timeTodo.setAttribute("class","main-time");
        idTodo.setAttribute("class","id-todo");
        const listTodo = document.getElementsByClassName("list-element");
        
        idTodo.innerHTML = listTodo.length + 1;
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
         deleteTodo.addEventListener("click", (e) => {
            const idItem = e.target.getAttribute("data-id");
            deleteItem(idItem);
        });
    });
    dragItem();
    clearMessage();
}

const dragItem = () => {
    const listItem = document.querySelector("#myUL");
    const elements = listItem.getElementsByClassName("list-element");
    let currentItem = null;
    for (let element of elements) {
        element.addEventListener("dragstart", (e) => {
            currentItem = element;
            currentItem.classList.add("hint");
            
        });
        element.addEventListener("dragenter", (e) => {
                // element.classList.add("active");
        });
        element.addEventListener("dragend", () => {
            element.classList.remove("hint");
            element.classList.remove("active");
            
        })
        element.addEventListener("dragover", (e) => {
            e.preventDefault();
            element.classList.remove("active");
        })
        element.addEventListener("drop", (e) => {
            if (element != currentItem) {
                let currentpos = 0, droppedpos = 0;
            for (let it = 0 ; it < elements.length ; it++) {
                if (currentItem == elements[it]) { currentpos = it; }
                if (element == elements[it]) { droppedpos = it; }
            }
            if (currentpos < droppedpos) {
                element.parentNode.insertBefore(currentItem, element.nextSibling );
            } else {
                element.parentNode.insertBefore(currentItem, element);
            }
            autoSetId();
            }
        });

    }
}

autoSetId = () => {
    let listIdTodo = document.getElementsByClassName("id-todo");
    for(let i = 0 ; i <listIdTodo.length ; i++){
        listIdTodo[i].innerHTML = i + 1;
    }
  
}
