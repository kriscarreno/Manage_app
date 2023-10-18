import Layout from "../components/layout";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../gql/queries";
import Order from "../components/order";

export default function Orders() {
   const {data,loading}=useQuery(GET_ORDERS);
   if(loading)return 'Cargando...';
   console.log(data)
   const{getOrdersBySeller}=data

  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
      <Link legacyBehavior href="/neworder">
      <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-blue-400">New Order</a>
      </Link>
       {getOrdersBySeller.length===0?(
          <p className="mt-5 text-center text-2xl">Aun no hay pedidos</p>
       ):(
        getOrdersBySeller.map(order=>(
           <Order
           key={order.id}
           order={order}
           />
        ))
       )}
      </Layout>
    </div>
  )
}

  