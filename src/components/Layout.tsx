import { Outlet } from 'react-router';

export default function Layout() {
    return (
        <main className="min-h-screen overflow-hidden px-8 pt-3">
            <Outlet />
        </main>
    );
}
