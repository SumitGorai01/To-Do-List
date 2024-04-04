const todoValue = document.getElementById("text");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateOnClick");
let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}
function CreateToDoItems() {
  if (todoValue.value === "") {
    Swal.fire({
      title: "<strong>Sorry !</strong>",
      icon: "info",
      html: `
          Please Enter Your Task First!
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Great!
        `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
      cancelButtonAriaLabel: "Thumbs down"
    });
    todoValue.focus();
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      Swal.fire({
        title: "<strong>Ohh!</strong>",
        icon: "info",
        html: `
            Task is already Present!
          `,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Great!
          `,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `
            <i class="fa fa-thumbs-down"></i>
          `,
        cancelButtonAriaLabel: "Thumbs down"
      });
      return;
    }

    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div><div>
      <i class="fa-solid fa-pen-to-square edit todo-controls" onclick="UpdateToDoItems(this)"></i>
      <i class="fas fa-trash delete todo-controls" onclick="DeleteToDoItems(this)"></i></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    if (!todo) {
      todo = [];
    }
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
  }
  todoValue.value = "";
  Swal.fire({
    title: "<strong>Hurry !</strong>",
    icon: "success",
    html: `
       To-Do Task Added Successfully !
      `,
    showCancelButton: true,
    focusConfirm: false,
    timer: 3000,
    confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
    cancelButtonAriaLabel: "Thumbs down"
  });
}

function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div ${style} title="Double Click to Complete the Task" ondblclick="CompletedToDoItems(this)">${element.item
      }
      ${style === ""
        ? ""
        : '<i class="fa-solid fa-check todo-controls"></i>'
      }</div><div>
      ${style === ""
        ? '<i class="fa-solid fa-pen-to-square edit todo-controls" onclick="UpdateToDoItems(this)"></i>'
        : ""
      }
      <i class="fas fa-trash delete todo-controls" onclick="DeleteToDoItems(this)"></i></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}
ReadToDoItems();

function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.classList.add("fa-solid", "fa-rotate");
    todoValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == todoValue.value) {
      IsPresent = true;
    }
  });

  if (IsPresent) {
    Swal.fire({
      title: "<strong>Ohh!</strong>",
      icon: "info",
      html: `
          Task is already Present in the list!
        `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `
          <i class="fa fa-thumbs-up"></i> Great!
        `,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: `
          <i class="fa fa-thumbs-down"></i>
        `,
      cancelButtonAriaLabel: "Thumbs down"
    });
    return;
  }

  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.classList.add("fa-solid", "fa-plus");
  todoValue.value = "";
  Swal.fire({
    title: "<strong>Hurry !</strong>",
    icon: "success",
    html: `
        Task Updated Successfully !
      `,
    showCancelButton: true,
    focusConfirm: false,
    timer: 3000,
    confirmButtonText: `
        <i class="fa fa-thumbs-up"></i> Great!
      `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
        <i class="fa fa-thumbs-down"></i>
      `,
    cancelButtonAriaLabel: "Thumbs down"
  });
  setTimeout(() => {
    location.reload();
  }, 3000)
}

function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      e.parentElement.parentElement.setAttribute("class", "deleted-item");
      todoValue.focus();

      todo.forEach((element) => {
        if (element.item == deleteValue.trim()) {
          todo.splice(element, 1);
        }
      });

      setTimeout(() => {
        e.parentElement.parentElement.remove();
      }, 1000);

      setLocalStorage();
      Swal.fire({
        title: "Deleted Successfully!",
        text: "Your Task has been deleted.",
        icon: "success",
        timer: 3000
      });
    }
  });
}

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-check todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(icon);
    e.parentElement.querySelector("i.edit").remove();

    todo.forEach((element) => {
      if (e.parentElement.querySelector("div").innerText.trim() == element.item) {
        element.status = true;
      }
    });
    setLocalStorage();
    Swal.fire({
      title: "<strong>Hurry !</strong>",
      icon: "success",
      html: `
          Todo items Completed Successfully! !
          `,      
      focusConfirm: false,
      timer: 3000,
      confirmButtonText: `
            <i class="fa fa-thumbs-up"></i> Great!
          `,
      confirmButtonAriaLabel: "Thumbs up, great!",

    });
  }
}


function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}
