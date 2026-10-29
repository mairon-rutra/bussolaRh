const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'db.json');

function readDB() {
    if (!fs.existsSync(DB_FILE)) {
        const initialData = {
            users: [
                {
                    id: 'admin-1',
                    nome: 'Administrador',
                    email: 'admin@bussolarh.com',
                    senha: '123',
                    empresa: 'Bússola RH Oficial',
                    descricao: 'Gestão e Suporte Master',
                    funcao: 'Admin',
                    isAdmin: true
                },
                {
                    id: 'user-2',
                    nome: 'João Silva',
                    email: 'joao@tech.com',
                    senha: '123456',
                    empresa: 'Tech Solutions Ltda',
                    descricao: 'Inovação e Tecnologia em RH',
                    funcao: 'Gerente de RH',
                    isAdmin: false
                }
            ],
            messages: []
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.email === email && u.senha === senha);
    if (!user) return res.status(401).json({ error: 'E-mail ou senha incorretos.' });
    res.json(user);
});

app.post('/api/register', (req, res) => {
    const userData = req.body;
    if (!userData.email || !userData.email.includes('@')) {
        return res.status(400).json({ error: 'O e-mail deve obrigatoriamente conter "@".' });
    }
    
    const db = readDB();
    if (db.users.some(u => u.email === userData.email)) {
        return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
    }

    const newUser = {
        id: Date.now().toString(),
        ...userData,
        isAdmin: false
    };

    db.users.push(newUser);
    writeDB(db);
    res.json(newUser);
});

app.get('/api/users', (req, res) => {
    const db = readDB();
    const usersWithoutPassword = db.users.map(({ senha, ...rest }) => rest);
    res.json(usersWithoutPassword);
});

app.get('/api/messages', (req, res) => {
    const db = readDB();
    res.json(db.messages);
});

app.post('/api/messages', (req, res) => {
    const { remetenteEmail, destinatarioEmail, texto } = req.body;
    const db = readDB();
    const newMessage = {
        id: Date.now().toString(),
        remetenteEmail,
        destinatarioEmail,
        texto,
        data: new Date().toISOString()
    };
    db.messages.push(newMessage);
    writeDB(db);
    res.json(newMessage);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor externo rodando isolado em http://localhost:${PORT}`);
});