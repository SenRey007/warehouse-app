const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000; // Відповідає BASE_URL у LAB7-8_GIT_GUIDE (1)_3.md
const DB_FILE = './db.json';

// Ініціалізація бази даних з файлу
let inventory = [];
if (fs.existsSync(DB_FILE)) {
    inventory = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
} else {
    // Початкові дані, якщо файлу ще немає
    inventory = [{ id: '1', inventory_name: 'Зразок товару', description: 'Це збережеться', photo: '' }];
    fs.writeFileSync(DB_FILE, JSON.stringify(inventory, null, 2));
}

// Функція для збереження змін у файл
const saveToDB = () => {
    fs.writeFileSync(DB_FILE, JSON.stringify(inventory, null, 2));
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// --- МАРШРУТИ ---

app.get('/inventory', (req, res) => res.json(inventory));

app.get('/inventory/:id', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    item ? res.json(item) : res.status(404).json({ message: 'Не знайдено' });
});

// Створення (Коміт 5)
app.post('/register', upload.single('photo'), (req, res) => {
    const { inventory_name, description } = req.body;
    const newItem = {
        id: Date.now().toString(),
        inventory_name,
        description,
        photo: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : ''
    };
    inventory.push(newItem);
    saveToDB(); // Зберігаємо у файл!
    res.status(201).json(newItem);
});

// Редагування тексту (Коміт 7)
app.put('/inventory/:id', (req, res) => {
    const index = inventory.findIndex(i => i.id === req.params.id);
    if (index !== -1) {
        inventory[index] = { ...inventory[index], ...req.body };
        saveToDB(); // Зберігаємо зміни!
        res.json(inventory[index]);
    } else res.status(404).send('Не знайдено');
});

// Редагування фото (Коміт 7)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
    const index = inventory.findIndex(i => i.id === req.params.id);
    if (index !== -1 && req.file) {
        inventory[index].photo = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        saveToDB(); // Зберігаємо зміни!
        res.json(inventory[index]);
    } else res.status(404).send('Помилка');
});

// Видалення (Коміт 8)
app.delete('/inventory/:id', (req, res) => {
    inventory = inventory.filter(i => i.id !== req.params.id);
    saveToDB(); // Зберігаємо зміни!
    res.json({ message: 'Видалено' });
});

// Ендпоїнт для фото (Коміт 4)
app.get('/inventory/:id/photo', (req, res) => {
    const item = inventory.find(i => i.id === req.params.id);
    item?.photo ? res.redirect(item.photo) : res.status(404).send('Фото немає');
});

app.listen(PORT, () => console.log(`Сервер на http://localhost:${PORT}. Дані в db.json`));