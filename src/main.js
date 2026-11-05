import './style.css'
import questions from './data/questions.json'
import ptn_qns from './data/ptn_qns.json'

// This placeholder only proves your setup works.
// Replace it with your own app.
// document.querySelector('#app').innerHTML = `
//   <main class="placeholder">
//     <h1>Setup works!</h1>
//     <p>${questions.length} quiz questions loaded.</p>
//     <p>Replace this screen with your app.</p>
//   </main>
// `

// the 2 game's "shared" vars
let teamName = localStorage.getItem('teamName') || ''
let currentIndex = 0

function showStartScreen() {
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>Team Name</h1>
      <form id="name-form">
        <input type="text" id="text-input" placeholder="Enter Your Team Name" />
        <button type="submit">Save</button>
      </form>
    </main>
  `

  document.querySelector('#name-form').addEventListener('submit', (e) => {
    e.preventDefault()
    teamName = document.querySelector('#text-input').value.trim()
    localStorage.setItem('teamName', teamName)
    //console.log(teamName)
    if (!teamName) return
    showChoiceScreen()
  })
}

function showChoiceScreen() {
    document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>Choose A Game</h1>
        <button id="selectQuiz">5 Question Quiz</button>
        <button id="selectGame">Point Game</button>
    </main>
  `

  document.querySelector('#selectQuiz').addEventListener('click', () => {
    //console.log('clicked Quiz')
    showQuizGame()
  })

  document.querySelector('#selectGame').addEventListener('click', () => {
    //console.log('clicked Game')
    showPtnGame()
  })
}

// ptn game
// 5 rds so max score of 5*4=20 so win is ptns >= 16
let points = 0 // +4 +2 +1 +0
function showPtnGame() {
  currentIndex = 0
  points = 0
  showPtnQn()
}

function showPtnQn() {
  const q = ptn_qns[currentIndex]

  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <p>Question ${currentIndex + 1} of ${ptn_qns.length}</p>
      <h2>${q.question}</h2>
      ${q.options
        .map((opt, i) => `<button class="option" data-index="${i}">${opt.text}</button>`)
        .join('')}
    </main>
  `

  document.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = q.options[Number(btn.dataset.index)]
      points += chosen.points

      currentIndex++
      if (currentIndex < ptn_qns.length) {
        showPtnQn()
      } else {
        showPtnResult()
      }
    })
  })
}

function showPtnResult() {
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>Done!</h1>
      <p>You got ${points} points</p>
      <button id="end">end</button>
    </main>
  `
  win = points >= 16

  document.querySelector('#end').addEventListener('click', () => {
    if (win) {
      showWinScreen()
    } else {
      showLoseScreen()
    }
  })
}

// quiz game
let score = 0
function showQuizGame() {
  currentIndex = 0
  score = 0
  showQuestion()
}

function showQuestion() {
  const q = questions[currentIndex]

  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <p>Question ${currentIndex + 1} of ${questions.length}</p>
      <h1>${q.question}</h1>
      ${q.options
        .map((val, i) => `<button class="option" data-index="${i}">${val}</button>`)
        .join('')}
    </main>
  `

  document.querySelectorAll('.option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = Number(btn.dataset.index)
      if (chosen === q.answerIndex) score++

      currentIndex++
      if (currentIndex < questions.length) {
        showQuestion()
      } else {
        showResult()
      }
    })
  })
}

let win = false;
function showResult() {
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>Done!</h1>
      <p>You scored ${score} / ${questions.length}</p>
      <button id="end">end</button>
    </main>
  `
  win = score >= 4

  document.querySelectorAll('#end').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (win) {
        showWinScreen()
      } else {
        showLoseScreen()
      }
    })
  })
}

function showWinScreen() {
  document.body.className = 'win'
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>${teamName} Wins</h1>
    </main>
  `
}

function showLoseScreen() {
  document.body.className = 'lose'
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>Try Again Next Time ,${teamName}</h1>
    </main>
  `
}


showStartScreen()