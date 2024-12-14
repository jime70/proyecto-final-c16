import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import GiveOpinions from './Pages/GiveOpinions'
import Catalog from './Pages/Catalog'
import { CatalogDetail } from './Pages/CatalogDetail'

export const Router = createBrowserRouter([
    { path: '/', element: <App />},
    { path: '/opinions', element: <GiveOpinions />},
    { path: '/catalog', element: <Catalog />},
    { path: '/product', element: <CatalogDetail />}
])