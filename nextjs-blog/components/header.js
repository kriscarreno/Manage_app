import React from 'react'
import {useQuery} from '@apollo/client'
import { GET_USER } from '../gql/queries'
import { useRouter } from 'next/router'

const Header=()=>{
    const router=useRouter();
    const {data,loading,error}=useQuery(GET_USER);
    if(loading)return null;
    if(!data){
        return router.push('/login');
    }
    const signOut=()=>{
        localStorage.removeItem('token');
        router.push('/login');
    }
    return (
        <div className='sm:flex sm:justify-between'>
            <p className='mr-2 mb-6'>Hola {data.getUser.name} {data.getUser.lastName}</p>

             <button
              onClick={()=>signOut()}
              className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md hover:bg-blue-400'
              type='button'
              >
                Sign out
             </button>
        </div>
    )
}

export default Header;