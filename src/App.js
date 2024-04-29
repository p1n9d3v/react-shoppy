import ErrorBoundary from 'components/ErrorBoundary';
import Cart from 'pages/Cart';
import Home from 'pages/Home';
import NewProduct from 'pages/NewProduct';
import ProductDetail from 'pages/ProductDetail';
import ProtectedRoute from 'pages/ProtectedRoute';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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

                element: (
                    <ErrorBoundary>
                        <Suspense fallback={<p>Loading...</p>}>
                            <ProductDetail />
                        </Suspense>
                    </ErrorBoundary>
                )
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

const queryClient = new QueryClient();
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <RouterProvider router={router} />
            </UserProvider>
        </QueryClientProvider>
    );
}

export default App;
