import React from 'react'
import Link from'next/link'
import {useRouter} from 'next/router';

const Sidebar=()=>{
     
    //routing
    let router = useRouter();

    return(
        <aside className='bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5'>
            <div>
                <p className='text-white text-2xl font-black'>CRM-Clientes</p>
            </div>
            <nav className='mt-5 list-none'>
                <li className={router.pathname==='/' ? "bg-blue-800 p-3":"p-3"}>
                   <Link legacyBehavior href="/">
                    <a className='text-white mb-2 block'>
                        Clients
                    </a>
                   </Link>
                   </li>
                   <li className={router.pathname==='/orders' ? "bg-blue-800 p-3":"p-3"}>
                   <Link legacyBehavior href="/orders">
                   <a className='text-white mb-2 block'>
                        Orders
                    </a>
                   </Link>
                   </li>
                   <li className={router.pathname==='/products' ? "bg-blue-800 p-3":"p-3"}>
                   <Link legacyBehavior href="/products">
                   <a className='text-white mb-2 block'>
                        Products
                    </a>
                   </Link>
                   </li>
            </nav>
            <div className='sm:mt-10'>
                <p className='text-white text-2xl font-black'>Otras Opciones</p>
            </div>
            <nav className='mt-5 list-none'>
            
                
            <li className={router.pathname==='/bestseller' ? "bg-blue-800 p-3":"p-3"}>
                   <Link legacyBehavior href="/bestseller">
                   <a className='text-white mb-2 block'>
                        Best seller
                    </a>
                   </Link>
                   </li>

                   <li className={router.pathname==='/bestclients' ? "bg-blue-800 p-3":"p-3"}>
                   <Link legacyBehavior href="/bestclients">
                   <a className='text-white mb-2 block'>
                        Best Clients
                    </a>
                   </Link>
                   </li>

            </nav>
        </aside>
    );
};

export default Sidebar;