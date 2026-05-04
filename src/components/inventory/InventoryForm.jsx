import { useState } from 'react'
import styles from './InventoryForm.module.css'

export default function InventoryForm({ onSubmit, loading, initialValues = {} }) {
    const [name, setName]       = useState(initialValues.inventory_name || '')
    const [desc, setDesc]       = useState(initialValues.description || '')
    const [photo, setPhoto]     = useState(null)
    const [preview, setPreview] = useState(null)
    const [errors, setErrors]   = useState({})

    const validate = () => {
        const e = {}
        if (!name.trim()) e.name = "Назва обов'язкова"
        return e
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setPhoto(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        const formData = new FormData()
        formData.append('inventory_name', name.trim())
        formData.append('description', desc.trim())
        if (photo) formData.append('photo', photo)
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
                <label>Назва *</label>
                <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Назва інвентарю"
                    className={errors.name ? styles.inputErr : ''}
                />
                {errors.name && <span className={styles.err}>{errors.name}</span>}
            </div>

            <div className={styles.field}>
                <label>Опис</label>
                <textarea
                    value={desc}
                    onChange={e => setDesc(e.target.value)}
                    placeholder="Короткий опис..."
                    rows={3}
                />
            </div>

            <div className={styles.field}>
                <label>Фото</label>
                <input type="file" accept="image/*" onChange={handlePhoto} />
                {preview && <img src={preview} alt="preview" className={styles.preview} />}
            </div>

            <button type="submit" disabled={loading} className={styles.submit}>
                {loading ? 'Збереження...' : 'Зберегти'}
            </button>
        </form>
    )
}