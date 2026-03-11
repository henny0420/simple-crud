import React, { useEffect, useState } from 'react'
import { ProductsApi } from '../../../api/productapi'
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Product() {
    console.log("Product component mounted");
    const [fetchedData, setFetchedData] = useState([])
    const [errorMsg, setErrorMsg] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductsApi()
                if (res && res.data && res.data.products) {
                    setFetchedData(res.data.products)
                } else if (res && res.data) {
                    setErrorMsg(res.data.message || "No products in response")
                }
            } catch (error) {
                setErrorMsg(error.response?.data?.message || error.message);
                console.log(error.response?.data?.message || error.message);
            }
        }
        fetchData()
    }, [])

    const handleEdit = (id) => {
        navigate(`/admin/addProduct/${id}`)
    }

    return (
        <div>
            {errorMsg && <div style={{ color: 'red', fontWeight: 'bold', margin: '15px' }}>Error: {errorMsg}</div>}
            <table
                width="100%"
                border="1px"
                cellPadding="10"
                cellSpacing="0"
                style={{ borderCollapse: 'collapse' }}
            >               
             <thead>
                    <tr>
                        <th>name</th>
                        <th>price</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody >
                    {fetchedData.map((val, index) => {
                        return (
                            <tr key={index} className='text-center h-4'>
                                <td>{val.name}</td>
                                <td>{val.price}</td>
                                <td><button onClick={()=>handleEdit(val._id)}><Edit /></button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
