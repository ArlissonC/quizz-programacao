// Variáveis
const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContaienr = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

// Perguntas
const questions = [
  {
    "question": "PHP foi desenvolvido para qual fim?",
    "answers": [
      {
        "answer": "back-end",
        "correct": true
      },
      {
        "answer": "front-end",
        "correct": false
      },
      {
        "answer": "Sistema operacional",
        "correct": false
      },
      {
        "answer": "Banco de dados",
        "correct": false
      },
    ]
  },
  {
    "question": "Uma forma de declarar variável em JavaScript:",
    "answers": [
      {
        "answer": "$var",
        "correct": false
      },
      {
        "answer": "var",
        "correct": true
      },
      {
        "answer": "@var",
        "correct": false
      },
      {
        "answer": "#let",
        "correct": false
      },
    ]
  },
  {
    "question": "Qual o seletor de id no CSS?",
    "answers": [
      {
        "answer": "#",
        "correct": true
      },
      {
        "answer": ".",
        "correct": false
      },
      {
        "answer": "@",
        "correct": false
      },
      {
        "answer": "/",
        "correct": false
      },
    ]
  },
  {
    "question": "HTML é uma linguagem de:",
    "answers": [
      {
        "answer": "Marcação de Hipertexto",
        "correct": true
      },
      {
        "answer": "Programação",
        "correct": false
      },
      {
        "answer": "um determinado país",
        "correct": false
      },
      {
        "answer": "back-end",
        "correct": false
      },
    ]
  },
];

// Substituição do quizz para a primeira pergunta
const init = () => {
  createQuestion(0);
}

// Cria pergunta
const createQuestion = (i) => {
  // Limpa a questão anterior
  const oldButtons = answersBox.querySelectorAll('button');

  oldButtons.forEach(btn => {
    btn.remove();
  });

  // Altera o texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  // Insere as alternativas
  questions[i].answers.forEach((answer, i) => {
    // Cria o template do botão de quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // Remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // Inserir a alternativa na tela
    answersBox.appendChild(answerTemplate);

    answerTemplate.addEventListener('click', (e) => {
      checkAnswer(e.currentTarget);
    })
  });

  // Incrementar o numero da questão
  actualQuestion++;
}

// Verificando respota
const checkAnswer = (btn) => {
  const buttons = answersBox
  .querySelectorAll('button');

  // Verifica se a resposta está correta
  buttons.forEach(button => {
    if (button.getAttribute("correct-answer") === 'true') {
      button.classList.add("correct-answer");

      // Checa se o usuário acertou
      if (btn === button) {
        points++;
      }

    } else {
      button.classList.add("wrong-answer");
    }
  });

  // Exibir próxi pergunta
  nextQuestion();

}

const nextQuestion = () => {
  // Timer
  setTimeout(() => {
    // Verific se ainda há perguntaas
    if (actualQuestion >= questions.length) {
      // Mensagem de sucesso
      showSucccessMessage();
      return;
    }
    createQuestion(actualQuestion);
  }, 1500);
}

// Exibe a tela final

const showSucccessMessage = () => {
  hideOrShowQuizz();

  // Trocar dados da tela de sucesso

  // Calcular score
  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');

  displayScore.textContent = score.toString();

  // Alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');

  correctAnswers.textContent = points;

  // Alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = questions.length;
}

// Mostra ou esconde o score
const hideOrShowQuizz = () => {
  quizzContainer.classList.toggle('hide');
  scoreContaienr.classList.toggle('hide');
}

// Reiniciar Quizz
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', () => {
  // Zerar Jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

init();