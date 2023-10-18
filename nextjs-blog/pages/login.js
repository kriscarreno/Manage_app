import React,{useState} from 'react'
import Layout from '../components/layout';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useMutation} from '@apollo/client';
import { AUTH_USER } from '../gql/queries';
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function Login( ){
    const router=useRouter();
    const[mensaje,guardarMensaje]=useState(null);
    const[authUser]=useMutation(AUTH_USER);
    const formik=useFormik({
        initialValues:{
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            email:Yup.string().email('Email must be valid').required('Email is required'),
            password:Yup.string().required('Password is required')
        }),
        onSubmit:async values=>{
            try{
                const{data}=await authUser({
                    variables:{
                        email:values.email,
                        password:values.password
                    }
                });
                guardarMensaje('Autenticando...')
                setTimeout(()=>{
                    guardarMensaje(null)
                    router.push('/');
                },2000)
                const {token}=data.authUser;
                localStorage.setItem('token',token);
                
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

    return(
        <Layout>
        <div>
        {mensaje && showError()}
            <h1 className="text-center text-2xl text-white font-light">Login</h1><br/>

            <div className='flex justify-center mt-5'>
                <div className='w-full max-w-sm'>
                    <form 
                    onSubmit={formik.handleSubmit}
                    className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
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
                        value="Login"
                        />

                    </form>
                    <Link legacyBehavior href={"/createUser"}>
                    <a className='text-center font-bold text-white mt-5'>You don`t have a account yet? Sign Up</a>
                </Link>
            </div>
                </div>
                
        </div>
        </Layout>
    );
}