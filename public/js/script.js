document.addEventListener('DOMContentLoaded', async () => {
    const authWidget = document.getElementById('auth-widget');

    try {
        // Запрашиваем данные о текущем пользователе
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Not authenticated');

        const user = await response.json();

        // Обновляем интерфейс
        authWidget.innerHTML = `
            <div class="user-panel">
                <img class="user-avatar" src="${user.avatar}" alt="Avatar">
                <span class="user-name">${user.name}</span>
                <a href="#" class="logout-btn" onclick="logout()">Вийти</a>
            </div>
        `;
    } catch (error) {
        console.log('User not authenticated:', error.message);
    }
});

// Функция для выхода
async function logout() {
    await fetch('/logout', { method: 'POST' });
    window.location.reload();
}

    // Обработка VIP-плашек
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const tier = this.closest('.vip-card').dataset.tier;
            
            // Проверка авторизации
            if (!document.querySelector('.user-avatar')) {
                alert('Будь ласка, увійдіть через Steam для покупки VIP');
                return;
            }
            
            console.log(`Ініціалізація покупки: ${tier}`);
            // Дополнительная логика покупки...
        });
    });

    // Обновляем статус каждые 60 секунд
    setInterval(updateServerStatus, 60000);
    updateServerStatus(); // Первый запрос
