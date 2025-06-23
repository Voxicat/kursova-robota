document.addEventListener('DOMContentLoaded', () => {
  const onlineStatusElement = document.getElementById('online-status');
  const userInfoElement = document.getElementById('user-info');
  const steamLoginButton = document.getElementById('steam-login');

  // Проверка авторизации при загрузке
  async function checkAuth() {
    try {
      const response = await fetch('/api/user');
      if (response.ok) {
        const user = await response.json();
        showUserInfo(user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  }

  // Отображение информации о пользователе
  function showUserInfo(user) {
    userInfoElement.innerHTML = `
      <div class="user-profile">
        <img src="${user.avatar}" class="user-avatar">
        <span class="user-name">${user.name}</span>
        <button id="logout-btn" class="logout-button">Logout</button>
      </div>
    `;
    
    document.getElementById('logout-btn').addEventListener('click', logout);
  }

  // Выход из системы
  async function logout() {
    try {
      await fetch('/logout', { method: 'POST' });
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  // Имитация получения статуса сервера
  function fetchServerStatus() {
    setTimeout(() => {
      const onlinePlayers = Math.floor(Math.random() * 100);
      onlineStatusElement.textContent = `Online Players: ${onlinePlayers}`;
    }, 1000);
  }

  // Обработчик кнопки Steam
 document.getElementById('steam-login').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = '/auth/steam';
});

// Проверка авторизации при загрузке
fetch('/api/user')
  .then(response => response.json())
  .then(user => {
    if (user) {
      document.getElementById('user-info').innerHTML = `
        <img src="${user.avatar}" class="user-avatar">
        <span>${user.name}</span>
      `;
    }
  });

// Вспомогательные функции
function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'auth-notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 5000);
}

function showErrorModal(message) {
  // Реализация модального окна с ошибкой
}

  // Инициализация
  fetchServerStatus();
  checkAuth();
});