import { useState, useEffect } from 'react'

const KEY = 'warehouse_favorites'

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem(KEY)) || [] }
        catch { return [] }
    })

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(favorites))
    }, [favorites])

    const toggle = (item) => {
        setFavorites(prev =>
            prev.some(f => f.id === item.id)
                ? prev.filter(f => f.id !== item.id)
                : [...prev, item]
        )
    }

    const remove = (id) => setFavorites(prev => prev.filter(f => f.id !== id))

    const isFavorite = (id) => favorites.some(f => f.id === id)

    return { favorites, toggle, remove, isFavorite }
}