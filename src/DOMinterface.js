import { setupEventListeners } from "."
import { loadInbox } from "./loadhomepage"
import { displayToDoList, popupHtml, renderSidebar } from "./renderHTML"
import { projectArray } from "./allArrays"



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




export function sidebarInboxLoad () {
    const inboxSidebar = document.querySelector('.side-inbox')
    inboxSidebar.addEventListener('click', ()=> {
        flag = null
        loadInbox('Inbox')
        renderSidebar()
        displayToDoList()
        setupEventListeners()
    })
}

export let flag = null

export function sidebarProjectsListeners() {
    const allProjects = document.querySelectorAll('.side-bar-items-project')
    allProjects.forEach((item) => {
        item.addEventListener('click', (e)=> {
            const currentTarg = e.currentTarget.dataset.id
            flag = projectArray.findIndex(project => project.projectName === currentTarg)
            loadInbox(currentTarg)
            renderSidebar()
            displayToDoList()
            setupEventListeners()
            
        })
    })
}