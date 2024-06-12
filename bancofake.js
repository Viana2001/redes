// Simulando um banco de dados simples de usuários na memória
let users = JSON.parse(localStorage.getItem('users')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const userWelcome = document.getElementById('userWelcome');
    const logoutButton = document.getElementById('logoutButton');

    // Lida com o envio do formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            const user = users.find(user => user.username === username && user.password === password);
            if (user) {
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert('Nome de usuário ou senha inválidos');
            }
        });
    }

    // Lida com o envio do formulário de cadastro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = e.target.newUsername.value;
            const newPassword = e.target.newPassword.value;

            const existingUser = users.find(user => user.username === newUsername);
            if (existingUser) {
                alert('Nome de usuário já existe');
            } else {
                const newUser = { username: newUsername, password: newPassword };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Cadastro realizado com sucesso! Por favor, faça login.');
                window.location.href = 'index.html';
            }
        });
    }

    // Exibe a mensagem de boas-vindas na página inicial
    if (userWelcome) {
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            userWelcome.textContent = loggedInUser.username;
        } else {
            window.location.href = 'index.html';
        }
    }

    // Lida com o logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }
});