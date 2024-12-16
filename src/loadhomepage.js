const mainContainer = document.querySelector('.main-right')

export function loadInbox(heading) {
mainContainer.innerHTML = `    <h2>${heading}</h2>
            <div class="task-content-box "> </div>
            
           
            <div class="add-new-task">
                <div class="add-logo1"></div>
                <p id="add-task-main">Add Task</p>
            </div>
           
           
                
                <div class="add-task-module active">
                    <form id="form">
                        <input type="text" name="" id="todo-name" placeholder="ToDo Name">
                        <textarea name="" id="description" placeholder="description"></textarea>
                        <div class='flex-container'>
                        <div>
                         <input type="date" name="" id="date">
                        <select name="" id="priority">
                            <option value="priority 1">priority 1</option>
                            <option value="priority 2">priority 2</option>
                            <option value="priority 3">priority 3</option>
                        </select>
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