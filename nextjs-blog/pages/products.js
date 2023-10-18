import { useQuery } from "@apollo/client"
import Layout from "../components/layout"
import { GET_PRODUCTS } from "../gql/queries"
import Product from "../components/product";
import Link from "next/link";


export default function Products() {
  const{data,loading}=useQuery(GET_PRODUCTS);
  if(loading)return 'Loading';
  console.log(data)
  return (
    <div>
      <Layout>
      <h1 className="text-2xl text-gray-800 font-light text-center">Products</h1>
          <Link legacyBehavior href="/addproduct">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white hover:bg-gray-800 mb-3 rounded uppercase font-bold text-sm">
            Add Product
          </a>
          </Link>
      <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-gray-800">
            <tr className="text-white">
              <th className="w-1/6 py-3 ">Name</th>
              <th className="w-1/6 py-2">Existence</th>
              <th className="w-1/6 py-2">Price</th>
              <th className="w-1/6 py-2">Since</th>
              <th className="w-1/6 py-2">Delete</th>
              <th className="w-1/6 py-2">Edit</th>
              </tr>
          </thead>
          <tbody className='bg-white'>
             {data.getProducts.map(product=>(
             <Product
             key={product.id}
             product={product}
             />
             ))}
          </tbody>

        </table>
      </Layout>
    </div>
  )
}

  