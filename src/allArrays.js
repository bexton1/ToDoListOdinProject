import { displayToDoList, sidebarNumberCount, renderSidebar, projectNumberCount } from "./renderHTML"
import { loadArrayStorage, saveList } from "./storage"
import { flag } from "./DOMinterface"


export let todoArray = loadArrayStorage('todoArray')
export let projectArray = loadArrayStorage('projectArray')
export let grandArray = loadArrayStorage('grandArray')


//--------------ADD TODO SUBMISSION DATA TO SPECIFIC ARRAY----------------\\
export function addToArray() {
  const formData = getFormData()
  const currentArray = getCurrentArray()
  
  pushFormDataToArray(formData, currentArray)

  saveDataToLocalStorage()
  resetForm()
  updateUI()
}

function getFormData() {
  const inputName = document.querySelector('#todo-name')
  const priority = document.querySelector('#priority')
  const dueDate = document.querySelector('#date')

  const name = inputName.value
  const date = dueDate.value
  const priorityValue = priority.value
  const projectName = getCurrentProjectName()
  

  return {name, date, priorityValue, projectName}
}

function getCurrentArray() {
  return flag === null ? todoArray : projectArray[flag].projectArr;
}

function pushFormDataToArray(formData, currentArray) {
currentArray.push(formData)
grandArray.push(formData)
}

function saveDataToLocalStorage() {
  saveList('todoArray', todoArray);
  saveList('projectArray', projectArray);
}

function resetForm() {
  document.querySelector('#todo-name').value = '';
  document.querySelector('#description').value = '';
  document.querySelector('#date').value = '';
}

function updateUI() {
  sidebarNumberCount(); // Update sidebar item count
  projectNumberCount(); // Update project item count
}

function getCurrentProjectName() {
  if (flag === null) {
return 'Inbox'
  }
  else {
    return projectArray[flag].projectName
  }
}

//--------------DELETE DATA FROM ARRAY----------------\\
export function spliceRow(e) {
  const targ = e.target.id // ID corresponds to array index
  const currentArray = getCurrentArray()

  deleteToDoItem(targ, currentArray)
  saveDataToLocalStorage()

  displayToDoList() // update/re-render the list
  updateUI() // update array count/tally
}

function deleteToDoItem(targ, currentArray) {
  currentArray.splice(targ, 1)
}


//-------------- ADD TO PROJECT ARRAY----------------\\
export function addNewProject(popupContainer) {
  const addProject = document.getElementById('add-project-todo')

  addProjectListener(addProject, popupContainer)
}

function getProjectModuleData() {
  const inputValue = document.querySelector('#project-input')
  const projectName = inputValue.value
  const projectNum = 1
  const projectArr = []

  return {projectName, projectNum, projectArr}
}

function addProjectListener(addProject, popupContainer) {
  addProject.addEventListener('click', () => {
    const projectData = getProjectModuleData()
    addToProjectArray(projectData)
    saveList('projectArray', projectArray);
    refreshUI(popupContainer)
  })
}

function addToProjectArray(objectData) {
  projectArray.push(objectData)
}

function refreshUI(popupContainer) {
  renderSidebar(); // Re-render the sidebar to reflect the new project
  popupContainer.classList.add('hidden'); // Hide the popup
}
 

//--------------COUNT ARRAY LENGTH----------------\\
export function countArrayLength(array) {
  return array.length;
}

