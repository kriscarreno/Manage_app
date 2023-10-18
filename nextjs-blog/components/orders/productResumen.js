import React, { useContext, useEffect, useState } from 'react';
import OrderContext from '../../context/orders/OrderContext';

const ProductResumen = ({product}) => {

    const[cant,setCant]=useState(0);
    
    const orderContext=useContext(OrderContext);
    const {cantProducts,actTotal}=orderContext;

    useEffect(()=>{
      updateCant();
      actTotal();
    },[cant])

    const updateCant=()=>{
       const newProduct={...product,total:Number(cant)}
       cantProducts(newProduct)
    }

    return ( 
        <div className='md:flex md:justify-between md:items-center mt-5'>
            <div className="md:w-2/4 mb-2 md:mb-0">
                <p className='text-sm'>{product.name}</p>
                <p >$ {product.price}</p>
            </div>

            <input
            type='number'
            placeholder='Quantity'
            className='shadow appearance-none border-rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline md:ml-4'
            onChange={e=>{setCant(e.target.value)}}
            value={cant}
            />
        </div>
     );
}
 
export default ProductResumen;