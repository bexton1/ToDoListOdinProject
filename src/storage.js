import { completedArray } from "./allArrays";


export function saveList (key, todoArray) {
    localStorage.setItem(key, JSON.stringify(todoArray))
}

export function loadArrayStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];

}

// //--------------CHECKBOX LOCALSTORAGE FUNCTIONALITY----------------\\

export function loadCheckedBoxes() {
    const checkBoxes = document.querySelectorAll('.check-box');
    
    //returns true if the array.name includes the id
    checkBoxes.forEach(item => {
      const id = item.dataset.id2;
      item.checked = completedArray.some(obj => obj.name.includes(id));
    });
  }
  