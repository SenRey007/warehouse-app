import { createContext, useContext, useState, useCallback } from 'react'
import { getInventory } from '../services/inventoryApi'

const InventoryContext = createContext(null)

export function InventoryProvider({ children }) {
    const [items, setItems]     = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState(null)

    const fetchInventory = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getInventory()
            setItems(data)
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }, [])

    return (
        <InventoryContext.Provider value={{ items, loading, error, fetchInventory }}>
            {children}
        </InventoryContext.Provider>
    )
}

export function useInventory() {
    const ctx = useContext(InventoryContext)
    if (!ctx) throw new Error('useInventory must be used inside InventoryProvider')
    return ctx
}