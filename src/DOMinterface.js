import { setupEventListeners } from "."
import { loadInbox } from "./loadhomepage"
import { displayToDoList, popupHtml, renderSidebar } from "./renderHTML"
import { projectArray, spliceRow } from "./allArrays"

export let flag = null



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

//--------------DEFAULT INBOX SETTING/LOAD----------------\\
export function sidebarInboxLoad() {
    const inboxSidebar = document.querySelector('.side-inbox')
    attachInboxClickListener(inboxSidebar);
}

// Function to attach click event listener for the Inbox
function attachInboxClickListener(element) {
    element.addEventListener('click', handleInboxClick);
}

// Function to handle the Inbox click event
function handleInboxClick() {
    resetState();
    loadInboxContent();
    initializeUIComponents();
}

// Function to reset any global states or flags
function resetState() {
    flag = null;
}

// Function to load the Inbox content
function loadInboxContent() {
    loadInbox('Inbox');
}

// Function to initialize or update UI components
function initializeUIComponents() {
    renderSidebar();
    displayToDoList();
    setupEventListeners();
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
    initializeUIComponents()
}

// Helper function to extract the project ID from the event
function getProjectIdFromEvent(event) {
    return event.currentTarget.dataset.id;
}


function updateCurrentProjectFlag(projectId) {
    flag = projectArray.findIndex(project => project.projectName === projectId)
}





// delete button event listeners
export function attachDeleteListeners () { 
  const spliceItems = document.querySelectorAll('.delete-button')

  spliceItems.forEach((button) => {
      button.addEventListener('click', spliceRow)
})
}