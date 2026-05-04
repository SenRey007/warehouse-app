import styles from './ConfirmModal.module.css'

export default function ConfirmModal({ item, onConfirm, onCancel, loading }) {
    if (!item) return null
    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <h3>Підтвердження видалення</h3>
                <p>Видалити <strong>{item.inventory_name}</strong>?</p>
                <p className={styles.warn}>Цю дію не можна скасувати.</p>
                <div className={styles.btns}>
                    <button onClick={onCancel} className={styles.cancel}>Скасувати</button>
                    <button onClick={onConfirm} disabled={loading} className={styles.confirm}>
                        {loading ? 'Видалення...' : 'Видалити'}
                    </button>
                </div>
            </div>
        </div>
    )
}