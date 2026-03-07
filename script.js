let questions = [

{type:"mc",q:"Past of PLAY?",a:["playd","played","plaied","playing"],c:1,d:"easy"},
{type:"mc",q:"Past of WATCH?",a:["watch","watched","watchs","watching"],c:1,d:"easy"},
{type:"mc",q:"Past of GO?",a:["goed","went","goes","going"],c:1,d:"easy"},
{type:"mc",q:"Past of EAT?",a:["eated","ate","eat","eaten"],c:1,d:"easy"},
{type:"mc",q:"Yesterday I ____ soccer",a:["play","played","plays","playing"],c:1,d:"easy"},
{type:"mc",q:"She ____ a movie yesterday",a:["watch","watched","watching","watches"],c:1,d:"easy"},
{type:"mc",q:"Past of DRINK?",a:["drinked","drank","drunk","drinking"],c:1,d:"easy"},
{type:"mc",q:"We ____ pizza yesterday",a:["eat","ate","eaten","eating"],c:1,d:"easy"},

{type:"text",q:"I ____ (visit) my grandmother yesterday",a:"visited",d:"medium"},
{type:"text",q:"They ____ (play) soccer last weekend",a:"played",d:"medium"},
{type:"text",q:"She ____ (go) to the park yesterday",a:"went",d:"medium"},
{type:"text",q:"We ____ (watch) a movie last night",a:"watched",d:"medium"},
{type:"text",q:"I ____ (eat) pizza yesterday",a:"ate",d:"medium"},
{type:"text",q:"He ____ (drink) water after the game",a:"drank",d:"medium"},
{type:"text",q:"They ____ (see) a sunset",a:"saw",d:"medium"},
{type:"text",q:"She ____ (clean) her room yesterday",a:"cleaned",d:"medium"},

{type:"tf",q:"Played is past of play",a:true,d:"medium"},
{type:"tf",q:"Goed is past of go",a:false,d:"medium"},
{type:"tf",q:"Ate is past of eat",a:true,d:"medium"},
{type:"tf",q:"Drinked is correct past of drink",a:false,d:"medium"},
{type:"tf",q:"Regular verbs usually end with -ed",a:true,d:"medium"},

{type:"mc",q:"Correct sentence?",a:["I goed yesterday","I went yesterday","I go yesterday","I going yesterday"],c:1,d:"hard"},
{type:"mc",q:"Correct sentence?",a:["She eat pizza yesterday","She ate pizza yesterday","She eaten pizza yesterday","She eating pizza"],c:1,d:"hard"},
{type:"mc",q:"Yesterday we ____ to the beach",a:["go","went","goes","going"],c:1,d:"hard"},
{type:"mc",q:"Which is correct?",a:["They watched a movie yesterday","They watch yesterday a movie","They watching a movie yesterday","They watches a movie"],c:0,d:"hard"}

]

let current=0
let score=0

let timer
let timeLeft
let maxTime
let maxPoints

function getDifficultySettings(d){

if(d==="easy"){
return {time:10,points:100}
}

if(d==="medium"){
return {time:15,points:200}
}

if(d==="hard"){
return {time:20,points:300}
}

}

function startGame(){

document.getElementById("start").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

showQuestion()

}

function showQuestion(){

let q=questions[current]

let settings=getDifficultySettings(q.d)

maxTime=settings.time
maxPoints=settings.points

timeLeft=maxTime

startTimer()

document.getElementById("question").innerText=(current+1)+". "+q.q

let answersDiv=document.getElementById("answers")
answersDiv.innerHTML=""

document.getElementById("text-answer").classList.add("hidden")
document.getElementById("submit-text").classList.add("hidden")

if(q.type==="mc"){

q.a.forEach((ans,i)=>{

let btn=document.createElement("button")
btn.innerText=ans
btn.onclick=()=>answer(i===q.c)

answersDiv.appendChild(btn)

})

}

if(q.type==="tf"){

["True","False"].forEach((ans,i)=>{

let btn=document.createElement("button")

btn.innerText=ans

btn.onclick=()=>answer((i===0)===q.a)

answersDiv.appendChild(btn)

})

}

if(q.type==="text"){

document.getElementById("text-answer").classList.remove("hidden")
document.getElementById("submit-text").classList.remove("hidden")

}

updateProgress()

}

function startTimer(){

clearInterval(timer)

timer=setInterval(()=>{

timeLeft--

updateTimerBar()

if(timeLeft<=0){

clearInterval(timer)

current++

if(current>=questions.length){

endGame()

}else{

showQuestion()

}

}

},1000)

}

function updateTimerBar(){

let percent=(timeLeft/maxTime)*100

document.getElementById("timer-bar").style.width=percent+"%"

}

function calculatePoints(){

let percent=timeLeft/maxTime

return Math.floor(maxPoints*percent)

}

function submitText(){

let input=document.getElementById("text-answer").value.toLowerCase()

let correct=questions[current].a

answer(input===correct)

document.getElementById("text-answer").value=""

}

function answer(correct){

clearInterval(timer)

if(correct){

score+=calculatePoints()

}

current++

document.getElementById("score").innerText="Score: "+score

if(current>=questions.length){

endGame()

}else{

showQuestion()

}

}

function updateProgress(){

let percent=(current/questions.length)*100

document.getElementById("progress-bar").style.width=percent+"%"

}

function endGame(){

document.getElementById("game").classList.add("hidden")

document.getElementById("end").classList.remove("hidden")

document.getElementById("final-score").innerText="Final Score: "+score

}
