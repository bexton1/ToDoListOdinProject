import { addToArray } from "./allArrays";
import { countCompletedLength, displayToDoList } from "./renderHTML";
import { checkBoxListener, displayDeleteButton, toggleForm, toggleInfo, toggleProject } from "./DOMinterface";
import { loadCheckedBoxes } from "./storage";

export function setupEventListeners() {
  setupFormEventListeners();
  toggleProject();
  toggleInfo()
  //checkBoxListener()
  loadCheckedBoxes()
  countCompletedLength()
  displayDeleteButton()
}

// form submit listener
function setupFormEventListeners() {
  const form = document.querySelector('#form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addToArray();
      displayToDoList();
    });
  }
// reveal form popup listener
  const contentBox = document.querySelector('.add-task-module');
  const formLogo = document.querySelector('#add-logo1');
  if (formLogo && contentBox) {
    formLogo.addEventListener('click', () => toggleForm(contentBox));
  }

  // form cancel listener
  const cancelFormView = document.querySelector('#cancel-form');
  if (cancelFormView && contentBox) {
    cancelFormView.addEventListener('click', () => toggleForm(contentBox));
  }
}

export function setupSidebar() {
  // Add additional sidebar event listeners if needed
}
