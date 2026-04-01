import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Layout from './components/Layout';
import AdsPage from './pages/ads-page';
import EditPage from './pages/edit-page';
import ItemPage from './pages/item-page';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="ads" element={<AdsPage />} />
                    <Route path="ads/:id" element={<ItemPage />} />
                    <Route path="ads/:id/edit" element={<EditPage />} />

                    <Route path="*" element={<Navigate to="/ads" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
