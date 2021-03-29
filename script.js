const todoList = [];
const todoListElement = document.querySelector('#myUL')
document.querySelector('#add_button').addEventListener("click", addTodo);

function addTodo(){
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
    // console.log(title);
    // console.log(content);
    

    if(title === '' || content === ''){
        alert('nhap todo');
    }
    else{
        const Todo = {
          id: todoList.length + 1,
          title: title,
          content: content,
          date: new Date(),
        };
        todoList.push(Todo);
        displayTodos();
    }
}
function deleteItem(x) {
  todoList.splice(
    todoList.filter((item) => item.id === x),
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

        listElement.setAttribute("data-id", item.id);
        spanDelete.setAttribute("data-id", item.id);
        Object.assign(listElement.style, {
          padding: "15px",
          border: "1px solid #3333",
          width: "400px",
          "margin-left": "30px",
          "margin-top": "30px",
          "margin-bottom": "30px",
          "border-radius": "5px"
        });
         Object.assign(h2.style, {
           width: "250px"
         });
          Object.assign(spanDelete.style, {
            //   "margin-top" : "0",
            // "border-radius": "100%",
            "background-color": "#3333",
            float: "right"
            
          });
        span.innerHTML = newdate;
        h2.innerHTML = item.title;
        p.innerHTML = item.content;
        spanDelete.innerHTML = "X";
        listElement.appendChild(spanDelete);
        listElement.appendChild(h2);
        listElement.appendChild(span);
        listElement.appendChild(p);
        todoListElement.appendChild(listElement);

        

         spanDelete.addEventListener("click", function (e) {
           const delId = e.target.getAttribute("data-id");
           console.log(delId);
           deleteItem(delId);
         });
         console.log(todoList);
    });

}