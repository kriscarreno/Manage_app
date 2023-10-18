const User=require('../models/User');
const Product=require('../models/Product');
const Client=require('../models/Client');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Order = require('../models/Order');
require('dotenv').config({path: 'variables.env'});

const createToken=(user,secret,expiresIn)=>{
    const{id,email,name,lastName}=user
    return jwt.sign({id,email,name,lastName},secret,{expiresIn});
}


//Resolvers
const resolvers={
    Query:{
        // User Queries
        getUser:async(_,{},{user})=>{
           return user;
        },
        // Product Queries
        getProducts:async()=>{
            try{
                const products=await Product.find();
                return products;
            }catch(err){
                console.log(err);
            }
        },
        getProduct:async(_,{id})=>{
            try{
                const product=await Product.findById(id);
                if(!product){
                    throw new Error('Product not Found');
                }
                return product;

            }catch(err){
                console.error(err);
            }
        },
        // Client Queries
        getClients:async()=>{
            try{
              const clients=await Client.find();
              return clients;
            }catch(err){
                console.log(err);
            }
        },
        getClientsBySeller:async(_,{},{user})=>{
           try{
              const clientsBySeller=await Client.find({seller:user.id.toString()});
              return clientsBySeller;
           }catch(err){

           }
        },
        getClient:async(_,{id},{user})=>{
            try{
              const client=await Client.findById(id);
              if(!client){
                throw new Error('Client not found');
              }
              if(client.seller.toString()!==user.id){
                throw new Error ('Not permission');
              }
              return client;
            }catch(err){
              console.log(err);
            }
        },
        // Order Queries
        getOrders:async()=>{
          try{
            const orders=await Order.find();
            return orders;
          } catch(err){
            console.log(err);
          }
        },
        getOrdersBySeller:async(_,{},{user})=>{
            try{
                const orders=await Order.find({seller:user.id}).populate('client');
                return orders;
              } catch(err){
                console.log(err);
              }
        },
        getOrderByStatus:async(_,{status},{user})=>{
            const orders=await Order.find({seller:user.id,status});
            return orders;
        },
        // Busquedas avanzadas
        getTopClients:async()=>{
            const clients=await Order.aggregate([
                {$match:{status:"COMPLETED"}},
                {$group:{
                    _id:"$client",
                    total:{$sum:'$total'}
                }},
                {
                    $lookup:{
                        from:"clients",
                        localField:'_id',
                        foreignField:'_id',
                        as:'client'
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort:{total:-1}
                }

            ]);
            return clients;
        },
        getTopSellers:async()=>{
            const sellers=await Order.aggregate([
                {$match:{status:"COMPLETED"}},
                {$group:{
                    _id:"$seller",
                    total:{$sum:'$total'}
                }},
                {
                    $lookup:{
                        from:"users",
                        localField:'_id',
                        foreignField:'_id',
                        as:'seller'
                    }
                },
                {
                    $limit: 3
                },
                {
                    $sort:{total:-1}
                }

            ]);
            return sellers;
        },
        findProduct:async(_,{text})=>{
            const products=await Product.find({$text:{$search:text}}).limit(10);
            return products;
        } 
    },
    Mutation:{
        // User Mutations
        createUser:async (_,{name,lastName,email,password})=>{
            const user=await User.findOne({email});
            if(user){
                throw new Error('User already exists');
            }
            
            const salt =await bcryptjs.genSalt(10);
            password=await bcryptjs.hash(password,salt);

            try{
                const user=new User({
                    name , lastName, email, password
                });
                user.save();
                return user;
            }catch(err){
                console.error(err);
            }
        },
        authUser:async (_,{email,password})=>{
           const user=await User.findOne({email});
           if(!user){
            throw new Error('User doesn`t exists');
           }
           //Check password
           const passwordCorrect=await bcryptjs.compare(password,user.password);
           if(!passwordCorrect){
            throw new Error('Incorrect password');
           }
           //Create Token
           return {
            token:createToken(user,process.env.SECRET,'4h')
           }
        },
        // Product Mutations
        createProduct:async(_,{name,existence,price})=>{
            try{
              const newProduct=new Product({name,existence,price});
              const result=await newProduct.save();
              return result;
            }catch(err){
                console.log(err);
            }
        },
        updateProduct:async(_,{id,name,existence,price})=>{
            let product=await Product.findById(id);
            if(!product){
                throw new Error('Product not found');
            }
            product=await Product.findOneAndUpdate(
                {_id:id},
                {name,existence,price},
                {new:true}
                );
                return product;
        },
        deleteProduct:async(_,{id})=>{
            let product=await Product.findById(id);
            if(!product){
                throw new Error("Product not found");
            }
            await Product.findOneAndDelete({_id:id});
            return "Deleted Product"
        },
        // Client Mutations
        createClient:async(_,{name,lastName,email,company,phoneNumber},{user})=>{
            const client=await Client.findOne({email});
            if(client){
                throw new Error('Client already registered');
            }
            const newClient=new Client({
                name, 
                lastName,
                email,
                company,
                phoneNumber,
            });
            newClient.seller=user.id;
            const result=await newClient.save();
            return result;
        },
        updateClient:async(_,{id,name,lastName,email,company,phoneNumber},{user})=>{
            let client=await Client.findById(id);
            if(!client){
                throw new Error('Client not found');
            }
            if(client.seller.toString()!==user.id){
                throw new Error('Not permission');
            }
            client=await Client.findOneAndUpdate(
                {_id:id},
                {name,lastName,email,company,phoneNumber},
                {new:true}
            );
            return client;
        },
        deleteClient:async (_,{id},{user})=>{
            let client= await Client.findById(id);
            if(!client){
                throw new Error('Client not found');
            }
            if(client.seller.toString()!==user.id){
                throw new Error('Not permission');
            }
            await Client.findOneAndDelete({_id:id});
            return "Client deleted";
        },
        // Order Mutations
        newOrder:async(_,{input},{user})=>{
            const client=await Client.findById(input.client);
            if(!client){
                throw new Error('Client not found');
            }
            if(client.seller.toString()!==user.id){
                throw new Error('Not permission');
            }
            for await(const element of input.order){
                const {id}=element;
                const product=await Product.findById(id);
                if(element.total>product.existence){
                    throw new Error(`The required quantity of: ${product.name} is more than existence`)
                }else{
                    product.existence=product.existence-element.total
                    await product.save();
                }
            };
            const newOrder=new Order(input);

            newOrder.seller=user.id;

            const result=await newOrder.save();

            return newOrder;

        },
        updateOrder:async(_,{id,input},{user})=>{
             const order=await Order.findById(id);
             if(!order){
                throw new Error('Order doesn`t exists');
             }
             const client=await Client.findById(input.client);
             if(!client){
                throw new Error('Client doesn`t exists');
             }

             if(client.seller.toString()!==user.id){
                throw new Error('Not permission');
            }
            //Segun el profe del curso la idea esencial es q solo se pueda modificar
            //el estado por lo tanto esto nunca pasaria
            if(input.order){
                for await(const element of input.order){
                    const {id}=element;
                    const product=await Product.findById(id);
                    if(element.total>product.existence){
                        throw new Error(`The required quantity of: ${product.name} is more than existence`)
                    }else{
                        product.existence=product.existence-element.total
                        await product.save();
                    }
                };
            }
            const result=await Order.findOneAndUpdate(
                {_id:id},
                input,
                {new:true}
            );
            return result;
        },
        deleteOrder:async(_,{id},{user})=>{
            const order=await Order.findById(id);
            if(!order){
                throw  new Error('Order doesn`t exist');
            }
            if(order.seller.toString()!== user.id){
                throw  new Error('No Permissions');
            }
            for await(const element of order.order){
                const {id}=element;
                const product=await Product.findById(id);
                if(product){
                    product.existence+=element.total;
                }
                await product.save();
            };
            await Order .findOneAndDelete({_id:id});
            return "Order deleted";
        }
    }
}

module.exports=resolvers