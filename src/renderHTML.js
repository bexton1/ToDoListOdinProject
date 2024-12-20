import { closeProjectModule, sidebarProjectsListeners, toggleProject, flag, attachDeleteListeners } from "./DOMinterface";
import { todoArray, countArrayLength, projectArray, addNewProject, grandArray } from "./allArrays";
import { filterGrandArrayToday, filterGrandArrayUpcoming } from "./compareDates";
import myImage from './images/plus.png'



//--------------RENDER TODOLIST----------------\\
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
<div><button class="info-button" data-id="${item.name}">Info</button></div>
<div><button class='delete-button' id="${index}" data-id1="${item.name}">Delete</button></div>`
}




//--------------RENDER PROJECT MODULE----------------\\
export function popupHtml() {
  const popupContainer = document.getElementById('popup')
  popupContainer.innerHTML = renderModulePopupHTML()
  
  showPopup(popupContainer)

  closeProjectModule(popupContainer)// event listener for closing module
  addNewProject(popupContainer) // event listener for adding a new project 
}


function renderModulePopupHTML() {
  return `
    <div class="popup-content">
    <h2>Add Project</h2>
    <hr>
    <input id="project-input"></input>
    <button id="add-project-todo">submit</button> 
    <button id="close-popup-btn">close</button>
  </div>
  `
}

function showPopup(popupContainer) {
  popupContainer.classList.remove('hidden')
}


//--------------RENDER SIDEBAR----------------\\
export function renderSidebar() {
  const sideBarProjects = document.querySelector('.side-bar-middle')
  
  renderSidebarHeader(sideBarProjects)
  renderProjectList(sideBarProjects)
  initializeSidebarFeatures()
}

function renderSidebarHeader(container) {
  container.innerHTML = `
      <div class="side-bar-items-project-heading">
          <p class="project-side-heading">My Projects</p>
          <div id="add-project"><img src='${myImage}' class='image-plus'></div>
      </div>`
}

function renderProjectList(container) {
  const projectListHtml = projectArray.map((item, index) => {
    return `
      <div class="side-bar-items-project" data-id="${item.projectName}" data-num="${index}">
        <p>${item.projectName}</p>
        <p class="project-num">${item.projectNum}</p>
      </div>`
  })
  container.innerHTML += projectListHtml.join('');
}

function initializeSidebarFeatures() {
  toggleProject(); // re-add listener for toggling projects
  sidebarProjectsListeners(); // attach listeners for loading projects individual page
  projectNumberCount(); //update project count display
}


//--------------RENDER ARRAY COUNTS----------------\\

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

 export function countTodayLength() {
  const todayNum = document.querySelector("#today-nums")
  const findTodayLength = filterGrandArrayToday()

  todayNum.innerHTML = findTodayLength.length
}

export function countUpcomingLength () {
  const upcomingNum = document.querySelector('#upcoming-nums')
  const findUpcomingLength = filterGrandArrayUpcoming()

  upcomingNum.innerHTML = findUpcomingLength.length
}



//--------------RENDER TODAY/UPCOMING HTML----------------\\
export function displayTodaysList(sidebaritem) {
const displayTasks = document.querySelector('.task-content-box')

const filterTodaysTasks = findCurrentArray(sidebaritem)

renderTodaysList(displayTasks, filterTodaysTasks)
attachDeleteListeners() // reattach event listeners after rendering html
countTodayLength()
countUpcomingLength()
}

function renderTodaysList(displayTasks, filterTodaysTasks) {
const html = filterTodaysTasks.map((item, index) => createTodaysTaskHTML(item, index) )

displayTasks.innerHTML = html.join('')
}

//create task html
function createTodaysTaskHTML(item, index) {
  return `<div>${item.name}</div>
  <div>${item.date}</div>
  <div>${item.projectName}</div>
  <div><button class="info-button" data-id="${item.name}">Info</button></div>
  <div><button class='delete-button' id="${index}" data-id=${item.name} data-arr='${item.projectName}'>Delete</button></div>
  
  `
  }

  function findCurrentArray(sidebaritem) {
    if(sidebaritem === 'Today'){
      return filterGrandArrayToday()
    }
    else if(sidebaritem === 'Upcoming') {
      return filterGrandArrayUpcoming()
    }
  }
  

//--------------RENDER INFO POPUP----------------\\
export function renderInfoPopup(e) {
  const infoPopupContainer = document.querySelector('.display-info')
  const currentInfoItem = e.target.dataset.id

  revealInfoContainer(infoPopupContainer)
 

  const matchingItem = findItemToRender(currentInfoItem)
  joinHtML(matchingItem, infoPopupContainer)
}

  function findItemToRender(currentInfoItem) {
    return grandArray.find((item) => item.name === currentInfoItem)
  }

  function joinHtML(matchingItem, infoPopupContainer) {
   const htmlRender = generateHtml(matchingItem)
   infoPopupContainer.innerHTML = htmlRender
  }

  function generateHtml(item) {
    return  `<div class="display-info-content">
                <button id="info-close">X</button>
                <h1 id="heading-info">${item.projectName}</h1>
                <p class="info-items">Project: <span class="info-span info-name">${item.name}</span></p>
                <p class="info-items">Date: <span class="info-span info-date">${item.date}</span></p>
                <p class="info-items">Description: <span class="info-span info-description"></span></p>
            </div>`
}



  function revealInfoContainer(infoPopupContainer) {
infoPopupContainer.classList.remove('hidden1')
}