const questions=[
    {
        question: "Which is largest animal in the world",
        answers:[
            {text:"Shark", correct:false},
            {text:"Blue Wale", correct:true},
            {text:"Elephant", correct:false},
            {text:"Giraffe", correct:false},

        ]
    },
    {
        question: "Which is city in the world",
        answers:[
            {text:"Delhi", correct:false},
            {text:"Shanghai", correct:false},
            {text:"Tokyo", correct:true },
            {text:"Dhaka", correct:false},

        ]
    },
    {
        question: "Which is largest river in the world",
        answers:[
            {text:"River Nile", correct:true },
            {text:"Amazon River", correct:false},
            {text:"Yangtze River", correct:false},
            {text:"Yellow River", correct:false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex= 0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let  questionNo= currentQuestionIndex+1;
    questionElement.innerHTML= questionNo+". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button= document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct= answer.correct
        }
        button.addEventListener("click", selectAnswer);

    } );
  
}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn =e.target;
    const iscorrect = selectedBtn.dataset.correct=="true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct=="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";

}


startQuiz()