import Home from 'pages/Home';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import { UserProvider } from './context/user';
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
            },
            {
                path: '/products',
                element: <div>Products</div>
            },
            {
                path: '/products/new',
                element: <div>Products New</div>
            },
            {
                path: '/products/:id',
                element: <div>Products Detail</div>
            },
            {
                path: '/cart',
                element: <div>My Cart</div>
            }
        ]
    }
]);

function App() {
    return (
        <UserProvider>
            <RouterProvider router={router} />
        </UserProvider>
    );
}

export default App;
