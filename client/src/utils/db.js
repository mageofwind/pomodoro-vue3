const request = window.indexedDB.open("pomodora", 1)
let db

request.onerror = (event) => {
    console.log("Database error: ", event.target.error)
}



request.onsuccess = (event) => {
    db = event.target.result
    console.log("Database: ", db)
    console.log("Object store names: ", db.objectStoreNames)
    
    // createData()
}

request.onupgradeneeded = (event) => {
    const db = event.target.result
    db.createObjectStore("task", { keyPath: "id" })
    db.createObjectStore("config", { keyPath: "key" })
    db.createObjectStore("timerState", { keyPath: "key" })
    // createData()    
}

const createData = () => {
}

const getTimeStage = () => {
    if(db) {
        const transaction = db.transaction('config')
        const store = transaction.objectStore('config')
        const result = store.get("timeState")
        result.onsuccess = (event) => {
            console.log(event.target.result)
            alert("!")
        }
        result.onerror = () => {
            alert("1")
        }
    }
}

const saveTimeStage = () => {
    
}

export default {
    createData,
    getTimeStage
}