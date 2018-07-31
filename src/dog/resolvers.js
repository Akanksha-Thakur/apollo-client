export const resolvers = {
  Query: {
    getUpdate: (_, { dog }, { cache }) => {
      const dog = {
        dog: {
          id: dog.id,
          breed: dog.breed,
          displayImage: dog.displayImage,
          __typename: 'dog',
        },
      }
      cache.writeDate({ dog });
      return dog;
    }
  }
}
