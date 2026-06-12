const instruments = [
"가야금",
"거문고",
"해금",
"아쟁",
"대금",
"피리",
"장구",
"북",
"징",
"꽹과리",
"소고",
"단소"
];

let usedImages = [];
let previousInstrument = "";

let score = 0;
let currentQuestion = 0;

let currentAnswer = "";

function showPage(pageId){

[
"mainPage",
"learnPage",
"playPage",
"difficultyPage",
"quizPage",
"resultPage"
].forEach(id=>{

document
.getElementById(id)
.classList.add("hidden");

});

document
.getElementById(pageId)
.classList.remove("hidden");

}

function goHome(){

showPage("mainPage");

}

function startQuiz(){

score = 0;
currentQuestion = 0;

usedImages = [];
previousInstrument = "";

showPage("quizPage");

loadQuestion();

}

function loadQuestion(){

if(currentQuestion >= 10){

showResult();
return;

}

currentQuestion++;

document
.getElementById("questionNumber")
.textContent = currentQuestion;

let instrument;

do{

instrument =
instruments[
Math.floor(
Math.random()*instruments.length
)
];

}
while(instrument === previousInstrument);

previousInstrument = instrument;

let imageNumber;

do{

imageNumber =
Math.floor(Math.random()*10)+1;

}
while(
usedImages.includes(
`${instrument}-${imageNumber}`
)
);

usedImages.push(
`${instrument}-${imageNumber}`
);

currentAnswer = instrument;

document
.getElementById("quizImage")
.src =
`images/${instrument}/${imageNumber}.png`;

createAnswers(instrument);

document
.getElementById("resultArea")
.innerHTML = "";

}

function createAnswers(correct){

let choices = [correct];

while(choices.length < 3){

let randomInstrument =
instruments[
Math.floor(
Math.random()*instruments.length
)
];

if(!choices.includes(randomInstrument)){

choices.push(randomInstrument);

}

}

choices.sort(()=>Math.random()-0.5);

const area =
document.getElementById(
"answerButtons"
);

area.innerHTML = "";

choices.forEach(choice=>{

let btn =
document.createElement("button");

btn.className = "sub-btn";

btn.innerText = choice;

btn.onclick = ()=>checkAnswer(choice);

area.appendChild(btn);

});

}

function checkAnswer(choice){

const result =
document.getElementById("resultArea");

const image =
document.getElementById("quizImage");

image.src =
`full/${currentAnswer}.png`;

if(choice===currentAnswer){

score++;

result.innerHTML =
`🎉 정답입니다!`;

}else{

result.innerHTML =
`😢 오답!<br>
정답은 ${currentAnswer}`;

}

setTimeout(()=>{

loadQuestion();

},2000);

}

function showResult(){

showPage("resultPage");

document
.getElementById("finalScore")
.innerHTML =
`${score} / 10`;

let message="";

if(score<=3){

message=
"🌱 국악 새싹! 국악 배움터에서 더 공부해보세요.";

}

else if(score<=7){

message=
"🎵 국악 탐험가! 조금만 더 노력하면 고수!";

}

else{

message=
"🏆 국악 고수! 정말 대단해요!";

}

document
.getElementById("finalMessage")
.innerHTML = message;

}

function restartQuiz(){

startQuiz();

}
