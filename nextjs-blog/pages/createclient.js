import React,{useState} from 'react';
import Layout from '../components/layout';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { CREATE_CLIENT } from '../gql/queries';
import { CLIENTS_BY_SELLER } from '../gql/queries';


const createClient=()=>{
    const router=useRouter();
    const[mensaje,guardarMensaje]=useState(null);

     const[createClient]=useMutation(CREATE_CLIENT,{
        update(cache,{data: createClient}){
            const{getClientsBySeller}=cache.readQuery({query:CLIENTS_BY_SELLER});
            cache.writeQuery({
                query:CLIENTS_BY_SELLER,
                data:{
                    getClientsBySeller:[...getClientsBySeller,createClient]
                }
            })
        }
     });
    const formik=useFormik({
        initialValues:{
            name:'',
            lastName:'',
            company:'',
            email:'',
            phoneNumber:''
        },
        validationSchema :Yup.object({
            name:Yup.string().required('Name is required'),
            lastName:Yup.string().required('Last Name is required'),
            company:Yup.string().required('Company is required'),
            email:Yup.string().email('Email must be valid').required('email is required'),
            phoneNumber:Yup.number()
        }),
        onSubmit:async values=>{
            try{
                const{data}=await createClient({
                    variables:{
                        name:values.name,
                        lastName:values.lastName,
                        company:values.company ,
                        email:values.email,
                        phoneNumber:values.phoneNumber,
                    }
                });
                guardarMensaje('Creando...')
                setTimeout(()=>{
                    guardarMensaje(null)
                    router.push('/');
                },1000)
                 console.log(data);              
            }catch(err){
                guardarMensaje(err.message.replace('ApolloError:',''));
                setTimeout(()=>{
                    guardarMensaje(null)
                },3000)
              console.log(err);
            }
        },
        
    })
    const showError=()=>{
        return(
            <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
                <p>{mensaje}</p>
            </div>
        )
    }
    return(

        <Layout>
        <div>
            {mensaje && showError()}
            <h1 className='text-2xl text-gray-800 font-light text-center'>New Client</h1>
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
                        placeholder='Name'
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
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="lastName"
                        type='text'
                        placeholder='Last Name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.lastName && formik.errors.lastName ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.lastName}</p>
                        </div>
                       ):null}
                       <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='company'>
                            Company
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="company"
                        type='text'
                        placeholder='User Company'
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.company && formik.errors.company ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.company}</p>
                        </div>
                       ):null}
                       <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="email"
                        type='email'
                        placeholder='User Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.email && formik.errors.email ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.email}</p>
                        </div>
                       ):null}
                       <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='phoneNumber'>
                            Phone Number
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="phoneNumber"
                        type='tel'
                        placeholder='Phone Number'
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.phoneNumber && formik.errors.phoneNumber ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.phoneNumber}</p>
                        </div>
                       ):null}

                       <input  
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900'
                       value="Submit Client"
                       />
                   </form>
                </div>
            </div>
        </div>
        </Layout>
    )
}




export default createClient;