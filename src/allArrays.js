import { displayToDoList, sidebarNumberCount, renderSidebar, projectNumberCount } from "./renderHTML"
import { loadArrayStorage, saveList } from "./storage"
import { flag } from "./DOMinterface"


export let todoArray = loadArrayStorage('todoArray')



export function addToArray() {
  const inputName = document.querySelector('#todo-name')
  const textDescription = document.querySelector('#description')
  const priority = document.querySelector('#priority')
  const dueDate = document.querySelector('#date')

  const name = inputName.value
  const date = dueDate.value
  const priorityValue = priority.value

  if (flag === null){
    todoArray.push({
      name,
      date,
      priorityValue
  })
  
  saveList('todoArray', todoArray) // save to LS
  }
  else {
    projectArray[flag].projectArr.push({
      name,
      date,
      priorityValue
  })
  saveList('projectArray', projectArray) 
  }


  inputName.value = ''
  dueDate.value = ''
  textDescription.value = ''

  sidebarNumberCount() // update number count
  projectNumberCount() // update proj number count
}

export function spliceRow (e) {
  const targ = e.target.id // ID corresponds to array index
  if(flag === null) {
    todoArray.splice(targ, 1)
    saveList('todoArray', todoArray)// save to local storage

  }
  else {
    projectArray[flag].projectArr.splice(targ, 1)
    saveList('projectArray', projectArray)// save to local storage

  }
  
  displayToDoList() // update the list
  sidebarNumberCount()
  projectNumberCount() 

  }

  export function countArrayLength(arrays) {
    let sum = 0
   arrays.forEach(element => {
      sum ++
    });
    return sum
  }


// project array 
export let projectArray = loadArrayStorage('projectArray')

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