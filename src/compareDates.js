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
