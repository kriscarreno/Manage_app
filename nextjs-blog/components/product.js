import React from 'react';
import {format} from 'date-fns'
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT, GET_PRODUCTS } from '../gql/queries';
import Swal from 'sweetalert2';
import Router from 'next/router';

const Product = ({product}) => {

    const[deleteProduct]=useMutation(DELETE_PRODUCT,{
        update(cache){
            const {getProducts}=cache.read({query:GET_PRODUCTS});
            cache.writeQuery({
                query:GET_PRODUCTS,
                data:{
                    getProducts:getProducts.filter(productActual=>productActual.id!==product.id)
                }
            })
        }
    });
    const num=parseInt(product.createdDate)
    const dataCreated=new Date(num)
    const date=format(dataCreated,"dd MMM yyyy")

    const handleDeleteProduct=async (id)=>{
        Swal.fire({
          title:'Are you sure?',
          text:'You won`t be able to revert this',
          icon:'warning',
          showCancelButton:true,
          confirmButtonColor:'#3085d6',
          cancelButtonColor:'#d33',
          confirmButtonText:'Yes delete it'
        }).then(async(result)=>{
          if(result.value){
  
               await deleteProduct({ variables: { deleteProductId:id } })
              .then(res => {
                if (!res.errors) {
                  // handle success
                  Swal.fire(
                    'Deleted!',
                    res.data.deleteClient,
                    'success'
                  )
                } else {
                  // handle errors with status code 200
                  console.error(res.errors);
                }
              })
              .catch(err => {
                // GraphQL errors can be extracted here
                if (err.graphQLErrors) {
                  console.error('graphQLErrors', err.graphQLErrors);
                }
                if (err.networkError) {
                  console.error('networkError', err.networkError);
                }
              });         
          }
        });
    };
    const handleEditProduct=()=>{
        Router.push({
            pathname: '/editProduct/[id]',
            query:{id:product.id}
        })
    }

    return ( 
        <tr>
                <td className="text-center">{product.name}</td>
                <td className="text-center">{product.existence}</td>
                <td className="text-center">{product.price}</td>
                <td className='text-center'>{date}</td>
                <td className='text-center'>
                    <button
                    type='button'
                    className='flex justify-center items-center bg-red-800 py-2 px-4 w-full  text-white rounded text-xs uppercase font-bold hover:bg-red-500'
                     onClick={()=>handleDeleteProduct(product.id)}
                    >
                        Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                    </button>
                </td>
                <td className='text-center'>
                    <button
                    type='button'
                    className='flex justify-center items-center bg-green-600 py-2 px-4 w-full  text-white rounded text-xs uppercase font-bold hover:bg-green-500'
                     onClick={()=>handleEditProduct()}
                    >
                        Edit
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
</svg>
                    </button>
                </td>
              </tr>
     );
}
 
export default Product ;