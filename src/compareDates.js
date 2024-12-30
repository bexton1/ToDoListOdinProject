import { grandArray } from "./allArrays"

const today = new Date()
today.setHours(0, 0, 0, 0)

 
export function filterGrandArrayToday() {
    return grandArray.filter((item) => {
        const todoDate = new Date(item.date)
        todoDate.setHours(0, 0, 0, 0)
        return today.getTime() === todoDate.getTime()
    })
}

const today1 = new Date()
const thisWeek = new Date()

thisWeek.setDate(today1.getDate() + 7)

export function filterGrandArrayUpcoming() {
    return grandArray.filter((item) => {
        const taskDate = new Date(item.date)
        return taskDate >= today1 && taskDate <= thisWeek;

    })
}
console.log('test')