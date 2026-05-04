import { Outlet, NavLink } from 'react-router-dom'
import styles from './Layout.module.css'

export default function Layout() {
    return (
        <div className={styles.wrapper}>
            <nav className={styles.nav}>
                <span className={styles.logo}>📦 Warehouse</span>
                <div className={styles.links}>
                    <NavLink to="/admin" className={({ isActive }) => isActive ? styles.active : ''}>
                        Адмін
                    </NavLink>
                    <NavLink to="/gallery" className={({ isActive }) => isActive ? styles.active : ''}>
                        Галерея
                    </NavLink>
                    <NavLink to="/favorites" className={({ isActive }) => isActive ? styles.active : ''}>
                        ❤️ Улюблені
                    </NavLink>
                </div>
            </nav>
            <main className={styles.main}>
                <Outlet />
            </main>
        </div>
    )
}