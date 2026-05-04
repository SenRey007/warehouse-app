import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'
import { useInventory } from '../store/InventoryContext'

export default function AdminInventory() {
    const { items, loading, error, fetchInventory } = useInventory()
    const navigate = useNavigate()

    useEffect(() => { fetchInventory() }, [fetchInventory])

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h1 style={{ margin: 0 }}>Інвентар складу</h1>
                <button
                    onClick={() => navigate('/admin/create')}
                    style={{ padding: '10px 20px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
                >
                    + Додати
                </button>
            </div>
            <InventoryTable
                items={items}
                loading={loading}
                error={error}
                onView={id => navigate(`/admin/${id}`)}
                onEdit={id => navigate(`/admin/${id}/edit`)}
                onDelete={item => alert(`Видалення буде в наступному коміті`)}
            />
        </div>
    )
}