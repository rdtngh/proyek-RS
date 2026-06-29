// Aplikasi prototype HETS untuk halaman landing, login, dashboard, dan materi.
const storageKeys = {
  user: 'hets-user',
  userData: 'hets-user-data',
  progress: 'hets-progress',
  result: 'hets-latest-result'
};

function getSavedUser() {
  return localStorage.getItem(storageKeys.user) || '';
}

function getSavedUserData() {
  const saved = localStorage.getItem(storageKeys.userData);
  return saved ? JSON.parse(saved) : null;
}

function saveUser(username) {
  localStorage.setItem(storageKeys.user, username);
}

function saveUserData(userData) {
  localStorage.setItem(storageKeys.user, userData.name);
  localStorage.setItem(storageKeys.userData, JSON.stringify(userData));
}

function getTrainingProgress() {
  const saved = localStorage.getItem(storageKeys.progress);
  return saved ? JSON.parse(saved) : {};
}

function saveTrainingProgress(progress) {
  localStorage.setItem(storageKeys.progress, JSON.stringify(progress));
}

function setUserGreeting() {
  const userName = getSavedUser();
  const greeting = document.querySelector('[data-user-greeting]');
  if (greeting && userName) {
    greeting.textContent = `Halo, ${userName}`;
  }
}

function renderDashboard() {
  const dashboardList = document.querySelector('[data-training-list]');
  const totalCount = document.querySelector('[data-total-training]');
  const completedCount = document.querySelector('[data-completed-training]');
  const pendingCount = document.querySelector('[data-pending-training]');
  const certificateCount = document.querySelector('[data-certificate-count]');
  const progress = getTrainingProgress();

  const trainings = HETSData.trainings;
  const completed = trainings.filter((training) => progress[training.id]?.completed).length;
  const pending = trainings.length - completed;

  if (totalCount) totalCount.textContent = trainings.length;
  if (completedCount) completedCount.textContent = completed;
  if (pendingCount) pendingCount.textContent = pending;
  if (certificateCount) certificateCount.textContent = completed > 0 ? completed : 0;

  if (!dashboardList) return;

  dashboardList.innerHTML = trainings.map((training) => {
    const trainingProgress = progress[training.id] || { completedModules: [] };
    const completedModules = trainingProgress.completedModules?.length || 0;
    const quizScore = trainingProgress.quizScore || null;
    const isDone = trainingProgress.completed === true;
    
    // Hitung percent berdasarkan quizScore jika ada, jika tidak dari modul
    let percent;
    if (quizScore !== null) {
      percent = quizScore;
    } else {
      percent = Math.round((completedModules / training.modules.length) * 100);
    }
    
    console.log(`Training: ${training.id}`, { isDone, quizScore, percent, completed: trainingProgress.completed });

    return `
      <article class="training-card">
        <div class="training-meta">
          <h3>${training.title}</h3>
          <p>${training.description}</p>
          <div class="training-status">${isDone ? '✓ Selesai' : '● ' + training.status}</div>
          ${quizScore !== null ? `<div style="margin-top: 8px; font-size: 0.9rem; color: #2563eb; font-weight: 600;">Nilai: ${quizScore}%</div>` : ''}
        </div>
        <div class="progress-block">
          <div class="progress-bar"><div class="progress-fill" style="width:${percent}%;"></div></div>
          <small>${quizScore !== null ? `Nilai penilaian: ${quizScore}%` : `${completedModules}/${training.modules.length} modul terbuka`}</small>
          <a class="btn btn-primary" href="materi.html?training=${training.id}">Mulai</a>
        </div>
      </article>
    `;
  }).join('');
}

function attachLoginForm() {
  const form = document.querySelector('[data-login-form]');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const unit = form.querySelector('[name="unit"]').value.trim();
    const name = form.querySelector('[name="name"]').value.trim();
    const school = form.querySelector('[name="school"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const address = form.querySelector('[name="address"]').value.trim();
    const position = form.querySelector('[name="position"]').value.trim();

    if (!unit || !name || !school || !phone || !address || !position) {
      alert('Semua data wajib diisi untuk melanjutkan.');
      return;
    }

    const userData = {
      unit,
      name,
      school,
      phone,
      address,
      position,
      timestamp: new Date().toISOString()
    };

    saveUserData(userData);
    window.location.href = 'dashboard.html';
  });
}

