let questions = [
{
question: "What is the past of GO?",
answers: ["goed","went","goes","going"],
correct: 1
},

{
question: "What is the past of PLAY?",
answers: ["playd","played","playing","plaied"],
correct: 1
},

{
question: "She ____ pizza yesterday.",
answers: ["eat","ate","eats","eating"],
correct: 1
},

{
question: "We ____ a movie last night.",
answers: ["watch","watched","watching","watches"],
correct: 1
}

]

let current = 0
let score = 0

function startGame(){
document.getElementById("start-screen").classList.add("hidden")
document.getElementById("quiz").classList.remove("hidden")
showQuestion()
}

function showQuestion(){

let q = questions[current]

document.getElementById("question").innerText = q.question

for(let i=0;i<4;i++){
document.getElementById("a"+i).innerText = q.answers[i]
}

}

function answer(i){

if(i === questions[current].correct){
score++
}

current++

if(current >= questions.length){
endGame()
}else{
showQuestion()
}

document.getElementById("score").innerText = "Score: " + score
}

function endGame(){

document.getElementById("quiz").classList.add("hidden")
document.getElementById("result").classList.remove("hidden")

document.getElementById("final-score").innerText =
"Your score: " + score + "/" + questions.length

}
