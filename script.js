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
    const elementMessageTitle = document.querySelector("#error");
    const elementMessageContent = document.querySelector("#error-content");
    const errorMessageTitle = "please enter valid title";
    const errorMessageContent = "please enter valid content";
    if (!title && !content) {
        elementMessageTitle.innerHTML = errorMessageTitle;
        elementMessageContent.innerHTML = errorMessageContent;
    } else if(!content) {
        elementMessageTitle.innerHTML ="";
        elementMessageContent.innerHTML = errorMessageContent;
    } else if (!title) {
        errorMessageContent.innerHTML = "";
        elementMessageTitle.innerHTML = errorMessageTitle;
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
    document.querySelector('#title').addEventListener("click", () => {
        elementMessageTitle.innerHTML = "";
    })
    document.querySelector('#content').addEventListener("click", () => {
        elementMessageContent.innerHTML = "";
    })
    event.preventDefault();
}
document.querySelector("#add_button").addEventListener("click", addTodo);

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
        const wrap = document.createElement("div");
        const idTodo = document.createElement("span");
        const listElement = document.createElement("div");
        const timeTodo = document.createElement('span');
        const deleteTodo = document.createElement('i');
        const titleTodo = document.createElement('h2');
        const contentTodo = document.createElement('p');
        // create function

        createElements = () => {
            var element;
            var list = "span,span,i,h2,p";
            const wrap = document.createElement("div");
            const listElement = document.createElement("div");
            const j = list.split(',');
            for (let i = 0 ; i < j.length ; i++) {
                element = document.createElement(j[i]);

            }
        }
        
        //create function
        
        listElement.setAttribute("class","list-element");
        listElement.setAttribute("draggable","true");
        titleTodo.setAttribute("class", "main-title");
        contentTodo.setAttribute("class","main-content");
        deleteTodo.setAttribute("class","fas fa-times-circle");
        timeTodo.setAttribute("class","main-time");
        idTodo.setAttribute("class","id-todo");
        wrap.setAttribute("class","wrapper");
        const listTodo = document.getElementsByClassName("list-element");
        
        idTodo.innerHTML = listTodo.length + 1;
        timeTodo.innerHTML = currentDate;
        titleTodo.innerHTML = item.title;
        contentTodo.innerHTML = item.content;
        
        listElement.appendChild(idTodo);
        listElement.appendChild(titleTodo);
        listElement.appendChild(timeTodo);
        listElement.appendChild(deleteTodo);
        listElement.appendChild(contentTodo);
        wrap.appendChild(listElement);
        todoListElement.appendChild(wrap);
        
         deleteTodo.setAttribute("data-id", item.id);
         deleteTodo.addEventListener("click", (e) => {
            const idItem = e.target.getAttribute("data-id");
            deleteItem(idItem);
        });
    });
    dragItem();
}

const dragItem = () => {
    const listItem = document.querySelector("#myUL");
    const elements = listItem.getElementsByClassName("wrapper");
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
        })
        element.addEventListener("dragover", (e) => {
            e.preventDefault();
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
