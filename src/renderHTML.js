import { closeProjectModule, sidebarProjectsListeners, toggleProject, flag } from "./DOMinterface";
import { todoArray, spliceRow, countArrayLength, projectArray, addNewProject } from "./allArrays";
import myImage from './images/plus.png'




export function displayToDoList() {
  const displayTasks = document.querySelector('.task-content-box')
  const tasks = getTasksToDisplay()

  renderTasks(displayTasks, tasks)
  attachDeleteListeners() // reattach event listeners after rendering html
}

// render tasks to DOM
function renderTasks(displayTasks, tasks) {
  displayTasks.innerHTML = ""

  const html = tasks.map((item, index) => createTaskHTML(item, index)).join('')
  displayTasks.innerHTML = html
}

//Fetch tasks based on condition (flag)
function getTasksToDisplay() { 
  if(flag === null){
    return todoArray
  }
  else {
    return projectArray[flag].projectArr
  }
}

//create task html
function createTaskHTML(item, index) {
return `<div>${item.name}</div>
<div>${item.date}</div>
<div>${item.priorityValue}</div>
<div><button class='delete-button' id="${index}">Delete</button></div>`
}





function attachDeleteListeners () { // delete button event listeners
const spliceItems = document.querySelectorAll('.delete-button')
spliceItems.forEach((button) => {
    button.addEventListener('click', spliceRow)
})
}


export function popupHtml() { // render project popup module
const popupContainer = document.getElementById('popup')
popupContainer.innerHTML = `
  <div class="popup-content">
    <h2>Add Project</h2>
    <hr>
    <input id="project-input"></input>
    <button id="add-project-todo">submit</button> 
    <button id="close-popup-btn">close</button>
  </div>
`
popupContainer.classList.remove('hidden')

closeProjectModule(popupContainer)
addNewProject(popupContainer) // event listener for adding a new project 
}


export function renderSidebar() {
const sideBarProjects = document.querySelector('.side-bar-middle')
sideBarProjects.innerHTML =
                     `<div class="side-bar-items-project-heading">
                    <p class="project-side-heading">My Projects</p>
                    <div id="add-project"><img src='${myImage}' class='image-plus'></div>
                     </div>`
projectArray.forEach((item, index) => {
    sideBarProjects.innerHTML += 
                    `<div class="side-bar-items-project" data-id="${item.projectName}" data-num="${index}">
                    <p>${item.projectName}</p>
                       <p class="project-num">${item.projectNum}</p>
                    </div>`
})
toggleProject() // re add event listeners for adding new projects after updating html
sidebarProjectsListeners()
projectNumberCount()
}

export function sidebarNumberCount () {
  const inboxNums = document.querySelector('#inboxNums')
  inboxNums.innerHTML = countArrayLength(todoArray)
}

export function projectNumberCount() {
  const projectNumber = document.querySelectorAll('.project-num')
  projectNumber.forEach((num, index)=> {
    num.innerHTML = countArrayLength(projectArray[index].projectArr)
  })
}