import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import * as Yup from 'yup'
import { useQuery,useMutation } from '@apollo/client';
import {UPDATE_PRODUCT, GET_PRODUCT } from '../../gql/queries';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const router=useRouter();
    const {query}=router
    const {pid}=query
    const{data,loading}=useQuery(GET_PRODUCT,{
        variables:{getProductId:pid}
    });
   
    const [updateProduct]=useMutation(UPDATE_PRODUCT)
     const schemaValidation= Yup.object({
        name:Yup.string().required('Name is required'),
        price:Yup.number().required('The price is required'),
        existence:Yup.number().required('The existence is required')
        });
       if(loading){
        return "Loading...";
       }

    return(
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light text-center'>EDIT PRODUCT</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                    validationSchema={schemaValidation}
                    enableReinitialize
                    initialValues={data?data.getProduct:''}
                    onSubmit={async (values)=>{
                         try{
                         const {data}=  await updateProduct({
                            variables:{
                                updateProductId:values.id,
                                name:values.name,
                                existence:values.existence,
                                price:values.price

                            }
                           });
                           Swal.fire(
                            'Product Edited!',
                            'success'
                          )
                           router.push('/products')
                           console.log(data);
                         }catch(err){
                            console.error(err);
                         }
                    }}
                    >
                        {props=>{
                            return(
                                <form 
                                onSubmit={props.handleSubmit}
                                className='bg-white shadow-md px-8 pt-6 pb-8 mb-4'>
                                <div>
                                     <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                         Name
                                     </label>
                                     <input
                                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                     id="name"
                                     type='text'
                                     placeholder='Product Name'
                                     value={props.values.name}
                                     onChange={props.handleChange}
                                     onBlur={props.handleBlur}
                                     />
                                    </div>
                                    {props.touched.name && props.errors.name ?(
                                     <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                         <p>{props.errors.name}</p>
                                     </div>
                                    ):null}
                                    <div>
                                     <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='existence'>
                                         Existence
                                     </label>
                                     <input
                                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                     id="existence"
                                     type='number'
                                     placeholder='Product Existence'
                                     value={props.values.existence}
                                     onChange={props.handleChange}
                                     onBlur={props.handleBlur}
                                     />
                                    </div>
                                    {props.touched.existence && props.errors.existence ?(
                                     <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                         <p>{props.errors.existence}</p>
                                     </div>
                                    ):null}
                                    <div>
                                     <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='price'>
                                        Price
                                     </label>
                                     <input
                                     className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                     id="price"
                                     type='number'
                                     placeholder='Product Price'
                                     value={props.values.price}
                                     onChange={props.handleChange}
                                     onBlur={props.handleBlur}
                                     />
                                    </div>
                                    {props.touched.price && props.errors.price ?(
                                     <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                         <p>{props.errors.price}</p>
                                     </div>
                                    ):null}
             
                                    <input  
                                    type='submit'
                                    className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900'
                                    value="Add Product"
                                    />
                                </form>
                            )
                        }}
                  
                   </Formik>
                </div>
            </div>
        </Layout>
    )

}
 
export default EditProduct;