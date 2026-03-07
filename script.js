/* ================================= */
/*           PERGUNTAS DO QUIZ       */
/* ================================= */

let questions=[

// EASY MULTIPLE CHOICE

{type:"mc",q:"Past of PLAY?",a:["playd","played","plaied","playing"],c:1,d:"easy"},
{type:"mc",q:"Past of WALK?",a:["walked","walk","walking","walks"],c:0,d:"easy"},
{type:"mc",q:"Past of WATCH?",a:["watch","watching","watched","watchs"],c:2,d:"easy"},
{type:"mc",q:"Past of CLEAN?",a:["clean","cleaned","cleand","cleaning"],c:1,d:"easy"},
{type:"mc",q:"Past of STUDY?",a:["studied","studyed","studing","study"],c:0,d:"easy"},
{type:"mc",q:"Past of GO?",a:["goed","went","goes","going"],c:1,d:"easy"},
{type:"mc",q:"Past of EAT?",a:["eat","eated","ate","eating"],c:2,d:"easy"},
{type:"mc",q:"Past of DRINK?",a:["drinked","drank","drunk","drinks"],c:1,d:"easy"},


// TRUE / FALSE

{type:"tf",q:"Played is the past of play",a:true,d:"medium"},
{type:"tf",q:"Goed is the past of go",a:false,d:"medium"},
{type:"tf",q:"Ate is the past of eat",a:true,d:"medium"},
{type:"tf",q:"Drinked is correct past of drink",a:false,d:"medium"},
{type:"tf",q:"Regular verbs usually end with -ed",a:true,d:"medium"},


// MULTIPLE CHOICE MEDIUM

{type:"mc",q:"Yesterday I ____ soccer",a:["play","played","plays","playing"],c:1,d:"medium"},
{type:"mc",q:"She ____ a movie yesterday",a:["watch","watched","watching","watches"],c:1,d:"medium"},
{type:"mc",q:"We ____ pizza yesterday",a:["eat","ate","eated","eating"],c:1,d:"medium"},
{type:"mc",q:"They ____ to school yesterday",a:["go","went","goed","going"],c:1,d:"medium"},
{type:"mc",q:"He ____ water after the game",a:["drink","drank","drinked","drunk"],c:1,d:"medium"},


// HARD MULTIPLE CHOICE

{type:"mc",q:"Correct sentence?",a:["I goed to school yesterday","I went to school yesterday","I go to school yesterday","I going to school yesterday"],c:1,d:"hard"},
{type:"mc",q:"Correct sentence?",a:["She eat pizza yesterday","She ate pizza yesterday","She eating pizza yesterday","She eaten pizza yesterday"],c:1,d:"hard"},
{type:"mc",q:"Yesterday we ____ to the beach",a:["go","went","going","goes"],c:1,d:"hard"},
{type:"mc",q:"Which is correct?",a:["They watched a movie yesterday","They watch yesterday a movie","They watching yesterday","They watches yesterday"],c:0,d:"hard"},


// TEXT QUESTIONS (ESCREVER)

{type:"text",q:"I ____ (visit) my grandmother yesterday",a:"visited",d:"text"},
{type:"text",q:"She ____ (clean) her room yesterday",a:"cleaned",d:"text"},
{type:"text",q:"They ____ (play) soccer last weekend",a:"played",d:"text"},
{type:"text",q:"We ____ (watch) a movie last night",a:"watched",d:"text"},
{type:"text",q:"He ____ (cook) dinner yesterday",a:"cooked",d:"text"}

]



/* ================================= */
/*        VARIÁVEIS DO JOGO          */
/* ================================= */

let current=0
let score=0
let timer
let timeLeft
let maxTime
let maxPoints



/* ================================= */
/*      CONFIGURAÇÃO DE TEMPO        */
/* ================================= */

function getDifficultySettings(d){

if(d==="easy"){
return {time:15,points:100}
}

if(d==="medium"){
return {time:18,points:150}
}

if(d==="hard"){
return {time:22,points:250}
}

if(d==="text"){
return {time:30,points:300}
}

}



/* ================================= */
/*          INICIAR JOGO             */
/* ================================= */

function startGame(){

document.getElementById("start").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

showQuestion()

}



/* ================================= */
/*        MOSTRAR PERGUNTA           */
/* ================================= */

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



/* ================================= */
/*            TIMER                  */
/* ================================= */

function startTimer(){

clearInterval(timer)

timer=setInterval(()=>{

timeLeft-=0.1

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

},100)

}



function updateTimerBar(){

let percent=(timeLeft/maxTime)*100

document.getElementById("timer-bar").style.width=percent+"%"

}



/* ================================= */
/*          CALCULAR PONTOS          */
/* ================================= */

function calculatePoints(){

let percent=timeLeft/maxTime

return Math.floor(maxPoints*percent)

}



/* ================================= */
/*      ENVIAR RESPOSTA TEXTO        */
/* ================================= */

function submitText(){

let input=document.getElementById("text-answer").value.toLowerCase()

let correct=questions[current].a

answer(input===correct)

}



/* ================================= */
/*        RESPONDER PERGUNTA         */
/* ================================= */

function answer(correct){

clearInterval(timer)

let feedback=document.getElementById("feedback")

feedback.classList.remove("hidden")

if(correct){

score+=calculatePoints()

feedback.innerText="✅ Correct!"

feedback.className="correct"

}else{

feedback.innerText="❌ Wrong!"

feedback.className="wrong"

}

document.getElementById("score").innerText="Score: "+score

setTimeout(()=>{

feedback.classList.add("hidden")

current++

if(current>=questions.length){
endGame()
}else{
showQuestion()
}

},1500)

}



/* ================================= */
/*       BARRA DE PROGRESSO          */
/* ================================= */

function updateProgress(){

let percent=(current/questions.length)*100

document.getElementById("progress-bar").style.width=percent+"%"

}



/* ================================= */
/*            FINAL DO JOGO          */
/* ================================= */

function endGame(){

document.getElementById("game").classList.add("hidden")

document.getElementById("end").classList.remove("hidden")

document.getElementById("final-score").innerText="Final Score: "+score

}
