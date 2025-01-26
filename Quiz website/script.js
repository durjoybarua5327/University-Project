const questionsBySubject ={
  "Computer Network": [
    {
      question: "What is the main function of a router in a computer network?",
      answers: [
        { text: "Forward data packets between networks", correct: true },
        { text: "Store data packets temporarily", correct: false },
        { text: "Create network connections", correct: false },
        { text: "Secure data transmission", correct: false }
      ]
    },
    {
      question: "Which protocol is used for secure communication over the internet?",
      answers: [
        { text: "HTTP", correct: false },
        { text: "HTTPS", correct: true },
        { text: "FTP", correct: false },
        { text: "SMTP", correct: false }
      ]
    },
    {
      question: "What is the purpose of the Domain Name System (DNS)?",
      answers: [
        { text: "Translate domain names into IP addresses", correct: true },
        { text: "Send emails over the internet", correct: false },
        { text: "Secure connections between devices", correct: false },
        { text: "Monitor network traffic", correct: false }
      ]
    },
    {
      question: "Which of the following is an example of a network topology?",
      answers: [
        { text: "Star", correct: true },
        { text: "Router", correct: false },
        { text: "Firewall", correct: false },
        { text: "IP Address", correct: false }
      ]
    },
    {
      question: "What does the term 'IP address' stand for in a computer network?",
      answers: [
        { text: "Internet Protocol address", correct: true },
        { text: "International Protocol address", correct: false },
        { text: "Internal Process address", correct: false },
        { text: "Internet Provision address", correct: false }
      ]
    },
    {
      question: "What is the function of the Transport Layer in the OSI model?",
      answers: [
        { text: "End-to-end communication and error handling", correct: true },
        { text: "Data encoding and decoding", correct: false },
        { text: "Routing data between networks", correct: false },
        { text: "Providing network security", correct: false }
      ]
    },
    {
      question: "Which of the following devices is used to connect two different networks?",
      answers: [
        { text: "Hub", correct: false },
        { text: "Switch", correct: false },
        { text: "Router", correct: true },
        { text: "Bridge", correct: false }
      ]
    },
    {
      question: "Which protocol is used to transfer files between computers in a network?",
      answers: [
        { text: "FTP", correct: true },
        { text: "HTTP", correct: false },
        { text: "SMTP", correct: false },
        { text: "POP3", correct: false }
      ]
    },
    {
      question: "What does the term 'latency' refer to in computer networking?",
      answers: [
        { text: "The speed of data transfer", correct: false },
        { text: "The delay in data transmission", correct: true },
        { text: "The amount of data transmitted", correct: false },
        { text: "The capacity of the network", correct: false }
      ]
    }
  ]
};

const subjectSelectionElement = document.getElementById("subject-selection");
const quizScreenElement = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function showSubjectSelection() {
  subjectSelectionElement.style.display = "block";
  quizScreenElement.style.display = "none";
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function startQuiz(subject) {
    currentQuestions = questionsBySubject[subject];
    
    shuffleArray(currentQuestions);
    
    currentQuestions = currentQuestions.slice(0, 15);
    currentQuestionIndex = 0;
    score = 0;
  
    nextButton.innerHTML = "Next";
  
    subjectSelectionElement.style.display = "none";
    quizScreenElement.style.display = "block";
    showQuestion();
  }
  



function showQuestion() {
  resetState();
  let currentQuestion = currentQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}


function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}


function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct == "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}


function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${currentQuestions.length}!`;
  nextButton.innerHTML = "Try Again?";
  nextButton.style.display = "block";
}


function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < currentQuestions.length) {
    handleNextButton();
  } else {
    showSubjectSelection(); 
  }
});

showSubjectSelection();
