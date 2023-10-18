import React,{useContext, useEffect,useState} from 'react';
import Select from 'react-select'
import { GET_PRODUCTS } from '../../gql/queries';
import { useQuery } from '@apollo/client';
import OrderContext from '../../context/orders/OrderContext';

const AddProducts = () => {

    const [products,setProducts]=useState([]);
    const orderContext=useContext(OrderContext);
    const {addProduct}=orderContext;

    const {data,loading,error}=useQuery(GET_PRODUCTS);
    useEffect(()=>{
       addProduct(products)
    },[products])
    const selectProduct=product =>{
        setProducts(product)
    }
    if(loading) return 'Cargando...';
    const {getProducts}=data;


    return ( 
        <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2'>2.- Add Products</p>
        <Select
        className='mt-3'
        options={getProducts}
        isMulti={true}
        onChange={option=>selectProduct(option)}
        getOptionValue={(opciones)=>opciones.id}
        getOptionLabel={opciones=>`${opciones.name}-${opciones.existence} Disponibles`}
        placeholder='Select Products'
        />
        </>
     );
}
 
export default AddProducts;