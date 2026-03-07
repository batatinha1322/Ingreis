
/* ================================
VARIÁVEIS PRINCIPAIS DO QUIZ
================================ */

let currentQuestion = 0
let score = 0
let hits = 0
let timer
let timeLeft
let maxScore = 0
let answered = false


/* ================================
LISTA DE 25 PERGUNTAS
================================ */

const questions = [

/* MULTIPLA ESCOLHA */

{
type:"multiple",
question:"What is the past of GO?",
answers:["goed","went","goes","gone"],
correct:"went",
time:10
},

{
type:"multiple",
question:"What is the past of EAT?",
answers:["ate","eated","eat","eaten"],
correct:"ate",
time:10
},

{
type:"multiple",
question:"What is the past of SEE?",
answers:["seed","saw","seen","see"],
correct:"saw",
time:10
},

{
type:"multiple",
question:"What is the past of TAKE?",
answers:["took","taked","taken","take"],
correct:"took",
time:10
},

{
type:"multiple",
question:"What is the past of DRINK?",
answers:["drinked","drank","drunk","drink"],
correct:"drank",
time:10
},

/* VERDADEIRO OU FALSO */

{
type:"truefalse",
question:"The past of RUN is RAN",
correct:"true",
time:7
},

{
type:"truefalse",
question:"The past of PLAY is PLAYED",
correct:"true",
time:7
},

{
type:"truefalse",
question:"The past of SING is SINGED",
correct:"false",
time:7
},

{
type:"truefalse",
question:"The past of WRITE is WRITED",
correct:"false",
time:7
},

{
type:"truefalse",
question:"The past of BUY is BOUGHT",
correct:"true",
time:7
},

/* ESCREVER (MAIS TEMPO) */

{
type:"write",
question:"Write the past of MAKE",
correct:"made",
time:17
},

{
type:"write",
question:"Write the past of DO",
correct:"did",
time:17
},

{
type:"write",
question:"Write the past of HAVE",
correct:"had",
time:17
},

{
type:"write",
question:"Write the past of FIND",
correct:"found",
time:17
},

{
type:"write",
question:"Write the past of THINK",
correct:"thought",
time:17
},

{
type:"write",
question:"Write the past of COME",
correct:"came",
time:17
},

{
type:"write",
question:"Write the past of GIVE",
correct:"gave",
time:17
},

{
type:"write",
question:"Write the past of KNOW",
correct:"knew",
time17
},

{
type:"write",
question:"Write the past of SPEAK",
correct:"spoke",
time17
},

{
type:"write",
question:"Write the past of DRIVE",
correct:"drove",
time217
},

/* MAIS DIFÍCEIS */

{
type:"multiple",
question:"What is the past of FLY?",
answers:["flied","flew","flown","flyed"],
correct:"flew",
time:10
},

{
type:"multiple",
question:"What is the past of SWIM?",
answers:["swam","swimmed","swum","swim"],
correct:"swam",
time:10
},

{
type:"truefalse",
question:"The past of BREAK is BROKE",
correct:"true",
time:7
},

{
type:"truefalse",
question:"The past of TEACH is TEACHED",
correct:"false",
time:7
},

{
type:"write",
question:"Write the past of CHOOSE",
correct:"chose",
time:17
}

]



/* ================================
FUNÇÃO PARA MOSTRAR PERGUNTA
================================ */

function showQuestion(){

answered = false

const q = questions[currentQuestion]

document.getElementById("feedback").innerHTML=""

document.getElementById("question").innerHTML=q.question

const answersDiv = document.getElementById("answers")

answersDiv.innerHTML=""

/* ATUALIZA O CONTADOR DE PERGUNTAS */

document.getElementById("currentQuestion").innerText = currentQuestion + 1
document.getElementById("totalQuestions").innerText = questions.length

/* CRIA BOTÕES PARA MULTIPLA ESCOLHA */

if(q.type==="multiple"){

q.answers.forEach(a=>{

const btn=document.createElement("button")

btn.innerText=a

btn.onclick=()=>checkAnswer(a)

answersDiv.appendChild(btn)

})

}



/* VERDADEIRO OU FALSO */

if(q.type==="truefalse"){

["true","false"].forEach(a=>{

const btn=document.createElement("button")

btn.innerText=a

btn.onclick=()=>checkAnswer(a)

answersDiv.appendChild(btn)

})

}



/* PERGUNTA DE ESCREVER */

if(q.type==="write"){

const input=document.createElement("input")

input.id="textAnswer"

answersDiv.appendChild(input)

const btn=document.createElement("button")

btn.innerText="Responder"

btn.onclick=()=>checkAnswer(input.value)

answersDiv.appendChild(btn)

}



/* INICIA TIMER */

startTimer(Number(q.time))

}

/* =================================
   TIMER DA PERGUNTA
   controla o tempo e a barra
================================= */

function startTimer(time){

timer = null
clearInterval(timer)

timeLeft = time

const bar = document.getElementById("progress-bar")

timer = setInterval(()=>{

timeLeft--

/* atualiza texto do tempo */
document.getElementById("timer").innerText = "Tempo: " + timeLeft

/* atualiza barra verde */
bar.style.width = (timeLeft / time * 100) + "%"

/* quando acaba o tempo */
if(timeLeft <= 0){

clearInterval(timer)

showFeedback(false)

}

},100)

}

/* ================================
VERIFICAR RESPOSTA
================================ */

function checkAnswer(answer){

if(answered)return

answered=true

clearInterval(timer)

const q=questions[currentQuestion]

const correct=answer.toString().toLowerCase().trim()===q.correct

if(correct){

score+=timeLeft*10

hits++

}

showFeedback(correct)

/* ATUALIZA A PONTUAÇÃO NA TELA */

document.getElementById("scoreValue").innerText = score
  
}



/* ================================
TELA DE ACERTO / ERRO
================================ */

function showFeedback(correct){

document.getElementById("answers").innerHTML=""

document.getElementById("feedback").innerHTML=

correct?"✅ Correct!":"❌ Wrong! Correct: "+questions[currentQuestion].correct

setTimeout(nextQuestion,2000)

}



/* ================================
PRÓXIMA PERGUNTA
================================ */

function nextQuestion(){

currentQuestion++

if(currentQuestion>=questions.length){

endQuiz()

}else{

showQuestion()

}

}



/* ================================
TELA FINAL
================================ */

function endQuiz(){

document.getElementById("question").innerHTML=""

document.getElementById("answers").innerHTML=""

document.getElementById("timer").innerHTML=""

document.getElementById("progress-container").style.display="none"

document.getElementById("final").classList.remove("hidden")

document.getElementById("score").innerText="Score: "+score

document.getElementById("hits").innerText="Correct answers: "+hits+" / 25"

document.getElementById("maxScore").innerText="Max possible score: 5000"

}



/* ================================
RECOMEÇAR QUIZ
================================ */

function restartQuiz(){

location.reload()

}



/* ================================
INICIAR QUIZ
================================ */

showQuestion()
