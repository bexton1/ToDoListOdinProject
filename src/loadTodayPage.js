const mainContainer = document.querySelector('.main-right')

export function loadTodayAndUpcoming(heading) {
    mainContainer.innerHTML = `<h2>${heading}</h2>
                <div class="task-content-box "> </div>`
    }