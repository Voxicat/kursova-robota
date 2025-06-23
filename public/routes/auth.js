//скрипт для авторизации типочков

async function fetchUser() {
    try {
        const response = await fetch('/api/user');
        if (!response.ok) throw new Error('Not authenticated');
        const user = await response.json();

        const authWidget = document.getElementById('auth-widget');
        authWidget.innerHTML = `
            <div class="user-panel">
                <img class="user-avatar" src="${user.avatar}" alt="Avatar">
                <span class="user-name">${user.name}</span>
                <button class="logout-btn" id="logout-btn">Вийти</button>
            </div>
        `;

        document.getElementById('logout-btn').addEventListener('click', async () => {
            await fetch('/logout', { method: 'POST' });
            location.reload();
        });
    } catch (err) {
        //если не авторизован, отчислен(
        console.log('User not authenticated');
    }
}

document.addEventListener('DOMContentLoaded', fetchUser);
