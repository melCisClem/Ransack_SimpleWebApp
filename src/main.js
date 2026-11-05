import './style.css'
import questions from './data/questions.json'

// This placeholder only proves your setup works.
// Replace it with your own app.
// document.querySelector('#app').innerHTML = `
//   <main class="placeholder">
//     <h1>Setup works!</h1>
//     <p>${questions.length} quiz questions loaded.</p>
//     <p>Replace this screen with your app.</p>
//   </main>
// `

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

  let teamName = ''
  document.querySelector('#name-form').addEventListener('submit', (e) => {
    e.preventDefault()
    teamName = document.querySelector('#text-input').value.trim()
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


// 5 rds so max score of 5*4=20 so win is ptns >= 16
let points = 0 // +4 +2 +1 +0
function showPtnGame() {
  
}


let currentIndex = 0
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
  if (score >= 4){
    win = true
  } else {
    win = false
  }

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
      <h1>You Win</h1>
    </main>
  `
}

function showLoseScreen() {
  document.body.className = 'lose'
  document.querySelector('#app').innerHTML = `
    <main class="placeholder">
      <h1>You Lose</h1>
    </main>
  `
}


showStartScreen()