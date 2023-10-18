const {gql}=require('apollo-server')

//Schema
const typeDefs=gql`
  type User{
    id:ID
    name:String!
    lastName:String!
    email:String!
    createdDate:String
  }
  type Product{
    id:ID
    name:String!
    existence:Int!
    price:Float!
    createdDate:String
  }
  type Token{
    token:String
  }
  type Client{
    id:ID
    name:String!
    lastName:String!
    company:String!
    email:String!
    phoneNumber:String
    seller:ID!
  }
  type Order{
    id:ID!
    order:[GroupOrder]
    total:Float
    client:Client
    seller:ID
    createdDate:String
    status:StatusOrder
  }
  type GroupOrder{
    id:ID
    total:Int
    name:String
    price:Float
  }
  type TopClient{
    total:Float
    client:[Client]
  }
  type TopSeller{
    total: Float
    seller:[User]
  }
  input OrderProductInput{
    id:ID
    total:Int
    name:String
    price:Float
  }
  input OrderInput{
    order:[OrderProductInput]
    total:Float
    client:ID
    status:StatusOrder
  }
  enum StatusOrder{
    PENDING
    COMPLETED
    CANCELED
  }
  type Mutation{
    # User Mutations
    createUser(name:String!,lastName:String!,email:String!,password:String!):User
    authUser(email:String!,password:String!):Token
    # Product Mutations
    createProduct(name:String!,existence:Int!,price:Float!):Product
    updateProduct(id:ID!,name:String!,existence:Int!,price:Float!):Product
    deleteProduct(id:ID!):String
    # Client Mutations
    createClient(name:String!,lastName:String!,email:String!,company:String!,phoneNumber:String):Client
    updateClient(id:ID!,name:String!,lastName:String!,email:String!,company:String!,phoneNumber:String):Client
    deleteClient(id:ID!):String
    # Order Mutations
    newOrder(input:OrderInput):Order
    updateOrder(id:ID!,input:OrderInput):Order
    deleteOrder(id:ID!):String
  }

  type Query{
    # User Queries
    getUser:User
    # Product Queries
    getProducts:[Product]
    getProduct(id:ID!):Product
    # Client Queries
    getClients:[Client]
    getClientsBySeller:[Client]
    getClient(id:ID!):Client
    # Order Queries
    getOrders:[Order]
    getOrdersBySeller:[Order]
    getOrderByStatus(status:String!):[Order]
    # Busquedas avanzadas
    getTopClients:[TopClient]
    getTopSellers:[TopSeller]
    findProduct(text:String!):[Product]
  }
`
module.exports=typeDefs;