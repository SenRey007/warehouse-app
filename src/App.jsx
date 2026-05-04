import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryEdit from './pages/AdminInventoryEdit'
import AdminInventoryDetails from './pages/AdminInventoryDetails'
import Gallery from './pages/Gallery'
import Favorites from './pages/Favorites'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Navigate to="/admin" replace />} />
                    <Route path="admin" element={<AdminInventory />} />
                    <Route path="admin/create" element={<AdminInventoryCreate />} />
                    <Route path="admin/:id" element={<AdminInventoryDetails />} />
                    <Route path="admin/:id/edit" element={<AdminInventoryEdit />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="favorites" element={<Favorites />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}