import React, { useContext } from 'react';
import OrderContext from '../../context/orders/OrderContext';
import ProductResumen from './productResumen';


const ResumenOrder = () => {
   const orderContext=useContext(OrderContext);
   const {products}=orderContext;

    return ( 
       <>
       <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2'>2.- How many products do you want?</p>
          {products.length>0 ?(
            <>
            {products.map(product=>(
                <ProductResumen 
                key={product.id} 
                product={product}/>
            ))}
            
            </>
          ):(<p className='mt-5 text-sm'>You haven`t select any product</p>
          
          )}
       
       </>
     );
}
 
export default ResumenOrder;