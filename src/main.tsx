import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactQueryProvider } from './contexts/QueryContext/QueryContext.tsx';
import { RouterProvider } from './contexts/RouterContext/RouterContext.tsx';
import { AuthProvider } from './contexts/AuthContext/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <ReactQueryProvider>
    <RouterProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </RouterProvider>
  </ReactQueryProvider>
)
