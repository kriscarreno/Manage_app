import {
    SELECT_CLIENT,
    CANT_PRODUCT,
    SELECT_PRODUCT,
    ACT_TOTAL
} from '../../types'

export default (state,action)=>{
    switch(action.type){
        case SELECT_CLIENT:
            return{
                ...state,
                client:action.payload
            }
        case SELECT_PRODUCT:
            return{
                ...state,
                products:action.payload
            }
        case CANT_PRODUCT:
            return{
               ...state,
                products:state.products.map(product=>product.id===action.payload.id ? product=action.payload:product)
            }
        case ACT_TOTAL:
            return{
                ...state,
                total:state.products.reduce((newTotal,product)=>newTotal+=product.price*product.total,0)
            }
        default:
            return state
    }
}