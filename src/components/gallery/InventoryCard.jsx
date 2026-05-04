import { getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryCard.module.css'

export default function InventoryCard({ item, isFavorite, onFavorite, onClick }) {
    return (
        <div className={styles.card} onClick={() => onClick(item)}>
            <div className={styles.imgWrap}>
                <img
                    src={getPhotoUrl(item.id)}
                    alt={item.inventory_name}
                    className={styles.img}
                    onError={e => { e.target.src = 'https://placehold.co/400x400?text=No+Photo' }}
                />
                <button
                    className={`${styles.heart} ${isFavorite ? styles.heartActive : ''}`}
                    onClick={e => { e.stopPropagation(); onFavorite(item) }}
                    title={isFavorite ? 'Прибрати з улюблених' : 'Додати в улюблені'}
                >
                    {isFavorite ? '❤️' : '🤍'}
                </button>
            </div>
            <div className={styles.body}>
                <span className={styles.name}>{item.inventory_name}</span>
            </div>
        </div>
    )
}