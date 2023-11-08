const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Чему равняется по умолчанию 1 rem',
        choice1: '10px',
        choice2: '24px',
        choice3: '16px',
        choice4: '14px',
        answer: 3,
    },
    {
        question: 'Где в HTML-документе правильное место для ссылки на внешнюю таблицу стилей?',
        choice1: 'В разделе <body>',
        choice2: 'В разделе <head>',
        choice3: 'В конце документа',
        choice4: 'В другом документе',
        answer: 2,
    },
    {
        question: 'Какой из приведённых вариантов не является допустимым значением свойства border-style?',
        choice1: 'dotted',
        choice2: 'glazed',
        choice3: 'groove',
        choice4: 'solid',
        answer: 2,
    },
    {
        question: 'Какое из следующих свойств не влияет на модель box?',
        choice1: 'content',
        choice2: 'padding',
        choice3: 'outline',
        choice4: 'border',
        answer: 3,
    },
    {
        question: 'Чему равняется значение 1 em',
        choice1: '16px',
        choice2: '24px',
        choice3: 'родителю',
        choice4: 'контейнеру в котором находится',
        answer: 3,
    },
    {
        question: 'Какого тега не существует',
        choice1: '<hr>',
        choice2: '<q>',
        choice3: '<cittee>',
        choice4: '<object>',
        answer: 3,
    },
    {
        question: 'Можно ли когда-нибудь размещать тег <script></script> в начале тега <body> ?',
        choice1: 'Да',
        choice2: 'Что такое <script>',
        choice3: 'нет',
        choice4: 'Точно нет',
        answer: 1,
    },
    {
        question: 'В чем разница между GIT и GitHub',
        choice1: 'Это одно и тоже',
        choice2: 'Один сайт, а другая программа',
        choice3: 'GitHub находится внутри GIT',
        choice4: 'Это все программы',
        answer: 2,
    },
    {
        question: 'Что такое HTML',
        choice1: 'Дополнительный язык программирования',
        choice2: 'Язык разметки',
        choice3: 'Основной язык программирования',
        choice4: 'Вспомогательный язык разметки для CSS',
        answer: 2,
    },
    {
        question: 'Какое значение по умолчанию у тега <strong>',
        choice1: 'font-weight: bold.',
        choice2: 'font-weight: normal.',
        choice3: 'font-weight: strong.',
        choice4: 'font-weight: extrabold.',
        answer: 1,
    },
    {
        question: 'Split это метод или функция ? ',
        choice1: 'Это метод',
        choice2: 'Это функция',
        choice3: 'Не split. Бывает только splice',
        choice4: 'Это и функция и метод',
        answer: 1,
    },
    {
        question: 'В чем разница между массивом и переменной ?',
        choice1: 'Переменная хранит 3 значения, а массив не ограниченное колличество',
        choice2: 'Переменная хранит только одно значение, а массив множество',
        choice3: 'Это одно и тоже так как массив находится внутри переменных',
        choice4: 'Массив это функция, а переменная это ячейка данных',
        answer: 2,
    },
    {
        question: 'Сколько областей видимости бывает в JS',
        choice1: 'глобальная, функциональная, блочная',
        choice2: 'глобальная, функциональная,блочная,строчная',
        choice3: 'бесконечное множество',
        choice4: 'глобальная, функциональная, блочная, составная',
        answer: 1,
    },
    {
        question: 'Что такое Date ?',
        choice1: 'Встроенный объект',
        choice2: 'Встроенный метод',
        choice3: 'Функция внутри которой находиться метод',
        choice4: 'Это дата',
        answer: 1,
    },
    {
        question: 'Что такое setTimeout ?',
        choice1: 'Пзволяет вызвать функцию один раз через определённый интервал времени',
        choice2: 'Позволяет вызывать функцию регулярно, повторяя вызов через определённый интервал времени',
        choice3: 'Зацикливает функцию',
        choice4: 'Настройка времени',
        answer: 1,
    },
    {
        question: 'Что такое HTTPS',
        choice1: 'Протокол для активации страница в интернете',
        choice2: 'Протокол небезопасной передачи данных',
        choice3: 'Протокол безопасной передачи данных',
        choice4: 'Протокол взаимодействия с пользователем',
        answer: 3,
    },
    {
        question: 'Интернет это одна большая сеть или интернет состоит из множества под сетей ?',
        choice1: 'Это одна большая сеть',
        choice2: 'Состоит из множества',
        choice3: 'Это независимая сеть',
        choice4: 'Это зависимая сеть',
        answer: 2,
    },
    {
        question: 'Что такое IP адрес',
        choice1: 'Протокол безопасности',
        choice2: 'Протокол слежения',
        choice3: 'Уникальный числовой почтовый индекс компьютера',
        choice4: 'уникальный числовой идентификатор устройства в компьютерной сети',
        answer: 4,
    },
    {
        question: 'В чем отличие хостинга от сервера',
        choice1: 'Это одно и тоже',
        choice2: 'Хостинг это аренда мощностей компьютера, а сервер это сам компьютер',
        choice3: 'Хостинг это компьютер, а сервер это аренда',
        choice4: 'Сервер это перевод слова хостинг',
        answer: 2,
    },
    {
        question: 'Сколько бывает уровней у домена ?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()