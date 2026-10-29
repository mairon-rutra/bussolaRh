const API_URL = 'http://localhost:5000/api';

export const api = {
    async login(email, senha) {
        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao fazer login.');
            localStorage.setItem('bussola_rh_logged', JSON.stringify(data));
            return data;
        } catch (err) {
            throw new Error(err.message === 'Failed to fetch' ? 'Servidor backend não está rodando na porta 5000.' : err.message);
        }
    },

    async register(userData) {
        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao registrar.');
            localStorage.setItem('bussola_rh_logged', JSON.stringify(data));
            return data;
        } catch (err) {
            throw new Error(err.message === 'Failed to fetch' ? 'Servidor backend não está rodando na porta 5000.' : err.message);
        }
    },

    async getLoggedUser() {
        const userStr = localStorage.getItem('bussola_rh_logged');
        return userStr ? JSON.parse(userStr) : null;
    },

    async logout() {
        localStorage.removeItem('bussola_rh_logged');
    },

    async getUsersWithoutPassword() {
        try {
            const res = await fetch(`${API_URL}/users`);
            return await res.json();
        } catch {
            return [];
        }
    },

    async getMessages() {
        try {
            const res = await fetch(`${API_URL}/messages`);
            return await res.json();
        } catch {
            return [];
        }
    },

    async sendMessage(remetenteEmail, destinatarioEmail, texto) {
        try {
            const res = await fetch(`${API_URL}/messages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ remetenteEmail, destinatarioEmail, texto })
            });
            return await res.json();
        } catch {
            return null;
        }
    }
};