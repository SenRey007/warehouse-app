import { useState, useEffect } from 'react'
import { getInventory } from '../services/inventoryApi'
import InventoryCard from '../components/gallery/InventoryCard'
import SkeletonCard from '../components/gallery/SkeletonCard'
import InventoryQuickView from '../components/gallery/InventoryQuickView'
import { useFavorites } from '../hooks/useFavorites'
import styles from './Gallery.module.css'

export default function Gallery() {
    const [items, setItems]       = useState([])
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState(null)
    const [selected, setSelected] = useState(null)
    const { isFavorite, toggle }  = useFavorites()

    useEffect(() => {
        getInventory()
            .then(setItems)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (error) return (
        <div className={styles.error}>
            <p>❌ Не вдалось завантажити галерею</p>
            <small>{error}</small>
        </div>
    )

    return (
        <div>
            <h1 style={{ marginBottom: 24 }}>Галерея інвентарю</h1>
            <div className={styles.grid}>
                {loading
                    ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                    : items.length === 0
                        ? <p className={styles.empty}>Інвентар порожній</p>
                        : items.map(item => (
                            <InventoryCard
                                key={item.id}
                                item={item}
                                isFavorite={isFavorite(item.id)}
                                onFavorite={toggle}
                                onClick={setSelected}
                            />
                        ))
                }
            </div>
            <InventoryQuickView item={selected} onClose={() => setSelected(null)} />
        </div>
    )
}