
export function saveList (key, todoArray) {
    localStorage.setItem(key, JSON.stringify(todoArray))
}

export function loadArrayStorage(key) {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];

}