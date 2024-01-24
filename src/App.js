import Home from 'pages/Home';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './style/index.css';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <div>Something wrong</div>
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
