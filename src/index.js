import "./styles.css";
import { addToArray } from "./todoArray";
import { displayToDoList, renderSidebar} from "./renderHTML";
import { toggleForm, toggleProject } from "./DOMinterface";
import { loadInbox } from "./loadhomepage";

addEventListener('DOMContentLoaded', () => {
  // 1. Load dynamic HTML
  loadInbox();

  // 2. Render the lists after loading the inbox
  displayToDoList();
  renderSidebar();

  // 3. Access dynamically created elements AFTER loadInbox()
  setupEventListeners();
});

// Function to attach event listeners to dynamic elements
function setupEventListeners() {
  // Submit todo form
  const form = document.querySelector('#form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      addToArray();
      displayToDoList();
    });
  }

  // Toggle form
  const contentBox = document.querySelector('.add-task-module');
  const formLogo = document.querySelector('.add-logo1');
  if (formLogo && contentBox) {
    formLogo.addEventListener('click', () => {
      toggleForm(contentBox);
    });
  }

  const cancelFormView = document.querySelector('#cancel-form');
  if (cancelFormView && contentBox) {
    cancelFormView.addEventListener('click', () => {
      toggleForm(contentBox);
    });
  }

  toggleProject()
 
}


