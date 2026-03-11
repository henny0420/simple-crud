  import { useState } from 'react'
  import './App.css'
  import { createBrowserRouter, RouterProvider } from 'react-router-dom'
  import SignUp from './pages/auth/signup'
  import SignIn from './pages/auth/signin'
  import { ToastContainer } from 'react-toastify'
  import Home from './pages/home'
  import Product from './pages/admin/product'
import ProtectedRoute from './routes/protectedRoute'
import AddProduct from './pages/admin/product/addProduct'

  function App() {

    const router = createBrowserRouter([
      {
        path : '/',
        element : <SignUp/>
      },
      {
        path : '/signin',
        element : <SignIn/>
      },
      {
        path : '/home',
        element : (
          <ProtectedRoute roles={['admin','user']}>
            <Home/>
          </ProtectedRoute>
        )
      },
      {
        path : '/admin/product',
        element : (
          <ProtectedRoute roles={['admin']}>
            <Product/>
          </ProtectedRoute>
        )
      },
      {
        path : '/admin/addProduct/:id',
        element : (
          <ProtectedRoute roles={['admin']}>
            <AddProduct/>
          </ProtectedRoute>
        )
      }
      
    ])
    return (
      <>
      <RouterProvider router={router} />
      <ToastContainer position='top-right' autoClose={3000}/>
      </>
    )
  }

  export default App
