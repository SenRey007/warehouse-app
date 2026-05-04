import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInventoryById, updateInventory, updateInventoryPhoto } from '../services/inventoryApi'
import { useInventory } from '../store/InventoryContext'
import styles from './AdminInventoryEdit.module.css'

export default function AdminInventoryEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { fetchInventory } = useInventory()

    const [name, setName]               = useState('')
    const [desc, setDesc]               = useState('')
    const [photo, setPhoto]             = useState(null)
    const [preview, setPreview]         = useState(null)
    const [loadingText, setLoadingText] = useState(false)
    const [loadingPhoto, setLoadingPhoto] = useState(false)
    const [msg, setMsg]                 = useState('')

    useEffect(() => {
        getInventoryById(id).then(item => {
            setName(item.inventory_name || '')
            setDesc(item.description || '')
        })
    }, [id])

    const saveText = async (e) => {
        e.preventDefault()
        if (!name.trim()) return alert("Назва обов'язкова")
        try {
            setLoadingText(true)
            await updateInventory(id, { inventory_name: name, description: desc })
            await fetchInventory()
            setMsg('✅ Текстові дані збережено')
        } catch (e) {
            setMsg('❌ ' + e.message)
        } finally {
            setLoadingText(false)
        }
    }

    const savePhoto = async (e) => {
        e.preventDefault()
        if (!photo) return alert('Оберіть фото')
        const fd = new FormData()
        fd.append('photo', photo)
        try {
            setLoadingPhoto(true)
            await updateInventoryPhoto(id, fd)
            setMsg('✅ Фото оновлено')
        } catch (e) {
            setMsg('❌ ' + e.message)
        } finally {
            setLoadingPhoto(false)
        }
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} className={styles.back}>← Назад</button>
            <h1 className={styles.title}>Редагування</h1>
            {msg && <p className={styles.msg}>{msg}</p>}

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Текстові дані</h2>
                <form onSubmit={saveText}>
                    <div className={styles.field}>
                        <label>Назва *</label>
                        <input value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.field}>
                        <label>Опис</label>
                        <textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <button type="submit" disabled={loadingText} className={styles.btn}>
                        {loadingText ? 'Збереження...' : 'Зберегти текст'}
                    </button>
                </form>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Оновити фото</h2>
                <form onSubmit={savePhoto}>
                    <div className={styles.field}>
                        <input type="file" accept="image/*" onChange={e => {
                            const f = e.target.files[0]
                            setPhoto(f)
                            if (f) setPreview(URL.createObjectURL(f))
                        }} />
                        {preview && <img src={preview} alt="preview" className={styles.preview} />}
                    </div>
                    <button type="submit" disabled={loadingPhoto} className={styles.btn}>
                        {loadingPhoto ? 'Завантаження...' : 'Оновити фото'}
                    </button>
                </form>
            </div>
        </div>
    )
}