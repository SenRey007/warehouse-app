import { useFavorites } from '../hooks/useFavorites'
import { getPhotoUrl } from '../services/inventoryApi'
import styles from './Favorites.module.css'

export default function Favorites() {
    const { favorites, remove } = useFavorites()

    if (!favorites.length) return (
        <div className={styles.empty}>
            <div className={styles.emptyIcon}>🤍</div>
            <h2>Улюблених ще немає</h2>
            <p>Додайте товари з галереї натиснувши ❤️ на картці</p>
        </div>
    )

    return (
        <div>
            <h1 style={{ marginBottom: 24 }}>Улюблені ({favorites.length})</h1>
            <div className={styles.grid}>
                {favorites.map(item => (
                    <div key={item.id} className={styles.card}>
                        <img
                            src={getPhotoUrl(item.id)}
                            alt={item.inventory_name}
                            className={styles.img}
                            onError={e => { e.target.src = 'https://placehold.co/400x400?text=No+Photo' }}
                        />
                        <div className={styles.info}>
                            <span className={styles.name}>{item.inventory_name}</span>
                            <button className={styles.remove} onClick={() => remove(item.id)}>
                                Видалити
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}