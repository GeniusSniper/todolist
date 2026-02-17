
document.addEventListener('DOMContentLoaded', (event) => {
    const defaultSettings = {
        "theme": "dark",
        "allLists": {
            "testlist1": [{
                "text": "1",
                "line": false
            }, {
                "text": "2",
                "line": false
            }, {
                "text": "3",
                "line": false
            }, {
                "text": "4",
                "line": true
            }, {
                "text": "5",
                "line": false
            }, {
                "text": "6",
                "line": false
            }, {
                "text": "7",
                "line": true
            }, {
                "text": "8",
                "line": false
            }, {
                "text": "9",
                "line": false
            }, {
                "text": "10",
                "line": false
            }]
        },
        "currentList": "testlist1"
    }
    const settingsJson = JSON.parse(localStorage.getItem("settings")) || defaultSettings
    const mainContent = document.getElementById("mainContent")
    const createItem = document.getElementById("createItem")
    let currentL = settingsJson.currentList
    let currentArr = currentL ? settingsJson.allLists[currentL] : []

    for (let i = 0; i < currentArr.length; i++) {
        const element = currentArr[i];
        const tempDiv = document.createElement("div");
        tempDiv.textContent = element.text;
        tempDiv.id = i;
        tempDiv.className = 'gridItem button'
        tempDiv.style.textDecoration = element.line ? "line-through" : "none"
        tempDiv.addEventListener("click", e => {
            if (tempDiv.style.textDecoration == "line-through") {
                tempDiv.style.textDecoration = "none"
            } else {
                tempDiv.style.textDecoration = "line-through"
            }
            element.line = !element.line;
            settingsJson.allLists[currentL] = currentArr;
            localStorage.setItem("settings", JSON.stringify(settingsJson));
        })

        mainContent.appendChild(tempDiv)
    }
});