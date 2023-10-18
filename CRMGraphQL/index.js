const {ApolloServer}=require('apollo-server')
const typeDefs=require('./db/schema')
const resolvers=require('./db/resolvers')
const jwt=require('jsonwebtoken')
require("dotenv").config({path:'variable.env'})
const connectDB=require('./config/db')
connectDB()


//servidor
const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        const token=req.headers['authorization'] || '';
        if(token){
            try{
               const user=jwt.verify(token,process.env.SECRET);
               return {user}
            }catch(err){
                 console.log(err);
            }
        }
    }
});


//arrancar el server
server.listen().then(({url})=>{
    console.log(`Server ready at ${url}`)
})
//algo que hice

//test rebase
//second test rebase
