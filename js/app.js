// Aplikasi prototype HETS untuk halaman landing, login, dashboard, dan materi.
const storageKeys = {
  user: 'hets-user',
  progress: 'hets-progress',
  result: 'hets-latest-result'
};

function getSavedUser() {
  return localStorage.getItem(storageKeys.user) || '';
}

function saveUser(username) {
  localStorage.setItem(storageKeys.user, username);
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
    const percent = Math.round((completedModules / training.modules.length) * 100);
    const isDone = completedModules === training.modules.length;
    if (isDone) {
      saveTrainingProgress({ ...progress, [training.id]: { completedModules: training.modules.map((module) => module.id), completed: true } });
    }

    return `
      <article class="training-card">
        <div class="training-meta">
          <h3>${training.title}</h3>
          <p>${training.description}</p>
          <div class="training-status">${isDone ? '✓ Selesai' : '● ' + training.status}</div>
        </div>
        <div class="progress-block">
          <div class="progress-bar"><div class="progress-fill" style="width:${percent}%;"></div></div>
          <small>${completedModules}/${training.modules.length} modul terbuka</small>
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
    const username = form.querySelector('[name="username"]').value.trim();
    const password = form.querySelector('[name="password"]').value;

    if (!username || !password) {
      alert('Isi username dan password untuk melanjutkan.');
      return;
    }

    saveUser(username);
    window.location.href = 'dashboard.html';
  });
}

function renderMateri() {
  const params = new URLSearchParams(window.location.search);
  const trainingId = params.get('training') || 'orientation';
  const training = HETSData.trainings.find((item) => item.id === trainingId) || HETSData.trainings[0];
  const progress = getTrainingProgress();
  const savedState = progress[training.id] || { completedModules: [] };
  const completedModules = savedState.completedModules || [];
  const totalModules = training.modules.length;
  const percent = Math.round((completedModules.length / totalModules) * 100);

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
  }

  if (quizButton) {
    quizButton.style.display = completedModules.length === totalModules ? 'inline-flex' : 'none';
    quizButton.href = `quiz.html?training=${training.id}`;
  }

  document.querySelectorAll('[data-open-module]').forEach((button) => {
    button.addEventListener('click', () => {
      const moduleId = button.getAttribute('data-open-module');
      const nextState = {
        ...progress,
        [training.id]: {
          completedModules: Array.from(new Set([...completedModules, moduleId])),
          completed: false
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
