import Cart from 'pages/Cart';
import Home from 'pages/Home';
import NewProduct from 'pages/NewProduct';
import ProductDetail from 'pages/ProductDetail';
import ProtectedRoute from 'pages/ProtectedRoute';
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
                path: '/products/new',
                element: (
                    <ProtectedRoute requireAdmin>
                        <NewProduct />
                    </ProtectedRoute>
                )
            },
            {
                path: '/products/:id',
                element: <ProductDetail />
            },
            {
                path: '/cart',
                element: (
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                )
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
