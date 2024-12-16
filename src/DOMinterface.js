import { setupEventListeners } from "."
import { loadInbox } from "./loadhomepage"
import { displayToDoList, popupHtml, renderSidebar } from "./renderHTML"
import { saveList } from "./storage"
import { projectArray } from "./todoArray"



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

export function addNewProject(popupContainer) {
    const addProject = document.getElementById('add-project-todo')

    addProject.addEventListener('click', () => {
    const inputValue = document.querySelector('#project-input')
    const projectName = inputValue.value
    const projectNum = 1

    projectArray.push({
        projectName,
        projectNum
     })

        saveList('projectArray', projectArray)
       renderSidebar()
    popupContainer.classList.add('hidden')

    })
}



export function sidebarInboxLoad () {
    const inboxSidebar = document.querySelector('.side-inbox')
    inboxSidebar.addEventListener('click', ()=> {
        loadInbox()
        renderSidebar()
        displayToDoList()
        setupEventListeners()
    })

}