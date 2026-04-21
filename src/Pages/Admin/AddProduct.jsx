import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../Components/DashboardLayout'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './CSS/Product.css'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const API_URL = import.meta.env.VITE_APi_Url
    

    const navigate = useNavigate()

    const token = localStorage.getItem("token")
    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState("")
    const [des, setDes] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState(null)
    const [loader, setLoader] = useState(false)
    const [product, setProduct] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)

    const [editMode, setEditMode] = useState(false)

    const handleSubmit = async (e) => {
        setLoader(true)
        e.preventDefault()

        const formData = new FormData()

        formData.append('title', title)
        formData.append('des', des)
        formData.append('price', price)
        formData.append('image', image)

        try {
            setLoader(true)
            let res;
            if (editMode) {
                res = await axios.post(`${API_URL}/api/update/${selectedProduct._id}`, formData)
                fetchProduct()
                setVisible(false)
                toast("Product Updated")
                resetForm()
            }
            else {
                res = await axios.post(`${API_URL}/api/add`, formData)
                if (res.status == 200) {
                    fetchProduct()
                    toast("Product Added")
                    setVisible(false)
                }
            }
        } catch (error) {
            toast("Error Adding Product");
        }
        finally {
            setLoader(false)

        }

    }

    const resetForm = () => {
        setDes("")
        setTitle("")
        setPrice("")
        setImage(null)
        setSelectedProduct(null)
        setEditMode(false)
    }

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/get-all`)
            setProduct(res.data.product)

        } catch (error) {
            console.log(error);

        }
    }
    const imageBodyTemplate = (product) => {
        return <img src={`${product.image}`} alt={product.image} className="product-table-image" />;
    };


    useEffect(() => {
        fetchProduct()
    }, [])


    const handleEdit = (rowData) => {
        setEditMode(true)
        setSelectedProduct(rowData)
        setTitle(rowData.title)
        setDes(rowData.des)
        setPrice(rowData.price)
        setVisible(true)
    }

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`${API_URL}/api/delete/${id}`)
            fetchProduct()
            toast("Product Deleted")
        } catch (error) {
            console.log(error);

        }
    }


    const actionTemplate = (rawData) => {
        return (
            <div style={{ display: "flex", gap: "10px" }}>
                <Button
                    label='Edit'
                    icon='pi pi-pencil'
                    onClick={() => handleEdit(rawData)}

                />
                <Button
                    label='Delete'
                    icon='pi pi-pencil'
                    onClick={() => handleDelete(rawData._id)}
                />
            </div>
        )
    }
    return (
        <>
            <DashboardLayout>
                <div className="product-header">
                    <h2>Add Product</h2>
                    <Button label="Add Product" icon="pi pi-external-link" onClick={() => setVisible(true)} />
                </div>




                <DataTable value={product} tableStyle={{ minWidth: '60rem' }}>
                    <Column field="title" header="Name"></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="des" header="Description"></Column>
                    <Column field="price" header="Price"></Column>
                    <Column header="Action" body={actionTemplate}></Column>


                </DataTable>

            </DashboardLayout>


            <div className="card flex justify-content-center">
                <Dialog header={editMode ? "Edit Product" : 'Add Product'} visible={visible} style={{ width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                    <p className="m-0">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder='Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <br /> <br />
                            <input
                                type="text"
                                placeholder='Description'
                                value={des}
                                onChange={(e) => setDes(e.target.value)}
                            />
                            <br /> <br />
                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            <br /> <br />
                            <input
                                type="text"
                                placeholder='Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            <br /> <br />
                            <button type='submit'>{loader ? (editMode ? "Updating" : "Adding") : (editMode ? "Update" : "Add")}</button>
                        </form>
                    </p>
                </Dialog>
            </div>

        </>
    )
}

export default AddProduct