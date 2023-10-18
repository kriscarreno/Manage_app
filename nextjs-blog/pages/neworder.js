import React,{useContext,useState} from 'react';
import Layout from '../components/layout';
import AddClient from '../components/orders/addClient';
import AddProducts from '../components/orders/addProducts';
import ResumenOrder from '../components/orders/resumenOrder';

import OrderContext from '../context/orders/OrderContext';
import Total from '../components/orders/total';
import { useMutation } from '@apollo/client';
import { GET_ORDERS, NEW_ORDER } from '../gql/queries';
import Swal from 'sweetalert2'
import { useRouter } from 'next/router';

 const NewOrder = () => {
    const router=useRouter()

    const[mensaje,setMensaje]=useState(null)
   
    const orderContext=useContext(OrderContext);
    const {client,products,total}=orderContext

   
    const[newOrder]=useMutation(NEW_ORDER,{
        update(cache,{data:newOrder}){
            const {getOrdersBySeller}=cache.read({query:GET_ORDERS});

            cache.writeQuery({
                query:GET_ORDERS,
                data:{
                    getOrdersBySeller:[...getOrdersBySeller,newOrder]
                }

            })
        }
    });

    const createNewOrder=async()=>{
         const OrderProductInput=products.map(({existence,createdDate,__typename,...product})=>product)
         const {id}=client;
         const input={order:OrderProductInput,total,client:id}
         await newOrder({ variables:{input:{order:OrderProductInput,total,client:id}}})
         .then(res=>{
            router.push('/orders')
            Swal.fire(
                'Created!',
                'success'
              )
         })

         .catch(err=>{
            setMensaje(err.message.replace("GraphQL error:",''));
            setTimeout(()=>{
                setMensaje(null)
            },3000)
        })
    }
    const showError=()=>{
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }

    const validateOrder=()=>{
        return !products.every(product=>product.total>0)||total===0||client.length===0? ' opacity-50 cursor-not-allowed ':''  
    }
    return (  
        <Layout>
            
                  <h1 className="text-2xl text-gray-800 font-light text-center">New Order</h1>
                    {mensaje&&showError()}
                  <div className='flex justify-center mt-5'>
                    <div className='w-full max-w-lg'>
                        <AddClient/>
                        <AddProducts/>
                        <ResumenOrder/>
                        <Total/>

                        <button 
                        type='button'
                        className={`bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900 ${validateOrder()}`}
                        onClick={()=>createNewOrder()}
                        >
                            Submit Order
                        </button>
                    </div>
                  </div>
                 
        </Layout>

        
    );
 }
  
 export default NewOrder;