import { displayToDoList, sidebarNumberCount, renderSidebar, projectNumberCount, displayTodaysList, countTodayLength } from "./renderHTML"
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
  countTodayLength()
}

function getCurrentProjectName() {
  if (flag === null) {
return 'Inbox'
  }
  else {
    return projectArray[flag].projectName
  }
}


//--------------DELETE FROM RELEVANT LIST AND UPDATE CORRECT STATE IN ALL ARRAYS----------------\\
export function spliceRow(e) {
  const projectName = e.target.dataset.arr; //projectName in 'Today' html
  const itemName = e.target.dataset.id1; // item name in Inbox/project html
  const itemIndex = e.target.id; // ID corresponds to array index in inbox/project
  const grandTargetName = e.target.dataset.id; // item name in 'Today' html

  handleRowDeletion(itemName, projectName, grandTargetName, itemIndex);
}

function handleRowDeletion(itemName, projectName, grandTargetName, itemIndex) {
  const grandTargetId = findIndexByName(grandArray, grandTargetName);
  const currentArray = getCurrentArray();

  if (flag1 === 'Today') {
    handleTodayViewDeletion(grandTargetId, projectName, grandTargetName);
  } else {
    handleDefaultViewDeletion(currentArray, itemIndex, itemName);
  }
  updateUI(); // update number counts
}


// ** Today View Deletion **
function handleTodayViewDeletion(grandTargetId, projectName, grandTargetName) {
  deleteItemByIndex(grandTargetId, grandArray); // delete item from grandArray
  saveDataToLocalStorage();
  displayTodaysList(flag1); //render html
  updateOtherLists(projectName, grandTargetName); // update other lists to display the true state 
}


// ** Default View Deletion **
function handleDefaultViewDeletion(currentArray, itemIndex, itemName) {
  deleteItemByIndex(itemIndex, currentArray); // 
  saveDataToLocalStorage();
  displayToDoList(); // Re-render the list
  deleteFromGrandArray(itemName); // update grandArray to display the refreshed new state of the lists. 
}


// ** Utility Functions **
function deleteItemByIndex(index, array) { // removes item from array
  if (index >= 0) {
    array.splice(index, 1);
  }
}

function findIndexByName(array, name, key = 'name') {
  return array.findIndex((item) => item[key] === name);
}

function deleteFromGrandArray(itemName) {
  const grandIndex = findIndexByName(grandArray, itemName);
  deleteItemByIndex(grandIndex, grandArray);
  saveDataToLocalStorage();
}

// ** Refactor array Lists **
   //inorder to display the true state we need tofind out which list we have to delete from (todoarray or projectArray)
function updateOtherLists(projectName, grandTargetName) {
  if (projectName === 'Inbox') {
    deleteFromTodoArray(grandTargetName);
  } else {
    deleteFromProjectArray(projectName, grandTargetName);
  }
  saveDataToLocalStorage();
}

//search todo array looking for the corresponding index and then delete it
function deleteFromTodoArray(targetName) {
  const index = findIndexByName(todoArray, targetName);
  deleteItemByIndex(index, todoArray);
}

//search project array looking for the corresponding index 
function deleteFromProjectArray(projectName, targetName) {
  const projectIndex = findIndexByName(projectArray, projectName, 'projectName');
//once the array is found we then have to find the correct item to delete within the nested array.
    const projectItems = projectArray[projectIndex].projectArr;
    const itemIndex = findIndexByName(projectItems, targetName);
    deleteItemByIndex(itemIndex, projectItems);
  
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

