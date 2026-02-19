
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
    const mainContent = document.getElementById("mainContent");
    const createItem = document.getElementById("createItem");
    const overlay = document.getElementById("overlay");
    const modalInput = document.getElementById("modalInput");
    const cancelButton = document.getElementById("cancelButton");
    const saveButton = document.getElementById("saveButton");
    const editSaveButton = document.getElementById("editSaveButton");
    
    let editId;
    let currentL = settingsJson.currentList
    let currentArr = currentL ? settingsJson.allLists[currentL] : []

    let holdTimeout;
    const holdDuration = 1000;

    const onMouseDown = e => {
        holdTimeout = setTimeout(() => {
            
            for(let i = parseInt(e.target.id); i < currentArr.length - 1; i++){
                currentArr[i] = currentArr[i + 1];
            }
            currentArr.pop();
            
            localStorage.setItem("settings", JSON.stringify(settingsJson));
            renderItems();
        }, holdDuration);
    };

    const onMouseUpOrLeave = e => {
        clearTimeout(holdTimeout);
    };

    document.body.addEventListener("mouseup", onMouseUpOrLeave);

    function renderItems(edit = false) {
        mainContent.innerHTML = ''
        currentArr.forEach((element, index) => {
            const itemDiv = document.createElement("div");
            itemDiv.textContent = element.text;
            itemDiv.id = index;
            itemDiv.className = 'gridItem button';
            itemDiv.style.textDecoration = element.line ? "line-through" : "none";
            itemDiv.style.display = "flex";
            itemDiv.style.alignItems = "center";
            itemDiv.style.justifyContent = "center";

            itemDiv.addEventListener("click", () => {
                element.line = !element.line;
                itemDiv.style.textDecoration = element.line ? "line-through" : "none";
                settingsJson.allLists[currentL] = currentArr;
                localStorage.setItem("settings", JSON.stringify(settingsJson));
            });

            itemDiv.addEventListener("dblclick", e =>{
                overlay.style.display = "flex";
                saveButton.style.display = "none";
                editSaveButton.style.display = "block";
                modalInput.value = element.text;
                editId = index;
                modalInput.focus();
            })

            itemDiv.addEventListener("mousedown", onMouseDown);
            itemDiv.addEventListener("mouseup", onMouseUpOrLeave);
            itemDiv.addEventListener("mouseleave", onMouseUpOrLeave);

            itemDiv.addEventListener("touchstart", onMouseDown);
            itemDiv.addEventListener("touchend", onMouseUpOrLeave);
            itemDiv.addEventListener("touchcancel", onMouseUpOrLeave);

            mainContent.appendChild(itemDiv);
        });
    }
    renderItems();

    createItem.addEventListener('click', e=>{
        overlay.style.display = "flex";
        editSaveButton.style.display = "none"
        saveButton.style.display = "block"
        modalInput.focus();
    })

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.display = "none";
            modalInput.value = "";
        }
    });

    cancelButton.addEventListener('click', () => {
        overlay.style.display = "none";
        modalInput.value = "";
    });

    saveButton.addEventListener('click', () => {
        const newItemText = modalInput.value.trim();
        if (newItemText) {
            currentArr.push({
                text: newItemText,
                line: false
            });
            modalInput.value = '';
            settingsJson.allLists[currentL] = currentArr;
            localStorage.setItem("settings", JSON.stringify(settingsJson));
            renderItems();
            overlay.style.display = "none";
        } else {
            alert("Please enter text for the item");
            modalInput.focus();
        }
    });

    editSaveButton.addEventListener('click', e => {
        const newItemText = modalInput.value.trim();
        if (newItemText) {
            currentArr[editId].text = newItemText;
            modalInput.value = '';
            settingsJson.allLists[currentL] = currentArr;
            localStorage.setItem("settings", JSON.stringify(settingsJson));
            renderItems();
            overlay.style.display = "none";
        } else {
            alert("Please enter text for the item");
            modalInput.focus();
        }
    });

    createModal.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveButton.click();
        }
    });

    document.getElementById('createModal').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});