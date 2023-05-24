import toastr from "toastr";
import * as basicLightbox from "basiclightbox";
import { loadData, saveData } from "./service/service";

import { nanoid } from "nanoid";

let currentId;
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: "toast-top-center",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "1500",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

let todo = [];

const deleteModal = basicLightbox.create(`
   <div class="delete-modal">
        <p id="text">
        Do you really want to delete the entry?
        </p>
        <button class="btn btn-danger">REMOVE</button>
    <button class="btn btn btn-light">CANCEL</button>
    </div>
`);

const refs = {
  form: document.querySelector(".form-submit"),
  list: document.querySelector(".js-list"),
  printBtn: document.querySelector(".js-print-btn"),
  searchForm: document.querySelector(".js-search-form"),
  modalDangerButton: deleteModal.element().querySelector(".btn-danger"),
  modalCancelButton: deleteModal.element().querySelector(".btn-light"),
  modalText: deleteModal.element().querySelector("#text"),
};

console.log(refs);

const itemTemplate = ({
  id,
  label,
  checked,
}) => `<li data-id='${id}' class="list-group-item list-group">
                <label class="list-group__label">
                   <input type="checkbox"  ${checked ? "checked" : ""} />
                   <span>${label}</span>
                </label>  
            <button type="button" class="btn btn-danger list__btn">X</button>
          </li>`;

function render() {
  const items = todo.map((todo) => itemTemplate(todo));

  refs.list.innerHTML = "";
  refs.list.insertAdjacentHTML("beforeend", items.join(""));

  saveData("todo", todo);
}

const onHandlePrint = () => {
  console.table(todo);
};

function toggleItem(id) {
  todo = todo.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          checked: !todo.checked,
        }
      : todo
  );
}
function removeItem(id) {
  currentId = id;
  const { label } = todo.find((todo) => todo.id === currentId);

  refs.modalText.textContent = label;
  deleteModal.show();
}

const onRemoveItem = () => {
  todo = todo.filter((todo) => todo.id !== currentId);
  deleteModal.close();
  render();
};

function onHandleItems(e) {
  const { id } = e.target.closest("li").dataset;
  const dataId = e.target.nodeName;
  switch (dataId) {
    case "BUTTON":
      removeItem(id);
      break;
    case "INPUT":
    case "LABEL":
      toggleItem(id);
      break;
  }
  render();
}

render();

const onFormSubmit = (e) => {
  e.preventDefault();

  const { value } = e.target.elements.text;

  if (!value) {
    toastr.info("field must be filled");
    return;
  }

  const addNewTodo = {
    id: nanoid(4),
    label: value,
    checked: false,
  };
  toastr.success("tag add success");
  refs.form.reset();
  todo.push(addNewTodo);
  render();
};

const onModalCancel = () => {
  deleteModal.close();
};

const onLoad = () => {
  todo = loadData("todo");

  render();
};

onLoad();
refs.modalCancelButton.addEventListener("click", onModalCancel);
refs.modalDangerButton.addEventListener("click", onRemoveItem);
refs.list.addEventListener("click", onHandleItems);
refs.form.addEventListener("submit", onFormSubmit);
refs.printBtn.addEventListener("click", onHandlePrint);

// refs.searchForm.addEventListener("input", onFilterChange);
