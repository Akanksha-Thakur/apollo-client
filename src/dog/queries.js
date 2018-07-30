import gql from "graphql-tag";

const getUpdate = gql`
  query {
    getUpdate @client {
      dog(breed: "bulldog") @client{
        id
        breed
        displayImage
      }
    }
  }
`
const GET_DOG = gql`
  query {
    dog(breed: "bulldog") {
      id
      breed
      displayImage
    }
  }
`
export { getUpdate, GET_DOG };
