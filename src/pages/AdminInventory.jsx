import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InventoryTable from '../components/inventory/InventoryTable'
import ConfirmModal from '../components/inventory/ConfirmModal'
import { deleteInventory } from '../services/inventoryApi'
import { useInventory } from '../store/InventoryContext'

export default function AdminInventory() {
    const { items, loading, error, fetchInventory } = useInventory()
    const [toDelete, setToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const navigate = useNavigate()

    useEffect(() => { fetchInventory() }, [fetchInventory])

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await deleteInventory(toDelete.id)
            setToDelete(null)
            await fetchInventory()
        } catch (e) {
            alert(e.message)
        } finally {
            setDeleting(false)
        }
    }

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
                onDelete={item => setToDelete(item)}
            />
            <ConfirmModal
                item={toDelete}
                onConfirm={handleDelete}
                onCancel={() => setToDelete(null)}
                loading={deleting}
            />
        </div>
    )
}