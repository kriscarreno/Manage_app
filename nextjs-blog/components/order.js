import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { DELETE_ORDER, GET_ORDERS, UPDATE_ORDER } from '../gql/queries';
import Swal from 'sweetalert2';

const Order = ({order}) => {
    const{id,total,client,status}=order
    const [statusOrder,setStatus]=useState(status);
     const [type,setType]=useState(status);
     const [updateOrder]=useMutation(UPDATE_ORDER,{
        update(cache,{data:updateOrder}){
            const {getOrdersBySeller}=cache.read({query:GET_ORDERS});
            cache.writeQuery({
                query:GET_ORDERS,
                data:{
                    getOrdersBySeller:[...getOrdersBySeller,updateOrder]
                }
            })
        }
     });
     const [deleteOrder]=useMutation(DELETE_ORDER,{
        update(cache){
           const {getOrdersBySeller}=cache.read({query:GET_ORDERS});
           cache.writeQuery({
            query:GET_ORDERS,
            data:{
                getOrdersBySeller:getOrdersBySeller.filter(ActualOrder=>ActualOrder.id!==id)
            }
        })
        }
     });
    useEffect(()=>{
        if(statusOrder){
            setStatus(statusOrder);
        }
        typeOrder();
    },[statusOrder])
       
      const typeOrder=()=>{
        if(statusOrder==='PENDING'){
           setType('border-yellow-500')
        }else if(statusOrder==='COMPLETED'){
           setType('border-green-500')
        }else{
           setType('border-red-500');
        }
      }

      const changeStatus=async newStatus=>{
        try{
            const {data}=await updateOrder({
                variables:{
                    updateOrderId:id,
                    input:{
                        status:newStatus,
                        client:client.id   
                    }
                }
            })
            setStatus(data.updateOrder.status);

        }catch(err){
            console.log(err)
        }
      }

      const handingDeleteOrder=async id=>{
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
        
                     await deleteOrder({ variables: { deleteOrderId:id } })
                    .then(res => {
                      if (!res.errors) {
                        // handle success
                        Swal.fire(
                          'Deleted!',
                          res.data.deleteOrder,
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
              })
      }

        return ( 
        <div className={` ${type} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className='font-bold text-gray-800'>Client :{client.name} {client.lastName}</p>
                {client.email&&(
                    <p>{client.email}</p>
                )}
                {client.phoneNumber&&(
                    <p>{client.phoneNumber}</p>
                )

                }
                <h2 className='text-gray-800 font-bold mt-10'>Status: {status}</h2>
                <select
                onChange={e=>changeStatus(e.target.value)}
                className='mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold'
                value={statusOrder}
                >
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELED">CANCELED</option>
                </select>
            </div>

            <div>
                <h2 className='text-gray-800 font-bold margin-top'>Order</h2>
                 {order.order.map(item=>(
                    <div key={item.id} className='mt-4'>
                        <p className='text-sm text-gray-600'>Product: {item.name}</p>
                        <p className='text-sm text-gray-600'>Cantidad: {item.total}</p>
                    </div>
                 ))}
                 <p className='text-gray-800 mt-3 font-bold'>Total: 
                 <span className='font-light'> $ {total}</span>
                 </p>

                 <button
                 onClick={()=>handingDeleteOrder(id)}
                 className='text-white flex items-center mt-4 bg-red-800 px-5 py-2 inline-block uppercase font-bold text-xs leading-tight'
                 >
                  Delete order
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
                 </button>

            </div>
        </div>
     );
}
 
export default Order;