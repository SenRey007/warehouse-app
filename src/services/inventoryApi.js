const BASE_URL = 'http://localhost:3001'

export async function getInventory() {
    const res = await fetch(`${BASE_URL}/inventory`)
    if (!res.ok) throw new Error('Помилка завантаження')
    return res.json()
}

export async function getInventoryById(id) {
    const res = await fetch(`${BASE_URL}/inventory/${id}`)
    if (!res.ok) throw new Error('Не знайдено')
    return res.json()
}

export async function createInventory(formData) {
    // НЕ додавати Content-Type вручну — браузер сам виставить boundary для multipart
    const res = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        body: formData,
    })
    if (!res.ok) throw new Error('Помилка створення')
    return res.json()
}

export async function updateInventory(id, data) {
    const res = await fetch(`${BASE_URL}/inventory/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Помилка оновлення')
    return res.json()
}

export async function updateInventoryPhoto(id, formData) {
    const res = await fetch(`${BASE_URL}/inventory/${id}/photo`, {
        method: 'PUT',
        body: formData,
    })
    if (!res.ok) throw new Error('Помилка оновлення фото')
    return res.json()
}

export async function deleteInventory(id) {
    const res = await fetch(`${BASE_URL}/inventory/${id}`, {
        method: 'DELETE',
    })
    if (!res.ok) throw new Error('Помилка видалення')
    return res.json()
}

export function getPhotoUrl(id) {
    return `${BASE_URL}/inventory/${id}/photo`
}