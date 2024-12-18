import { displayToDoList, sidebarNumberCount, renderSidebar, projectNumberCount } from "./renderHTML"
import { loadArrayStorage, saveList } from "./storage"
import { flag } from "./DOMinterface"


export let todoArray = loadArrayStorage('todoArray')
export let projectArray = loadArrayStorage('projectArray')


//--------------ADD FORM DATA TO SPECIFIC ARRAY----------------\\
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

  return {name, date, priorityValue}
}

function getCurrentArray() {
  return flag === null ? todoArray : projectArray[flag].projectArr;
}

function pushFormDataToArray(formData, currentArray) {
currentArray.push(formData)
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

//--------------DELETE DATA FROM ARRAY----------------\\
export function spliceRow(e) {
  const targ = e.target.id // ID corresponds to array index
  const currentArray = getCurrentArray()

  deleteToDoItem(targ, currentArray)
  saveDataToLocalStorage()

  displayToDoList() // update the list
  updateUI() // update array count/tally
}

function deleteToDoItem(targ, currentArray) {
  currentArray.splice(targ, 1)
}





  export function countArrayLength(arrays) {
    let sum = 0
   arrays.forEach(element => {
      sum ++
    });
    return sum
  }


// project array 

export function addNewProject(popupContainer) {
  const addProject = document.getElementById('add-project-todo')

  addProject.addEventListener('click', () => {
  const inputValue = document.querySelector('#project-input')
  const projectName = inputValue.value
  const projectNum = 1

  projectArray.push({
      projectName,
      projectNum,
      projectArr: []
   })

      saveList('projectArray', projectArray)
      renderSidebar()
      popupContainer.classList.add('hidden')
 })
}