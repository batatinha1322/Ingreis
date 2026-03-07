let questions = [

{type:"mc",q:"Past of PLAY?",a:["playd","played","plaied","playing"],c:1,p:100},

{type:"mc",q:"Past of WATCH?",a:["watch","watched","watchs","watching"],c:1,p:100},

{type:"mc",q:"Past of GO?",a:["goed","went","goes","going"],c:1,p:100},

{type:"mc",q:"Past of EAT?",a:["eated","ate","eat","eaten"],c:1,p:100},

{type:"mc",q:"Yesterday I ____ soccer",a:["play","played","plays","playing"],c:1,p:100},

{type:"mc",q:"She ____ a movie yesterday",a:["watch","watched","watching","watches"],c:1,p:100},

{type:"mc",q:"Past of DRINK?",a:["drinked","drank","drunk","drinking"],c:1,p:100},

{type:"mc",q:"We ____ pizza yesterday",a:["eat","ate","eaten","eating"],c:1,p:100},

{type:"text",q:"I ____ (visit) my grandmother yesterday",a:"visited",p:200},

{type:"text",q:"They ____ (play) soccer last weekend",a:"played",p:200},

{type:"text",q:"She ____ (go) to the park yesterday",a:"went",p:200},

{type:"text",q:"We ____ (watch) a movie last night",a:"watched",p:200},

{type:"text",q:"I ____ (eat) pizza yesterday",a:"ate",p:200},

{type:"text",q:"He ____ (drink) water after the game",a:"drank",p:200},

{type:"text",q:"They ____ (see) a sunset",a:"saw",p:200},

{type:"text",q:"She ____ (clean) her room yesterday",a:"cleaned",p:200},

{type:"tf",q:"Played is past of play",a:true,p:200},

{type:"tf",q:"Goed is past of go",a:false,p:200},

{type:"tf",q:"Ate is past of eat",a:true,p:200},

{type:"tf",q:"Drinked is correct past of drink",a:false,p:200},

{type:"tf",q:"Regular verbs usually end with -ed",a:true,p:200},

{type:"mc",q:"Correct sentence?",a:["I goed yesterday","I went yesterday","I go yesterday","I going yesterday"],c:1,p:300},

{type:"mc",q:"Correct sentence?",a:["She eat pizza yesterday","She ate pizza yesterday","She eaten pizza yesterday","She eating pizza"],c:1,p:300},

{type:"mc",q:"Yesterday we ____ to the beach",a:["go","went","goes","going"],c:1,p:300},

{type:"mc",q:"Which is correct?",a:["They watched a movie yesterday","They watch yesterday a movie","They watching a movie yesterday","They watches a movie"],c:0,p:300}

]

let current=0
let score=0

function startGame(){

document.getElementById("start").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

showQuestion()

}

function showQuestion(){

let q=questions[current]

document.getElementById("question").innerText=(current+1)+". "+q.q

let answersDiv=document.getElementById("answers")

answersDiv.innerHTML=""

document.getElementById("text-answer").classList.add("hidden")
document.getElementById("submit-text").classList.add("hidden")

if(q.type==="mc"){

q.a.forEach((ans,i)=>{

let btn=document.createElement("button")

btn.innerText=ans

btn.onclick=()=>answer(i===q.c,q.p)

answersDiv.appendChild(btn)

})

}

if(q.type==="tf"){

["True","False"].forEach((ans,i)=>{

let btn=document.createElement("button")

btn.innerText=ans

btn.onclick=()=>answer((i===0)===q.a,q.p)

answersDiv.appendChild(btn)

})

}

if(q.type==="text"){

document.getElementById("text-answer").classList.remove("hidden")
document.getElementById("submit-text").classList.remove("hidden")

}

updateProgress()

}

function submitText(){

let input=document.getElementById("text-answer").value.toLowerCase()

let correct=questions[current].a

answer(input===correct,questions[current].p)

document.getElementById("text-answer").value=""

}

function answer(correct,points){

if(correct){

score+=points

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
