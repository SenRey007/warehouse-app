import { getPhotoUrl } from '../../services/inventoryApi'
import styles from './InventoryTable.module.css'

export default function InventoryTable({ items, onView, onEdit, onDelete, loading, error }) {
    if (loading) return <div className={styles.state}>Завантаження...</div>
    if (error)   return <div className={styles.stateError}>❌ {error}</div>
    if (!items?.length) return <div className={styles.state}>Інвентар порожній</div>

    return (
        <div className={styles.tableWrap}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Фото</th>
                    <th>Назва</th>
                    <th>Опис</th>
                    <th>Дії</th>
                </tr>
                </thead>
                <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>
                            <img
                                src={item.photo} // Використовуємо пряме посилання від сервера[cite: 1]
                                alt={item.inventory_name}
                                className={styles.thumb}
                                onError={e => {
                                    // Якщо посилання біте, показуємо заглушку замість того, щоб ховати картинку
                                    e.target.src = 'https://placehold.co/60x60?text=Error';
                                }}
                            />
                        </td>
                        <td className={styles.name}>{item.inventory_name}</td>
                        <td className={styles.desc}>{item.description || '—'}</td>
                        <td>
                            <div className={styles.actions}>
                                <button className={styles.btnView}   onClick={() => onView(item.id)}>Переглянути</button>
                                <button className={styles.btnEdit}   onClick={() => onEdit(item.id)}>Редагувати</button>
                                <button className={styles.btnDelete} onClick={() => onDelete(item)}>Видалити</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}