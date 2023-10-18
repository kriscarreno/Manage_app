import React,{useEffect, useState,useContext} from 'react';
import Select from 'react-select'
import {useQuery} from '@apollo/client'
import { CLIENTS_BY_SELLER } from '../../gql/queries';
import OrderContext from '../../context/orders/OrderContext';

const addClient = () => {
    const [client,setClient]=useState([]);
    
    const orderContext=useContext(OrderContext);
    const {addClient}=orderContext;

    const {data,loading,error}=useQuery(CLIENTS_BY_SELLER)
    useEffect(()=>{
        addClient(client);
    },[client])

    const selectClient=clients=>{
        setClient(clients)
    }

    if(loading)return null;
    const{getClientsBySeller}=data;
    return (  
        <>
        <p className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 text-sm font-bold p-2'>1.- Select Client</p>
        <Select
        className='mt-3'
        options={getClientsBySeller}
        onChange={option=>selectClient(option)}
        getOptionValue={(opciones)=>opciones.id}
        getOptionLabel={opciones=>opciones.name}
        placeholder='Select Client'
        />
        </>
    );
}
 
export default addClient;