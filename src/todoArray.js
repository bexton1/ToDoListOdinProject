import { displayToDoList, sidebarNumberCount } from "./renderHTML"
import { loadArrayStorage, saveList } from "./storage"



export let todoArray = loadArrayStorage('todoArray')

export function addToArray() {
  const inputName = document.querySelector('#todo-name')
  const textDescription = document.querySelector('#description')
  const priority = document.querySelector('#priority')
  const dueDate = document.querySelector('#date')

  const name = inputName.value
  const date = dueDate.value
  const priorityValue = priority.value

   todoArray.push({
        name,
        date,
        priorityValue
    })

   saveList('todoArray', todoArray) // save to LS

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
