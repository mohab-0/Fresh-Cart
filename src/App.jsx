import './App.css'
import Registeration from './components/Registeration/Registeration'
import Login from './components/Login/Login'
import { createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import CounterContextProvider from './Contexts/CounterContext'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProtectedAuthRoutes from './components/ProtectedAuthRoutes/ProtectedAuthRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './components/ShippingAddress/ShippingAddress'
import Orders from './components/Orders/Orders'
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {
  let queryClient = new QueryClient();

  const router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute> <Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectedAuthRoutes><Login /></ProtectedAuthRoutes> },
        { path: 'registeration', element: <Registeration /> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'shippingAddress/:cartId', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'allOrders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <ToastContainer />
          </CounterContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
