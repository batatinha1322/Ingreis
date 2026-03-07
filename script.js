/* ===================== */
/* PERGUNTAS DO QUIZ */
/* ===================== */

let questions=[

{type:"mc",q:"Past of PLAY?",a:["playd","played","plaied","playing"],c:1,d:"easy"},
{type:"mc",q:"Past of GO?",a:["goed","went","goes","going"],c:1,d:"easy"},

{type:"text",q:"I ____ (visit) my grandmother yesterday",a:"visited",d:"medium"},
{type:"text",q:"They ____ (play) soccer last weekend",a:"played",d:"medium"},

{type:"tf",q:"Played is past of play",a:true,d:"medium"},
{type:"tf",q:"Goed is past of go",a:false,d:"medium"},

{type:"mc",q:"Correct sentence?",a:["I goed yesterday","I went yesterday","I go yesterday","I going yesterday"],c:1,d:"hard"}

]


/* ===================== */
/* VARIÁVEIS DO JOGO */
/* ===================== */

let current=0

let score=0

let timer

let timeLeft

let maxTime

let maxPoints



/* ===================== */
/* CONFIGURAÇÃO DA DIFICULDADE */
/* ===================== */

function getDifficultySettings(d){

if(d==="easy"){

return {time:15,points:100}

}

if(d==="medium"){

return {time:20,points:200}

}

if(d==="hard"){

return {time:25,points:300}

}

}



/* ===================== */
/* INICIAR JOGO */
/* ===================== */

function startGame(){

document.getElementById("start").classList.add("hidden")

document.getElementById("game").classList.remove("hidden")

showQuestion()

}



/* ===================== */
/* MOSTRAR PERGUNTA */
/* ===================== */

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



/* múltipla escolha */

if(q.type==="mc"){

q.a.forEach((ans,i)=>{

let btn=document.createElement("button")

btn.innerText=ans

btn.onclick=()=>answer(i===q.c)

answersDiv.appendChild(btn)

})

}



/* verdadeiro ou falso */

if(q.type==="tf"){

["True","False"].forEach((ans,i)=>{

let btn=document.createElement("button")

btn.innerText=ans

btn.onclick=()=>answer((i===0)===q.a)

answersDiv.appendChild(btn)

})

}



/* resposta digitada */

if(q.type==="text"){

document.getElementById("text-answer").classList.remove("hidden")

document.getElementById("submit-text").classList.remove("hidden")

}



updateProgress()

}



/* ===================== */
/* TIMER DA PERGUNTA */
/* ===================== */

function startTimer(){

clearInterval(timer)

timer=setInterval(()=>{

timeLeft-=0.1

updateTimerBar()

if(timeLeft<=0){

clearInterval(timer)

current++

showQuestion()

}

},100)

}



/* atualizar barra do timer */

function updateTimerBar(){

let percent=(timeLeft/maxTime)*100

document.getElementById("timer-bar").style.width=percent+"%"

}



/* ===================== */
/* CALCULAR PONTOS */
/* ===================== */

function calculatePoints(){

let percent=timeLeft/maxTime

return Math.floor(maxPoints*percent)

}



/* ===================== */
/* ENVIAR RESPOSTA DIGITADA */
/* ===================== */

function submitText(){

let input=document.getElementById("text-answer").value.toLowerCase()

let correct=questions[current].a

answer(input===correct)

}



/* ===================== */
/* RESPONDER PERGUNTA */
/* ===================== */

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



/* ===================== */
/* BARRA DE PROGRESSO */
/* ===================== */

function updateProgress(){

let percent=(current/questions.length)*100

document.getElementById("progress-bar").style.width=percent+"%"

}



/* ===================== */
/* TELA FINAL */
/* ===================== */

function endGame(){

document.getElementById("game").classList.add("hidden")

document.getElementById("end").classList.remove("hidden")

document.getElementById("final-score").innerText="Final Score: "+score

}
