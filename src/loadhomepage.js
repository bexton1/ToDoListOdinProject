import myImage from './images/plus.png'

const mainContainer = document.querySelector('.main-right')





export function loadInbox(heading) {
mainContainer.innerHTML = `    <h2>${heading}</h2>
            <div class="task-content-box "> </div>
            
           
            <div class="add-new-task">
                <div><img id='add-logo1' class="image-plus" src="${myImage}"></div>
                <p id="add-task-main">Add Task</p>
            </div>
           
           
                
                <div class="add-task-module active">
                    <form id="form">
                        <input type="text" name="" id="todo-name" placeholder="ToDo Name" required>
                        <textarea name="" id="description" placeholder="description"></textarea>
                    <div class='flex-container'>
                        <div>
                         <input type="date" name="" id="date" required>
                        
                        </div>  
                       
                        
                        <div class="task-buttons">
                            <button id="cancel-form" type="button">Cancel</button>
                            <button id="submit-form" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                   
                </div>
            `
}