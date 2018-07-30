export const resolvers = {
  Query: {
    getUpdate: (_, { dog }, { cache }) => {
      const data = {
        dog: {
          id: dog.id,
          breed: dog.breed,
          displayImage: dog.displayImage,
          __typename: 'dog',
        },
      }
      cache.writeDate({ data });
      return null;
    }
  }
}
