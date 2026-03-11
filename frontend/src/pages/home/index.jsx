import React, { useEffect, useState } from 'react'
import { getAllProductApi } from '../../api/productapi'
import { useSearchParams } from 'react-router-dom'

const Home = () => {

  const [searchParams,setSearchparams] = useSearchParams()

  const [product, setProduct] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const res = await getAllProductApi(page, limit)
        if (res) {
          setProduct(res.data.products)
          setTotalPages(res.data.totalPages)
          console.log(res);

        }
      } catch (error) {
        console.log(error.response.data.message);

      }
    }
    fetchProducts()
  }, [page])

  return (
    <div className='max-w-main mx-auto grid grid-cols-3 gap-20'>
      {
        product.map((val, err) => {
          return (
            <div className='p-4 border-2 rounded-m'>
              <img src={val.displayImage.url} ></img>
              <div className='p-2 shadow-sm rounded-md'>
                <h2 className='text-[20px]'>{val.name}</h2>
              </div>
            </div>
          )
        })
      }
      <div className='flex items-center gsp-2'>
        <button
        className='bg-blue-200'
          disabled={page == 1}
          onClick={() => setPage(page - 1)}
        >prev</button>

        <p>{page} of total {totalPages}</p>

        <button
        className='bg-blue-200'

          disabled={page == totalPages}
          onClick={
            () => setPage(page + 1)}
        >next</button>
      </div>
    </div>
  )
}

export default Home
