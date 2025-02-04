import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './theme/ThemeProvider';
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Forum } from './pages/Forum';
import { Analytics } from './pages/Analytics';
import { Templates } from './pages/Templates';
import { Services } from './pages/Services';
import { IDE } from './pages/IDE';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { IDM } from './pages/IDM';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
            <Route path="analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
            <Route path="templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
            <Route path="services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
            <Route path="ide" element={<ProtectedRoute><IDE /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="idm" element={<ProtectedRoute><IDM /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
