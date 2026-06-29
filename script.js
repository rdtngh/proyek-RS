const passingGrade = 75;

const questions = [
  {
    id: 1,
    question: "Apa tujuan utama pelatihan ini untuk pegawai RS Advent Bandar Lampung?",
    options: [
      "Meningkatkan keterampilan pelayanan kesehatan",
      "Mengajar dokter menggunakan teknologi baru",
      "Menjalankan administrasi rumah sakit",
      "Melakukan penelitian medis mandiri"
    ],
    answer: 0
  },
  {
    id: 2,
    question: "Apa yang harus dilakukan sebelum menjawab soal berikutnya?",
    options: [
      "Membaca seluruh pertanyaan dan pilihan jawaban",
      "Langsung memilih jawaban pertama",
      "Lewati soal jika sulit",
      "Mengubah jawaban tanpa memikirkannya"
    ],
    answer: 0
  },
  {
    id: 3,
    question: "Fitur apa yang memastikan jawaban tersimpan ketika pindah soal?",
    options: [
      "Penyimpanan lokal browser",
      "Array jawaban sementara di JavaScript",
      "Mengirim jawaban ke server",
      "Menyimpan jawaban dalam HTML statis"
    ],
    answer: 1
  },
  {
    id: 4,
    question: "Bagian mana yang dapat diubah tanpa mengubah logika JavaScript?",
    options: [
      "Array questions",
      "Fungsi renderQuestion",
      "Event listener tombol",
      "Struktur HTML utama"
    ],
    answer: 0
  },
  {
    id: 5,
    question: "Apa yang ditampilkan di halaman hasil?",
    options: [
      "Nilai akhir dan status lulus",
      "Daftar konten pelatihan",
      "Profil pengguna",
      "Kontak teknis"
    ],
    answer: 0
  },
  {
    id: 6,
    question: "Bagaimana cara menentukan status lulus dalam aplikasi ini?",
    options: [
      "Bandingkan skor persentase dengan passingGrade",
      "Gunakan jumlah soal benar saja",
      "Otomatis lulus untuk semua pengguna",
      "Periksa jumlah klik tombol"
    ],
    answer: 0
  },
  {
    id: 7,
    question: "Apa warna utama yang digunakan di desain website?",
    options: [
      "Biru dan putih",
      "Merah dan hitam",
      "Hijau dan oranye",
      "Kuning dan ungu"
    ],
    answer: 0
  },
  {
    id: 8,
    question: "Apa yang akan terjadi jika tidak semua soal dijawab?",
    options: [
      "Pengguna tidak dapat menyelesaikan pelatihan",
      "Hasil akan tetap muncul",
      "Sistem memilih jawaban secara otomatis",
      "Semua jawaban dianggap salah"
    ],
    answer: 0
  },
  {
    id: 9,
    question: "Tombol 'Ulangi Pelatihan' berfungsi untuk?",
    options: [
      "Mengatur ulang jawaban dan memulai ulang quiz",
      "Menutup aplikasi",
      "Menambah soal baru",
      "Menyimpan hasil ke server"
    ],
    answer: 0
  },
  {
    id: 10,
    question: "Bagian mana yang tidak digunakan di situs ini?",
    options: [
      "Backend server",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    answer: 0
  }
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startBtn = document.getElementById("start-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const retryBtn = document.getElementById("retry-btn");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const currentQuestionNumber = document.getElementById("current-question-number");
const totalQuestions = document.getElementById("total-questions");
const progressFill = document.getElementById("progress-fill");
const summaryTotal = document.getElementById("summary-total");
const summaryCorrect = document.getElementById("summary-correct");
const summaryWrong = document.getElementById("summary-wrong");
const summaryScore = document.getElementById("summary-score");
const summaryPercentage = document.getElementById("summary-percentage");
const summaryStatus = document.getElementById("summary-status");

let currentQuestionIndex = 0;
const selectedAnswers = new Array(questions.length).fill(null);

function showScreen(screen) {
  startScreen.classList.remove("active-screen");
  quizScreen.classList.remove("active-screen");
  resultScreen.classList.remove("active-screen");
  screen.classList.add("active-screen");
}

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  currentQuestionNumber.textContent = currentQuestionIndex + 1;
  totalQuestions.textContent = questions.length;
  questionText.textContent = currentQuestion.question;
  answerOptions.innerHTML = "";

  currentQuestion.options.forEach((optionText, optionIndex) => {
    const optionId = `option-${currentQuestion.id}-${optionIndex}`;
    const optionWrapper = document.createElement("label");
    optionWrapper.className = "answer-option";
    optionWrapper.htmlFor = optionId;

    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.id = optionId;
    radioInput.value = optionIndex;
    radioInput.checked = selectedAnswers[currentQuestionIndex] === optionIndex;
    radioInput.addEventListener("change", () => {
      selectedAnswers[currentQuestionIndex] = optionIndex;
      updateNavigationButtons();
    });

    const optionLabel = document.createElement("span");
    optionLabel.className = "answer-label";
    optionLabel.textContent = optionText;

    optionWrapper.appendChild(radioInput);
    optionWrapper.appendChild(optionLabel);
    answerOptions.appendChild(optionWrapper);
  });

  updateProgress();
  updateNavigationButtons();
}

function updateProgress() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function updateNavigationButtons() {
  prevBtn.disabled = currentQuestionIndex === 0;
  nextBtn.disabled = selectedAnswers[currentQuestionIndex] === null;

  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.textContent = "Selesai";
  } else {
    nextBtn.textContent = "Next";
  }
}

function calculateResults() {
  let correctCount = 0;

  questions.forEach((question, index) => {
    if (selectedAnswers[index] === question.answer) {
      correctCount += 1;
    }
  });

  const totalQuestionsCount = questions.length;
  const wrongCount = totalQuestionsCount - correctCount;
  const score = Math.round((correctCount / totalQuestionsCount) * 100);
  const passed = score >= passingGrade;

  return {
    totalQuestionsCount,
    correctCount,
    wrongCount,
    score,
    percentage: score,
    passed
  };
}

function showResults() {
  const results = calculateResults();

  summaryTotal.textContent = results.totalQuestionsCount;
  summaryCorrect.textContent = results.correctCount;
  summaryWrong.textContent = results.wrongCount;
  summaryScore.textContent = `${results.score} / 100`;
  summaryPercentage.textContent = `${results.percentage}%`;
  summaryStatus.textContent = results.passed ? "Lulus" : "Tidak Lulus";
  summaryStatus.className = `status-badge ${results.passed ? "status-pass" : "status-fail"}`;

  const icon = document.querySelector(".result-icon");
  icon.textContent = results.passed ? "✓" : "✕";
  icon.className = `result-icon ${results.passed ? "result-icon-success" : "result-icon-fail"}`;

  showScreen(resultScreen);
}

function validateAnswers() {
  return selectedAnswers.every(answer => answer !== null);
}

startBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  showScreen(quizScreen);
  renderQuestion();
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (selectedAnswers[currentQuestionIndex] === null) {
    alert("Mohon pilih jawaban sebelum melanjutkan.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  if (validateAnswers()) {
    showResults();
  } else {
    alert("Mohon jawab semua soal sebelum melihat hasil.");
  }
});

retryBtn.addEventListener("click", () => {
  selectedAnswers.fill(null);
  currentQuestionIndex = 0;
  showScreen(quizScreen);
  renderQuestion();
});

function initQuizApp() {
  totalQuestions.textContent = questions.length;
  showScreen(startScreen);
}

initQuizApp();
