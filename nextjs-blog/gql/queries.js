import {gql} from "@apollo/client"
//Order Mutations
export const NEW_ORDER=gql`
mutation NewOrder($input: OrderInput) {
  newOrder(input: $input) {
    id
  }
}
`;

export const UPDATE_ORDER=gql`
mutation UpdateOrder($updateOrderId: ID!, $input: OrderInput) {
  updateOrder(id: $updateOrderId, input: $input) {
    status
  }
}
`;

export const DELETE_ORDER=gql`
mutation DeleteOrder($deleteOrderId: ID!) {
  deleteOrder(id: $deleteOrderId)
}
`;
//Order Queries
export const GET_ORDERS=gql`
query GetClientsBySeller {
  getOrdersBySeller {
    id
    client{
      id
      name
      lastName
      phoneNumber
      email
    }
    order {
      id
      name
      price
      total
    }
    status
    total
    createdDate
  }
}
`;
//Products Queries
export const GET_PRODUCTS=gql`
query GetProducts {
  getProducts {
    id
    name
    existence
    price
    createdDate
  }
}
`;
export const GET_PRODUCT=gql`
query GetProduct($getProductId: ID!) {
  getProduct(id: $getProductId) {
    id
    name
    existence
    price
    createdDate
  }
}
`;
//Product Mutations
export const ADD_PRODUCT=gql`
mutation Mutation($name: String!, $existence: Int!, $price: Float!) {
  createProduct(name: $name, existence: $existence, price: $price) {
    id
    name
    existence
    price
    createdDate
  }
}
`;
export const DELETE_PRODUCT=gql`
mutation Mutation($deleteProductId: ID!) {
  deleteProduct(id: $deleteProductId)
}
`;
export const UPDATE_PRODUCT=gql`
mutation UpdateProduct($updateProductId: ID!, $name: String!, $existence: Int!, $price: Float!) {
  updateProduct(id: $updateProductId, name: $name, existence: $existence, price: $price) {
    id
    name
    existence
    price
    createdDate
  }
}
`;
//Clients Mutations
export const DELETE_CLIENT=gql`
mutation DeleteClient($deleteClientId: ID!) {
  deleteClient(id: $deleteClientId)
}
`;
export const UPDATE_CLIENT=gql`
mutation Mutation($updateClientId: ID!, $name: String!, $lastName: String!, $email: String!, $company: String!, $phoneNumber: String) {
  updateClient(id: $updateClientId, name: $name, lastName: $lastName, email: $email, company: $company, phoneNumber: $phoneNumber) {
    id
    name
    lastName
    email
    company
    phoneNumber
  }
}
`;
//Clients Queries
export const TOP_CLIENTS=gql`
query GetTopClients {
  getTopClients {
    total
    client {
      id
      name
      lastName
      email
      company
      phoneNumber
    }
  }
}

`;
export const GET_CLIENT=gql`
query GetClient($getClientId: ID!) {
  getClient(id: $getClientId) {
    id
    name
    lastName
    email
    company
    phoneNumber
  }
}
`;

export const CLIENTS_BY_SELLER=gql`
query GetClientsBySeller {
  getClientsBySeller {
    phoneNumber
    name
    lastName
    id
    email
    company
  }
}
`;
export const CREATE_CLIENT=gql`
mutation CreateClient($name: String!, $lastName: String!, $email: String!, $company: String!, $phoneNumber: String) {
  createClient(name: $name, lastName: $lastName, email: $email, company: $company, phoneNumber: $phoneNumber) {
    id
    name
    lastName
    email
    company
    phoneNumber
  }
}
`
//User Queries
export const GET_USER=gql`
query GetUser {
  getUser {
    id
    name
    lastName
    email
    createdDate
  }
}
`;

export const TOP_SELLER=gql`
query GetTopSellers {
  getTopSellers {
    seller {
      id
      name
      lastName
      email
      createdDate
    }
    total
  }
}

`;
//User Mutations
export const CREATE_USER=gql`
mutation CreateUser($name: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(name: $name, lastName: $lastName, email: $email, password: $password) {
    id
    name
    lastName
    email
    createdDate
  }
}
`;

export const AUTH_USER=gql`
mutation AuthUser($email: String!, $password: String!) {
  authUser(email: $email, password: $password) {
    token
  }
}
`;