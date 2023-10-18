import React,{ useReducer} from "react";
import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";

import {
    SELECT_CLIENT,
    CANT_PRODUCT,
    SELECT_PRODUCT,
    ACT_TOTAL
} from '../../types'

const OrderState=({children})=>{
    
    const initialState={
        client:{},
        products:[],
        total:0
    }

    const[state,dispatch]=useReducer(OrderReducer,initialState);

    const addClient=client=>{
        console.log(client)
        dispatch({
            type:SELECT_CLIENT,
            payload:client
        })
    }

    const addProduct=productsSelect=>{
       
       let newState;
       if(state.products.length>0){
         newState=productsSelect.map(product=>{
            const newObj=state.products.find(productState=>productState.id===product.id);
            return{...product,...newObj}
         })
       }else{
        newState=productsSelect;
       }
       dispatch({
        type:SELECT_PRODUCT,
        payload: newState
       })
    }

    const cantProducts=newProduct=>{
        dispatch({
            type:CANT_PRODUCT,
            payload:newProduct
        })
    }

    const actTotal=()=>{
         dispatch({
            type:ACT_TOTAL
         })
    }
    
    return(
       <OrderContext.Provider
       value={{
        products:state.products,
        total:state.total,
        client:state.client,
        addClient,
        addProduct,
        cantProducts,
        actTotal
       }}
       >
          {children}
       </OrderContext.Provider>
    )
}

export default OrderState;