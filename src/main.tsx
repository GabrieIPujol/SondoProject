import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ForgetPass from './pages/forget-pass/forget-pass.tsx';
import CreateAccount from './pages/create-account/create-account.tsx';

const router = createBrowserRouter([
  {
    path: '/SondoProject',
    element: <App/>,
  },
  {
    path: 'SondoProject/create-account',
    element: <CreateAccount/>,
  },
  {
    path: 'SondoProject/forget-pass',
    element: <ForgetPass/>,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router= {router}/>
  </StrictMode>
)
