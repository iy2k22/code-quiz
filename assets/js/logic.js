const question = (prompt, answers, correct) => {
    return {
        prompt: prompt,
        answers: answers,
        correct: correct
    };
};

const questions = [
    question(
        "Commonly used data types do NOT include",
        ["strings", "booleans", "alerts", "numbers"],
        2
    ),
    question(
        "The condition in an if/else statement is enclosed within ___.",
        ["quotes", "curly brackets", "parentheses", "square brackets"],
        1
    ),
    question(
        "Arrays in JavaScript can be used to store ___.",
        ["numbers and strings", "other arrays", "booleans", "all of the above"],
        3
    ),
    question(
        "String values must be enclosed within ___ when being assigned to variables.",
        ["commas", "curly brackets", "quotes", "parentheses"],
        2
    ),
    question(
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        ["JavaScript", "terminal/bash", "for loops", "console.log"],
        3
    )
];

let qIndex = 0;
let time = 75;
let tIndex;
let hiscore = 0;

const NUM_ANSWERS = 4;
const timeEl = document.querySelector("#time");
const qTitle = document.querySelector("#question-title")
const startButton = document.querySelector("#start");
const questionSection = document.querySelector("#questions");
const feedback = document.querySelector("#feedback");
const submitBtn = document.querySelector("#submit");
const endScreen = document.querySelector("#end-screen")

let hiscores;
if (!(localStorage.getItem("hiscores")))
    hiscores = [];
else
    hiscores = JSON.parse(localStorage.getItem("hiscores"));

// initialise answer buttons
const answerButtons = [];
for (let i = 0; i < NUM_ANSWERS; ++i) {
    const answerButton = document.createElement("button");
    answerButtons.push(answerButton);
    document.querySelector("#choices").appendChild(answerButton);
}

// update text on page
const renderQuestion = () => {
    qTitle.textContent = `${qIndex + 1}. ${questions[qIndex].prompt}`;
    for (let i = 0; i < NUM_ANSWERS; ++i) {
        answerButtons[i].setAttribute("data-val", questions[qIndex].answers[i]);
        answerButtons[i].textContent = `${i + 1}. ${questions[qIndex].answers[i]}`;
    }
}

const updateTime = () => {
    if (time === 0)
        endGame();
    timeEl.textContent = time--;
}

const startGame = () => {
    document.querySelector("#start-screen").classList.add("hide");
    renderQuestion();
    tIndex = setInterval(updateTime, 1000);
    questionSection.classList.remove("hide");
}

const endGame = () => {
    clearInterval(tIndex);
    tIndex = null;
    questionSection.classList.add("hide");
    document.querySelector("#final-score").textContent = hiscore;
    endScreen.classList.remove("hide");
}


startButton.addEventListener("click", startGame);

for (let answerButton of answerButtons) {
    answerButton.addEventListener("click", function () {
        if (questions[qIndex].answers.indexOf(this.getAttribute("data-val")) === questions[qIndex].correct) {
            hiscore += 10;
            feedback.textContent = "Correct!";
        } else {
            time -= 10;
            feedback.textContent = "Wrong!";
        }
        feedback.classList.remove("hide");
        setTimeout(() => feedback.classList.add("hide"), 1000);
        if (++qIndex === questions.length)
            endGame();
        else
            renderQuestion();
    })
}

endScreen.addEventListener("click", (e) => {
    const initials = document.querySelector("#initials").value;
    if (initials.length === 0)
        e.preventDefault();
    else {
        if (e.target === document.querySelector("#submit")) {
            console.log('a');
            hiscores.push([initials, hiscore]);
            hiscores.sort((a, b) => b[1] - a[1]);
            localStorage.setItem("hiscores", JSON.stringify(hiscores));
        }
    }
})