import { setupEventListeners } from "./pageLoadEventHandlers"
import { loadInbox } from "./loadhomepage"
import { displayTodaysList, displayToDoList, popupHtml, renderSidebar, renderInfoPopup, renderCompletedArray, projectNumberCount, projectDeleteModule} from "./renderHTML"
import { projectArray, spliceRow, addToCompleted,todoArray, setEditFlag, getEditFlag, grandArray, resetForm } from "./allArrays"
import { loadTodayAndUpcoming } from "./loadTodayPage"

export let flag = null
export let flag1 =  null


//--------------toggle / popup event listeners----------------\\
export function toggleForm(queryName) {
queryName.classList.toggle('active')
resetForm()
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
export function resetState() {
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
    // Prevent triggering if the click originated from the delete button
    if (event.target.classList.contains('delete-active')) {
        return; // Stop execution for clicks on the delete button
    }

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

//--------------DELETE BUTTON FOR PROJECTS ON HOVER----------------\\\
export function displayDeleteButton(){
    const allProjects = document.querySelectorAll('.side-bar-items-project')

    createHoverListeners(allProjects)
}

function createHoverListeners(allProjects) {
    allProjects.forEach((item, index) => {
        const dataId = item.dataset.id
        const projectNumEl = item.querySelector('.project-num');
        const originalCount = projectNumEl.textContent;

        item.addEventListener('mouseenter', () => {
            projectNumEl.innerHTML = ""; // Clear existing content
            const deleteButton = createProjectDeleteButton();
            projectNumEl.appendChild(deleteButton); // Append delete button

            // Add event listener to delete button for popup
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering other events
                projectDeleteModule(dataId, index); // Display delete popup
                
            });
        });

        item.addEventListener('mouseleave', () => {
            projectNumEl.innerHTML = originalCount; // Restore original count
        });
    });
}


function createProjectDeleteButton() {
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'X'
    deleteButton.className = 'delete-active'
    return deleteButton
}


//--------------TOGGLE EDIT FORM----------------\\\
let currentName;

export function displayFormEdit() {
    const editButton = document.querySelectorAll('.edit-button')
    editButtonClick(editButton)
    
    
}


function editButtonClick(editButton) {
    editButton.forEach((item) => {
        item.addEventListener('click', (e) => {
            setEditFlag(item.dataset.id3)
            const infoIndex = item.dataset.id3
            activateForm()
            const currentArray = getCurrentArray()
            getFormValues(currentArray, infoIndex)
        })
    })
   
}

function activateForm() {
     const displayForms = document.querySelector('.add-task-module')

     displayForms.classList.remove('active')
    
}


//Fetch tasks based on condition (flag)
function getCurrentArray() { 
  if(flag === null){
    return todoArray
  }
  else {
    return projectArray[flag].projectArr
  }
}


function getFormValues(currentArray, infoIndex) {
    const inputName = document.querySelector('#todo-name')
    inputName.value = currentArray[infoIndex].name
   
     const dueDate = document.querySelector('#date')
    dueDate.value = currentArray[infoIndex].date

     const description = document.querySelector('#description')
     description.value = currentArray[infoIndex].infodescription

     currentName = inputName.value
    
  }


  //--------------EDIT ARRAY DATA----------------\\


export function editArrayData() {
    const currentArray = getCurrentArray()
    const arrayIndex = getEditFlag()
    const formEditValues = formValues()

    replaceArrayData(currentArray, arrayIndex, formEditValues)
}

function formValues() {
    const inputName = document.querySelector('#todo-name')
    const dueDate = document.querySelector('#date')
    const description = document.querySelector('#description')
    
    

    return {inputName, dueDate, description}
}

function replaceArrayData(currentArray, arrayIndex, formEditValues) {
    const grandIndex = findNameInGrand()

    grandArray[grandIndex].name = formEditValues.inputName.value
grandArray[grandIndex].date = formEditValues.dueDate.value
grandArray[grandIndex].infodescription = formEditValues.description.value

currentArray[arrayIndex].name = formEditValues.inputName.value
currentArray[arrayIndex].date = formEditValues.dueDate.value
currentArray[arrayIndex].infodescription = formEditValues.description.value
}

  //--------------EDIT GRAND ARRAY DATA----------------\\
    

     function findNameInGrand() {
        
        const grandId = grandArray.findIndex((item)=>item.name === currentName)
        return grandId
     }


