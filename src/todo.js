console.log("todos");

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.css";

const refs = {
  form: document.querySelector(".form-submit"),
};

const onFormSubmit = (e) => {
  e.preventDefault();
  const newTodo = e.currentTarget.todo.value;
  if (newTodo === "") {
    alert("error please enter data");
    return;
  }
  refs.form.reset();
};

refs.form.addEventListener("submit", onFormSubmit);
