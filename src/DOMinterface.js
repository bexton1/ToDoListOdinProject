import { setupEventListeners } from "./pageLoadEventHandlers"
import { loadInbox } from "./loadhomepage"
import { displayTodaysList, displayToDoList, popupHtml, renderSidebar, renderInfoPopup, renderCompletedArray} from "./renderHTML"
import { projectArray, spliceRow, addToCompleted } from "./allArrays"
import { loadTodayAndUpcoming } from "./loadTodayPage"

export let flag = null
export let flag1 =  null


//--------------toggle / popup event listeners----------------\\
export function toggleForm(queryName) {
queryName.classList.toggle('active')
}

export function toggleProject(){
    const addProject = document.querySelector('#add-project')
    addProject.addEventListener('click', popupHtml)
    
}

export function closeProjectModule(popupContainer) {
    const closeProject = document.getElementById('close-popup-btn')
    closeProject.addEventListener('click', () => {
        popupContainer.classList.add('hidden')
    })
}

export function toggleInfo() {
    const openInfo = document.querySelectorAll('.info-button')
    openInfo.forEach((item) => {
        item.addEventListener('click', renderInfoPopup)
    })
}

export function closeInfoModule(infoPopupContainer){
    const closeInfo = document.querySelector('#info-close')
    closeInfo.addEventListener('click', () => {
        infoPopupContainer.classList.add('hidden1')
    })
}

//--------------DEFAULT SIDEBAR SETTING/LOAD----------------\\


export function sidebarInboxLoad() {
    const sidebarSubject = document.querySelectorAll('.side-bar-items')
    
    attachInboxClickListener(sidebarSubject);
}

// Function to attach click event listener for the Inbox
function attachInboxClickListener(element) {
    element.forEach((item) => {
    item.addEventListener('click', handleInboxClick);
    })
}

// Function to handle the Inbox click event
function handleInboxClick(e) {
   const currentSidebar = findCurrentSidebar(e)
    resetState();
    loadSideBarContent(currentSidebar);
    initializeUIComponents(currentSidebar);
}

function findCurrentSidebar(e) {
const currentTarget = e.currentTarget.dataset.id
return currentTarget
}

// Function to reset any global states or flags
function resetState() {
    flag = null;
}

// Function to load the Inbox content
function loadSideBarContent(sidebaritem) {
    if(sidebaritem === 'Inbox') {
        loadInbox('Inbox');
        flag1 = null
    }
    else {
        loadTodayAndUpcoming(sidebaritem)
        flag1 = sidebaritem
        
    }
    
}

// Function to initialize or update UI components
function initializeUIComponents(currentSidebar) {
    //renderSidebar();
    findArrayToRender(currentSidebar)
    setupEventListeners();
}

function findArrayToRender(sidebaritem) {
    if(sidebaritem === 'Inbox') {
    displayToDoList();
        
    }
    else if(sidebaritem === 'Today' || sidebaritem === 'Upcoming') {
        displayTodaysList(sidebaritem)
    }
    else if(sidebaritem === 'Completed') {
        renderCompletedArray()
    }
    else {
        displayToDoList() // renders project list by default if the above options arnt valid
    }

}


//--------------INDIVIDUAL PROJECT LOAD----------------\\
export function sidebarProjectsListeners() {
    const allProjects = document.querySelectorAll('.side-bar-items-project')
    attachProjectListeners(allProjects)
}


// Function to attach click listeners to all project items
function attachProjectListeners(projectItems) {
    projectItems.forEach(item => {
        item.addEventListener('click', handleProjectClick);
    });
}

// Function to handle the click event for a project
function handleProjectClick(event) {
    const projectId = getProjectIdFromEvent(event);
    updateCurrentProjectFlag(projectId);
    loadInbox(projectId);
    initializeUIComponents(projectId)
    flag1 = null
}

// Helper function to extract the project ID from the event
function getProjectIdFromEvent(event) {
    return event.currentTarget.dataset.id;
}


function updateCurrentProjectFlag(projectId) {
    flag = projectArray.findIndex(project => project.projectName === projectId)
}


//--------------DELETE BUTTON LISTENERS----------------\\
export function attachDeleteListeners () { 
  const spliceItems = document.querySelectorAll('.delete-button')

  spliceItems.forEach((button) => {
      button.addEventListener('click', spliceRow)
})
}

//--------------CHECKBOX LISTENERS----------------\\\
 export function checkBoxListener() {
    const checkBox = document.querySelectorAll('.check-box')
    checkBox.forEach((item) => {
        item.addEventListener('change', (e) => {
            addToCompleted(e)
        })
    })
}
