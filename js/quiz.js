// Logika quiz interaktif untuk prototype HETS.
const PASSING_SCORE = 75;
const questions = HETSData.quizQuestions;

const questionCounter = document.getElementById('question-counter');
const progressFill = document.getElementById('quiz-progress-fill');
const progressText = document.getElementById('quiz-progress-text');
const questionContent = document.getElementById('question-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentQuestionIndex = 0;
const selectedAnswers = new Array(questions.length).fill(null);

function updateProgress() {
  const percent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${Math.round(percent)}%`;
  questionCounter.textContent = `Soal ${currentQuestionIndex + 1} dari ${questions.length}`;
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Selesai' : 'Next';
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContent.innerHTML = `
    <h3 class="question-title">${currentQuestion.question}</h3>
    <div class="option-list">
      ${currentQuestion.options.map((option, index) => `
        <label class="option-item">
          <input type="radio" name="answer" value="${index}" ${selectedAnswers[currentQuestionIndex] === index ? 'checked' : ''} />
          <span>${option}</span>
        </label>
      `).join('')}
    </div>
  `;

  questionContent.querySelectorAll('input').forEach((input) => {
    input.addEventListener('change', (event) => {
      selectedAnswers[currentQuestionIndex] = Number(event.target.value);
      updateProgress();
    });
  });

  updateProgress();
}

function calculateResult() {
  let correct = 0;
  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      correct += 1;
    }
  });

  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= PASSING_SCORE;
  return { correct, wrong: questions.length - correct, score, passed };
}

function showResult() {
  const result = calculateResult();
  const resultMarkup = `
    <div class="result-card">
      <div class="result-icon ${result.passed ? 'pass' : 'fail'}">${result.passed ? '🏆' : '✕'}</div>
      <h2>Hasil Penilaian</h2>
      <p>Anda telah menyelesaikan kuis pelatihan.</p>
      <div class="result-grid">
        <div class="result-row"><strong>Nilai</strong><span>${result.score}</span></div>
        <div class="result-row"><strong>Status</strong><span class="status-pill ${result.passed ? 'pass' : 'fail'}">${result.passed ? 'Lulus' : 'Tidak Lulus'}</span></div>
        <div class="result-row"><strong>Benar</strong><span>${result.correct}</span></div>
        <div class="result-row"><strong>Salah</strong><span>${result.wrong}</span></div>
        <div class="result-row"><strong>Persentase</strong><span>${result.score}%</span></div>
      </div>
      <div class="quiz-actions">
        <a class="btn btn-secondary" href="quiz.html">Ulangi Quiz</a>
        <a class="btn btn-primary" href="dashboard.html">Kembali Dashboard</a>
      </div>
    </div>
  `;
  questionContent.innerHTML = resultMarkup;
}

prevBtn.addEventListener('click', () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  if (selectedAnswers[currentQuestionIndex] === null) {
    alert('Silakan pilih jawaban sebelum melanjutkan.');
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

renderQuestion();
