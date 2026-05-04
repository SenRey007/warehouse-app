import { useEffect, useState } from 'react'
import { getInventoryById, getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryQuickView.module.css'

export default function InventoryQuickView({ item, onClose }) {
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        if (!item) return
        setDetail(null)
        getInventoryById(item.id)
            .then(setDetail)
            .catch(() => setDetail(item))
    }, [item?.id])

    if (!item) return null

    const data = detail || item

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.close} onClick={onClose}>✕</button>
                <img
                    src={getPhotoUrl(item.id)}
                    alt={data.inventory_name}
                    className={styles.photo}
                    onError={e => { e.target.src = 'https://placehold.co/600x400?text=No+Photo' }}
                />
                <div className={styles.body}>
                    <h2 className={styles.title}>{data.inventory_name}</h2>
                    <p className={styles.desc}>
                        {detail ? (data.description || 'Опис відсутній') : 'Завантаження...'}
                    </p>
                </div>
            </div>
        </div>
    )
}