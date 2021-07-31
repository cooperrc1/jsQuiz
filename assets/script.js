var counter = document.querySelector("#counter");
var timeLeft = 60;
var counterInterval;
var startButton = document.querySelector("#startButton");
var viewHiS = document.querySelector("#viewHis")
var choiceA = document.querySelector("#a");
var choiceB = document.querySelector("#b");
var choiceC = document.querySelector("#c");
var choiceD = document.querySelector("#d");
var finishB = document.querySelector("#finish");
var resetB = document.querySelector("#reset");
var restartB = document.querySelector("#restart");
var scoreList = document.querySelector("#scoreList");
var startScreen = document.querySelector("#startScreen");
var questionSect = document.querySelector("#questionSect");
var question = document.querySelector("#question");
var questionNum = 0;
var feedback;
var check = document.querySelector("#check");
var score = document.querySelector("#endScore");
var initials = document.querySelector("#input");
var endScreen = document.querySelector("#endScreen");
var scores = document.querySelector("#scores");
var highScores = [];
var storedHighScores = [];
var questions = [
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: ["A. <body>",
                "B. <head>",
                "C. <head> and <body>",
                "D. None of the above"],
        correctAnswer: "C. <head> and <body>"
    },
    {
        question: "How to write an IF statement for executing some code if i is NOT equal to 5?",
        answers: ["A. if(i != 5)",
                "B. if i <> 5",
                "C. if ( i <> 5)",
                "D. if i =!5 then"],
        correctAnswer: "A. if(i != 5)"
    },
    {
        question: "How does a FOR loop start?",
        answers: ["A. for (i <= 5; i++)",
                "B. for (i = 0; i <= 5; i++)",
                "C. for (i = 0; i <= 5)",
                "D. for i = 1 to 5"],
        correctAnswer: "B. for (i = 0; i <= 5; i++)"

    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["A. if i == 5 then",
                "B. if i = 5 then",
                "C. if(i==5)",
                "D. if i =5"],
        correctAnswer: "C. if(i==5)"
    }
];
function start(){
    startScreen.style.display = "none";
    questionSect.style.display = "block";
    counterInterval=setInterval(function(){
        timeLeft--;
        counter.textContent = "Time: " + timeLeft + "s";
        if(timeLeft==0){
            clearInterval(counterInterval);
            final();
        }
    }, 1000);
    displayQuestion(questionNum);
}

function displayQuestion(){

    question.textContent = questions[questionNum].question;
    choiceA.textContent = questions[questionNum].answers[0];
    choiceB.textContent = questions[questionNum].answers[1];
    choiceC.textContent = questions[questionNum].answers[2];
    choiceD.textContent = questions[questionNum].answers[3];

    choiceA.onclick = function(event){
        checkAnswer(event);
    };
    choiceB.onclick = function(event){
        checkAnswer(event);
    };
    choiceC.onclick = function(event){
        checkAnswer(event);
    };
    choiceD.onclick = function(event){
        checkAnswer(event);
    };
}
function checkAnswer(event){
    feedback = event.target.textContent;
    event.preventDefault();

    check.style.display = "block";
    var p = document.createElement("p");
    check.appendChild(p);

    setTimeout(function(){
        p.style.display = "none";
    }, 1300);

    if(questions[questionNum].correctAnswer == feedback){
        timeLeft +=5;
        p.textContent = "Correct 5 more seconds has been added to your time."
    }else if (questions[questionNum].correctAnswer !== feedback){
        timeLeft -=10;
        p.textContent = "That was incorrect!";
    }
    if ( timeLeft < 0) {
        timeLeft === 0;
    }
    if(questionNum < questions.length-1){
        questionNum++;
    
    }else{
        final();
    }

    setTimeout(displayQuestion, 2000)
    displayQuestion(questionNum);

}
function final(){
    score.textContent = timeLeft;
    endScreen.style.display = "block";
    scores.style.display = "block";
    questionScreen.style.display = "none";
    clearInterval(counterInterval);
    getStorage();
}

function saveScore(){
    var user = initials.value.toUpperCase();
    highScores.push({initial: user, score: timeLeft});
        var list = document.createElement("li");
        list.textContent = user  + "                  " + timeLeft;
        scoreList.appendChild(list);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function getStorage(){
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
    if(storedHighScores != null){
        highScores = storedHighScores;
    }
    highScores = highScores.sort((a,b) =>{
        if(a.score < b.score) {return 1;}
        else{return -1;}
    });

    for(var i = 0; i < highScores.length; i++){
        var list = document.createElement("li");
        list.textContent = highScores[i].initial + "         " + highScores[i].score
        scoreList.appendChild(list);
    }
}

startButton.addEventListener("click", start)

finishB.addEventListener("click", function(){
    saveScore();
})

restartB.addEventListener("click", function(){
    location.reload();
    return false;
})

viewHiS.addEventListener("click", function(){
    startScreen.style.display = "none";
    scores.style.display = "block";
    getStorage();
})

resetB.addEventListener("click", function(){
    localStorage.clear();
    highScores.innerHTML = "";
    resetB.innerHTML = "Scores Cleared!";
    setTimeout(function(){
        resetB.textContent = "Cleared High Scores";
    })
}, 1700)