function renderMateri() {
  const params = new URLSearchParams(window.location.search);
  const trainingId = params.get('training') || 'orientation';
  const training = HETSData.trainings.find((item) => item.id === trainingId) || HETSData.trainings[0];
  
  // Ambil progress SEGAR dari localStorage setiap kali dipanggil
  const progressRaw = localStorage.getItem('hets-progress');
  const progress = progressRaw ? JSON.parse(progressRaw) : {};
  
  console.log('🔄 localStorage saat ini:', progress);
  
  const savedState = progress[trainingId] || { completedModules: [] };
  const completedModules = savedState.completedModules || [];
  const quizScore = savedState.quizScore;
  const quizPassed = savedState.quizPassed;
  const quizResult = savedState.quizResult || null;
  const totalModules = training.modules.length;
  
  console.log('📊 State untuk training:', { trainingId, quizScore, quizPassed, quizResult });
  
  // Hitung percent berdasarkan quiz score jika sudah ada, jika tidak maka berdasarkan modul
  let percent;
  if (typeof quizScore === 'number') {
    percent = quizScore;
  } else {
    percent = Math.round((completedModules.length / totalModules) * 100);
  }

  const title = document.querySelector('[data-training-title]');
  const description = document.querySelector('[data-training-description]');
  const progressText = document.querySelector('[data-progress-text]');
  const progressFill = document.querySelector('[data-progress-fill]');
  const moduleList = document.querySelector('[data-module-list]');
  const quizButton = document.querySelector('[data-quiz-button]');

  if (title) title.textContent = training.title;
  if (description) description.textContent = training.description;
  if (progressText) progressText.textContent = `${percent}%`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  
  console.log('Materi rendered:', { trainingId, quizScore, percent, quizResultExists: !!quizResult });

  if (moduleList) {
    moduleList.innerHTML = training.modules.map((module) => {
      const isDone = completedModules.includes(module.id);
      return `
        <article class="module-card">
          <div class="meta">
            <h4>${module.title}</h4>
            <p>${module.type} • ${module.duration}</p>
          </div>
          <button class="btn ${isDone ? 'btn-secondary' : 'btn-primary'}" data-open-module="${module.id}">
            ${isDone ? 'Selesai' : 'Buka'}
          </button>
        </article>
      `;
    }).join('');
    
    // Tampilkan hasil quiz jika sudah ada
    if (quizResult) {
      const quizResultHTML = `
        <div style="margin-top: 20px; padding: 16px; background: ${quizResult.passed ? '#f0fdf4' : '#fef2f2'}; border-radius: 12px; border-left: 4px solid ${quizResult.passed ? '#22c55e' : '#ef4444'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <strong>Hasil Penilaian: ${quizResult.passed ? '✓ Lulus' : '✕ Tidak Lulus'}</strong>
            <span style="font-size: 1.2rem; font-weight: bold; color: ${quizResult.passed ? '#22c55e' : '#ef4444'};">${quizResult.score}%</span>
          </div>
          <small style="color: #666;">Benar: ${quizResult.correct} • Salah: ${quizResult.wrong}</small>
        </div>
      `;
      moduleList.insertAdjacentHTML('afterend', quizResultHTML);
    }
  }

  if (quizButton) {
    const allModulesOpened = completedModules.length === totalModules;
    const alreadyHasQuizResult = typeof quizScore === 'number';
    
    console.log('🎯 Quiz button logic:', { allModulesOpened, alreadyHasQuizResult, quizScore, typeof: typeof quizScore });
    
    // Tampilkan tombol jika: semua modul dibuka ATAU sudah pernah quiz (untuk ulangi)
    quizButton.style.display = (allModulesOpened || alreadyHasQuizResult) ? 'inline-flex' : 'none';
    
    // Ubah teks tombol jika sudah pernah quiz
    if (alreadyHasQuizResult) {
      quizButton.textContent = 'Ulangi Quiz';
      quizButton.className = 'btn btn-secondary';
    } else {
      quizButton.textContent = 'Mulai Quiz';
      quizButton.className = 'btn btn-primary';
    }
    
    quizButton.href = `quiz.html?training=${training.id}`;
    
    console.log('✅ Quiz button set to:', quizButton.textContent);
  }

  document.querySelectorAll('[data-open-module]').forEach((button) => {
    button.addEventListener('click', () => {
      const moduleId = button.getAttribute('data-open-module');
      const nextState = {
        ...progress,
        [training.id]: {
          completedModules: Array.from(new Set([...completedModules, moduleId])),
          completed: savedState.completed || false,
          quizScore: savedState.quizScore,
          quizPassed: savedState.quizPassed,
          quizResult: savedState.quizResult
        }
      };
      saveTrainingProgress(nextState);
      renderMateri();
    });
  });
}

function initApp() {
  setUserGreeting();
  attachLoginForm();

  if (document.body.dataset.page === 'dashboard') {
    renderDashboard();
  }

  if (document.body.dataset.page === 'materi') {
    renderMateri();
  }
}

document.addEventListener('DOMContentLoaded', initApp);
