import Home from 'pages/Home';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import './style/index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <div>Something wrong</div>,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
