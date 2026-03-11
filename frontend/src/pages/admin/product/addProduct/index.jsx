import React, { useEffect, useState } from 'react'
import { addProductsApi, getProductApi, ProductsApi, updateProduct } from '../../../../api/productapi'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

function AddProduct() {

  const [input, setInput] = useState({})
  const [image, setImage] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const res = await getProductApi(id)
          if (res && res.data) {
            setInput(res.data.products)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchProduct()
  }, [id])

  const handleImage = (ev) => {
    setImage(ev.target.files[0])
  }

  const handleInput = (ev) => {
    const { name, value } = ev.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }



  const handleSubmit = async () => {
    try {
      if (id) {
        const update = await updateProduct(id, input)
        if (update) {
          toast.success('product has been updated sucessfully')
        }
      }
      else {
        try {
          const formData = new FormData()

          formData.append('name', input.name)
          formData.append('price', input.price)
          formData.append('stock', input.stock)
          formData.append('displayImage', image)

          const res = await addProductsApi(formData)
          if (res) {
            toast.success('product added successfully')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || 'Failed to add product');

        }
      }
    } catch (error) {
      console.log(error);

    }
  }



  return (

    <div className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-sm shadow-sm p-5'>
        <label htmlFor='name' className='block'>Product Name</label>
        <input value={input.name || ''} type='text' id='name' name="name" placeholder='name' className='bg-grey-200 p-2 w-full mb-4' onChange={handleInput}></input>
        <label htmlFor='price' className='block'>Price</label>
        <input value={input.price || ''} type='text' id='price' name="price" placeholder='price' className='bg-grey-200 p-2 w-full mb-4' onChange={handleInput}></input>
        <label htmlFor='stock' className='block'>stock</label>
        <input value={input.stock || ''} type='text' id='stock' name="stock" placeholder='stock' className='bg-grey-200 p-2 w-full mb-4' onChange={handleInput}></input>
        <label htmlFor='displayImage' className='block'>image</label>
        <input type='file' id='displayImage' name="displayImage" placeholder='displayImage' className='bg-gerey-200 p-2 w-full mb-4' onChange={handleImage}></input>

        <button className='w-full bg-blue-400 p-3' onClick={handleSubmit}>{id ? 'update' : 'submit'}</button>
      </div>
    </div>
  )
}

export default AddProduct
