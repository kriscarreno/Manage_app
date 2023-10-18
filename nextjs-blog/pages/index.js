import Layout from "../components/layout"
import { useQuery } from "@apollo/client"
import { CLIENTS_BY_SELLER } from "../gql/queries"
import { useRouter } from "next/router";
import Link from "next/link";
import React,{useState} from 'react'
import Client from "../components/client";

export default function Home() {
  const router=useRouter();
  const[mensaje,guardarMensaje]=useState(null);
  const {data,loading,error}= useQuery(CLIENTS_BY_SELLER);
  if(loading)return "Cargando...";
  else if(!data){
    return router.push('/login');
  }
  const {getClientsBySeller}=data;
  const showError=()=>{
    return(
        <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
            <p>{mensaje}</p>
        </div>
    )
}

  return (
    <div>
      <Layout>
      {mensaje && showError()}
        <h1 className="text-2xl text-gray-800 font-light text-center">Clientes</h1>
        <Link legacyBehavior href="/createclient">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-blue-400 w-full lg:w-auto text-center">Add Client</a>
          </Link><br/>
           {!loading ? (
            <div className="overflow-x-scroll">
           <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/5 py-2 ">Name</th>
              <th className="w-1/5 py-2">Company</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Delete</th>
              <th className="w-1/5 py-2">Edit</th>
              </tr>
          </thead>
          <tbody className='bg-white'>
             {getClientsBySeller.map(client=>(
             <Client
             key={client.id}
             client={client}
             />
             ))}
          </tbody>

        </table>
        </div>
        ):('')}
        
      </Layout>
    </div>
  )
}
