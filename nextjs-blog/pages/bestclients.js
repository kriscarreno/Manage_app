import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Layout from '../components/layout';
import { useQuery } from '@apollo/client';
import { TOP_CLIENTS} from '../gql/queries';

  

const BestClients = () => {
    const {data,loading,error,startPolling,stopPolling}=useQuery(TOP_CLIENTS);

    useEffect(()=>{
       startPolling(1000);
       return()=>{
        stopPolling();
       }
    },[startPolling,stopPolling])
    if(loading){
        return <div>Loading...</div>;
    }
    const {getTopClients}=data;

    const graphic=[]

    getTopClients.map((client,index)=>{
        graphic[index]={
            ...client.client[0],
            total:client.total
        }
    })
    console.log(graphic)

    return (  
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light text-center">Best Clients</h1>
            <ResponsiveContainer
            width={'99%'}
            height={550}
            >
            <BarChart
            className='mt-10 '
          width={600}
          height={500}
          data={graphic}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#3182ce" />
        </BarChart>
        </ResponsiveContainer>

        </Layout>
    );
}
 
export default BestClients;