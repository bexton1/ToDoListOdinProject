import { displayToDoList, sidebarNumberCount, renderSidebar } from "./renderHTML"
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
}

export function spliceRow (e) {
  const targ = e.target.id // ID corresponds to array index
  todoArray.splice(targ, 1)
  displayToDoList() // update the list
  saveList('todoArray', todoArray)// save to local storage
  sidebarNumberCount()
  }

  export function countArrayLength() {
    let sum = 0
    todoArray.forEach(element => {
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
console.log(projectArray)
//projectArray[0].projectArr.push('hello')
      saveList('projectArray', projectArray)
     renderSidebar()
  popupContainer.classList.add('hidden')

  })
}