import React,{useState} from 'react'
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { useMutation} from '@apollo/client';
import { CREATE_USER } from '../gql/queries';

export default function CreateUser(){
     //state para el mensaje
     const[mensaje,guardarMensaje]=useState(null);
    //Crear nuevo Usuario
    const [createUser]=useMutation(CREATE_USER);

    const router=useRouter();

    const formik= useFormik({
        initialValues:{
            name:'',
            lastName:'',
            email:'',
            password:''
        },
        validationSchema:Yup.object({
            name: Yup.string().required('Name is required'),
            lastName: Yup.string().required('Last Name is required'),
            email: Yup.string().email('Email its not valid ').required('Email is required'),
            password: Yup.string().required('Password is required').min('6','At least 6 characters')
        }),
        onSubmit: async values=>{

            try{
                const{data}=await createUser({
                    variables:{
                        name:values.name,
                        lastName:values.lastName,
                        email:values.email,
                        password:values.password
                    }
                });
                guardarMensaje(`The User ${data.createUser.name} was created successfully`)
                setTimeout(()=>{
                    guardarMensaje(null)
                    router.push('/login')
                },3000)
            }catch(err){ 
                guardarMensaje(err.message.replace('GraphQL error:',''));
                setTimeout(()=>{
                    guardarMensaje(null)
                },3000)
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

    return(
        <Layout>
        <div>
            {mensaje && showError()}
            <h1 className="text-center text-2xl text-white font-light">Sign Up</h1><br/>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                     onSubmit={formik.handleSubmit}
                    >
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
                       <br/>
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
                       <br/>
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
                        <br/>
                       <div>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        id="password"
                        type='password'
                        placeholder='User Password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                       </div>
                       {formik.touched.password && formik.errors.password ?(
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p>{formik.errors.password}</p>
                        </div>
                       ):null}
                        
                        <input 
                        type='submit'
                        className='bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-400'
                        value="Sign Up"
                        />

                    </form>
                </div>
            </div>
        </div>
        </Layout>
    );
}