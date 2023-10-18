import React, { useEffect } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Layout from '../components/layout';
import { useQuery } from '@apollo/client';
import { TOP_SELLER } from '../gql/queries';

  

const BestSeller = () => {
    const {data,loading,error,startPolling,stopPolling}=useQuery(TOP_SELLER);

    useEffect(()=>{
       startPolling(1000);
       return()=>{
        stopPolling();
       }
    },[startPolling,stopPolling])
    if(loading){
        return <div>Loading...</div>;
    }
    const {getTopSellers}=data;

    const graphic=[]

    getTopSellers.map((seller,index)=>{
        graphic[index]={
            ...seller.seller[0],
            total:seller.total
        }
    })
    console.log(graphic)

    return (  
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light text-center">Best Seller</h1>

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

        </Layout>
    );
}
 
export default BestSeller;