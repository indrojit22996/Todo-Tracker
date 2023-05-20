let submitBtn = document.querySelector(".submit-btn");
let todoList = document.querySelector(".todolist");
let todoFinalList = document.querySelector(".todofinal");
// Url
const url = "4ea818685ecd41bd9dd567a4d1f3aeee";
// Creat Edit
const correctButton = document.createElement("button");
correctButton.textContent = "Done";
correctButton.className = "btn";
// Create Delete
const rongButton = document.createElement("button");
rongButton.textContent = "Not Done";
rongButton.className = "btn";

// New show function
function finalTosoList(todo) {
  const newLi = document.createElement("li");
  newLi.textContent = JSON.stringify(
    "Name =" + todo.name + " , " + " Desceription= " + todo.des
  );

  todoFinalList.appendChild(newLi);
}

// show function
function showData(todo) {
  let liItem = document.createElement("li");
  liItem.className = "display-6";
  liItem.textContent = JSON.stringify(
    "Name =" + todo.name + " , " + " Desceription= " + todo.des
  );
  liItem.appendChild(rongButton);
  liItem.appendChild(correctButton);
  liItem.id = todo._id;
  todoList.appendChild(liItem);
}

// PUT request
let todoEliment = null;
function update(todo) {
  if (editEliment === null) {
    postRequest(todo);
  } else {
    axios
      .put(
        `https://crudcrud.com/api/${url}/AppiointmentDetali/${todoEliment}`,
        todo
      )
      .then((response) => {
        console.log(response);
        todo._id = editEliment;
        finalTosoList(todo);

        todoEliment = null;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

// POST request
function post(todo) {
  console.log(todo);
  axios
    .post(`https://crudcrud.com/api/${url}/TodoDetails`, todo)
    .then((response) => {
      console.log(response);
      showData(response.data);

      // todoList.removeChild(liItem);
      // todoList.removeChild(rongButton);
      // todoList.removeChild(correctButton);
      // todoFinalList.appendChild(rongButton);
      // todoFinalList.appendChild(correctButton);
    })
    .catch((error) => {
      console.log(error);
    });
}

// GET Request At Dom Loaded
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`https://crudcrud.com/api/${url}/TodoDetails`)
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        finalTosoList(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
// Submit Btn Click Function
submitBtn.addEventListener("click", () => {
  console.log("click");
  let todoName = document.querySelector(".todoname").value;
  let todoDes = document.querySelector(".tododes").value;

  let todo = {
    name: todoName,
    des: todoDes,
  };
  // clling Post
  post(todo);
  // calling Show data

  // Edit Function
  correctButton.addEventListener("click", () => {
    finalTosoList(todo);
    document.getElementById(todoId).remove();
    console.log("correct");
  });
  // delete Function
  rongButton.addEventListener("click", (event) => {
    const todoId = event.target.parentElement.id;
    console.log(todo);
    axios
      .delete(`https://crudcrud.com/api/${url}/TodoDetails/${todoId}`)
      .then((response) => {
        console.log(response);
        document.getElementById(todoId).remove();
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
