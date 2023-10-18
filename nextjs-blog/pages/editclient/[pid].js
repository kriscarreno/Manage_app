import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';
import * as Yup from 'yup'
import { useQuery,useMutation } from '@apollo/client';
import { GET_CLIENT, UPDATE_CLIENT,CLIENTS_BY_SELLER } from '../../gql/queries';
import { Formik } from 'formik';
import Swal from 'sweetalert2';

const EditClient=()=>{
    const router=useRouter();
    const {query}=router
    const {pid}=query
    const{data,loading}=useQuery(GET_CLIENT,{
        variables:{getClientId:pid}
    });
    const [updateClient]=useMutation(UPDATE_CLIENT)
     const schemaValidation= Yup.object({
            name:Yup.string().required('Name is required'),
            lastName:Yup.string().required('Last Name is required'),
            company:Yup.string().required('Company is required'),
            email:Yup.string().email('Email must be valid').required('email is required'),
            phoneNumber:Yup.number()
        });
       if(loading){
        return "Loading...";
       }

    return(
        <Layout>
            <h1 className='text-2xl text-gray-800 font-light text-center'>EDIT CLIENT</h1>
            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-lg'>
                    <Formik
                    validationSchema={schemaValidation}
                    enableReinitialize
                    initialValues={data?data.getClient:''}
                    onSubmit={async (values)=>{
                         try{
                         const {data}=  await updateClient({
                            variables:{
                                updateClientId:values.id,
                                name:values.name,
                                lastName:values.lastName,
                                email:values.email,
                                company:values.company,
                                phoneNumber:values.phoneNumber
                            }
                           });
                           Swal.fire(
                            'CLient Edited!',
                            'success'
                          )
                           router.push('/')
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
                        placeholder='Name'
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
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='lastName'>
                            Last Name
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="lastName"
                        type='text'
                        placeholder='Last Name'
                        value={props.values.lastName}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        />
                       </div>
                       {props.touched.lastName && props.errors.lastName ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{props.errors.lastName}</p>
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
                        value={props.values.company}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        />
                       </div>
                       {props.touched.company && props.errors.company ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{props.errors.company}</p>
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
                        value={props.values.email}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        />
                       </div>
                       {props.touched.email && props.errors.email ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{props.errors.email}</p>
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
                        value={props.values.phoneNumber}
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        />
                       </div>
                       {props.touched.phoneNumber && props.errors.phoneNumber ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{props.errors.phoneNumber}</p>
                        </div>
                       ):null}

                       <input  
                       type='submit'
                       className='bg-gray-800 w-full mt-5 p-2 text-white  uppercase font-bold hover:bg-gray-900'
                       value="Edit Client"
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

export default EditClient;