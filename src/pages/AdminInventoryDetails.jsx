import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInventoryById, getPhotoUrl } from '../services/inventoryApi'
import styles from './AdminInventoryDetails.module.css'

export default function AdminInventoryDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [item, setItem]       = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)

    useEffect(() => {
        getInventoryById(id)
            .then(setItem)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <p>Завантаження...</p>
    if (error)   return <p style={{ color: 'red' }}>{error}</p>
    if (!item)   return null

    return (
        <div className={styles.wrap}>
            <button onClick={() => navigate(-1)} className={styles.back}>← Назад</button>
            <img
                src={getPhotoUrl(id)}
                alt={item.inventory_name}
                className={styles.photo}
                onError={e => { e.target.style.display = 'none' }}
            />
            <h1 className={styles.title}>{item.inventory_name}</h1>
            <p className={styles.desc}>{item.description || 'Опис відсутній'}</p>
            <button onClick={() => navigate(`/admin/${id}/edit`)} className={styles.editBtn}>
                Редагувати
            </button>
        </div>
    )
}