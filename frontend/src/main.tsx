import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // 🚨 CAMBIO 1: Importar HashRouter
import './index.css';
import './styles/theme.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter> {/* 🚨 CAMBIO 2: Usar HashRouter */}
            <App />
        </HashRouter>
    </StrictMode>
);