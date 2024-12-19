import { displayToDoList, sidebarNumberCount, renderSidebar, projectNumberCount, DisplayTodaysList } from "./renderHTML"
import { loadArrayStorage, saveList } from "./storage"
import { flag, flag1 } from "./DOMinterface"



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
  saveList('grandArray', grandArray);

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
  const projName = e.target.dataset.arr
  const target1 = e.target.dataset.id1
  const targ = e.target.id // ID corresponds to array index
  const grandTarget = e.target.dataset.id
  const grandTargetId = findGrandArrayDeleteIndex(grandTarget)
  const currentArray = getCurrentArray()

  findArray(target1, projName, grandTarget, grandTargetId, currentArray, targ)
}

function findArray(target1, projName, grandTarget, grandTargetId, currentArray, targ) {
  if (flag1 === 'Today') {
  deleteToDoItem(grandTargetId, grandArray)
  saveDataToLocalStorage()
  DisplayTodaysList()
  refactorList(projName, grandTarget)
  updateUI()


  }
  else {

    deleteToDoItem(targ, currentArray)
  
    saveDataToLocalStorage()
  
    displayToDoList() // update/re-render the list
    findGrandDeleteIndex(target1)
    updateUI() // update array count/tally
  }
}

function deleteToDoItem(targ, currentArray) {
  currentArray.splice(targ, 1)
}

function findGrandArrayDeleteIndex(target1) {
  return grandArray.findIndex((item) => item.name === target1)
}

function findGrandDeleteIndex(grandTarget1) {
const grandTargetIndex = grandArray.findIndex((item) => item.name === grandTarget1)
deleteToDoItem(grandTargetIndex, grandArray)
saveDataToLocalStorage()
}

function refactorList(projName, grandTarget) {
if(projName === 'Inbox') {
const result = todoArray.findIndex((item) => item.name === grandTarget)
deleteToDoItem(result, todoArray)
}
else {
  const result1 = projectArray.findIndex((item) => item.projectName === projName)
  const result2 = projectArray[result1].projectArr.findIndex((item) => item.name === grandTarget)
  deleteToDoItem(result2, projectArray[result1].projectArr)
}
saveDataToLocalStorage()
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

