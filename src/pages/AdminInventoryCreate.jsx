import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InventoryForm from '../components/inventory/InventoryForm'
import { createInventory } from '../services/inventoryApi'
import { useInventory } from '../store/InventoryContext'

export default function AdminInventoryCreate() {
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(null)
    const navigate = useNavigate()
    const { fetchInventory } = useInventory()

    const handleSubmit = async (formData) => {
        try {
            setLoading(true)
            setError(null)
            await createInventory(formData)
            await fetchInventory() // оновлюємо глобальний стан
            navigate('/admin')
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, color: '#666' }}>
                ← Назад
            </button>
            <h1 style={{ marginBottom: 24 }}>Новий інвентар</h1>
            {error && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}
            <InventoryForm onSubmit={handleSubmit} loading={loading} />
        </div>
    )
}