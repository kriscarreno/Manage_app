import React,{useState} from 'react';
import Layout from '../components/layout';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { ADD_PRODUCT } from '../gql/queries';
import { useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const AddProduct = () => {
    const [createProduct]=useMutation(ADD_PRODUCT);
    const[mensaje,guardarMensaje]=useState(null);
    const router=useRouter();
    const formik=useFormik({
        initialValues:{
           name:'',
           existence:'',
           price:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required('Name is required'),
            price:Yup.number().required('The price is required'),
            existence:Yup.number().required('The existence is required')
        }),
        onSubmit:async values=>{
            try{
               const{data}=await createProduct({
                variables:{
                    name:values.name,
                    existence:values.existence,
                    price:values.price
                }
               });
               Swal.fire(
                'Product Created!',
                'success'
              )
               router.push('/products')
               
            }catch(err){
                guardarMensaje(err.message.replace('ApolloError:',''));
                setTimeout(()=>{
                    guardarMensaje(null)
                },3000)
              console.log(err);
            }

        }
    });
    const showError=()=>{
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }
    return ( 
         <Layout>
             {mensaje && showError()}
            <h1 className='text-2xl text-gray-800 font-light text-center'>Add Product</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                   <form 
                   onSubmit={formik.handleSubmit}
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
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.name && formik.errors.name ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.name}</p>
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
                        value={formik.values.existence}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.existence && formik.errors.existence ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.existence}</p>
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
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.price && formik.errors.price ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.price}</p>
                        </div>
                       ):null}

                       <input  
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900'
                       value="Add Product"
                       />
                   </form>
                </div>
            </div>
         </Layout>
     );
}
 
export default AddProduct;