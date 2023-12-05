const hiscores = JSON.parse(localStorage.getItem("hiscores"));

const hsEl = document.querySelector("#highscores");
const clearButton = document.querySelector("#clear");

if (hiscores)
    for (let hiscore of hiscores) {
        const listItem = document.createElement("li");
        listItem.textContent = `${hiscore[0]}: ${hiscore[1]}`;
        hsEl.appendChild(listItem);
    }

clearButton.addEventListener("click", () => {
    localStorage.removeItem("hiscores");
    const listLen = hsEl.childNodes.length;
    for (let i = 0; i < listLen; ++i)
        hsEl.removeChild(hsEl.childNodes[0]);
})