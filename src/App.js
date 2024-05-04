import Cart from 'pages/Cart';
import Home from 'pages/Home';
import NewProduct from 'pages/NewProduct';
import ProductDetail from 'pages/ProductDetail';
import ProtectedRoute from 'pages/ProtectedRoute';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
                    <ErrorBoundary fallback={<div>Something is wrong</div>}>
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
                        <ErrorBoundary fallback={<div>Something is wrong</div>}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Cart />
                            </Suspense>
                        </ErrorBoundary>
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
