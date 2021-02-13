import {GraphQLServer} from 'graphql-yoga';

// Type Definitions (Schemas)
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        },
        name() {
            return 'faisal'
        },
        location() {
            return 'Islamabad'
        },
        bio() {
            return 'Software Engineer'
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() => {
    console.log("Server is up");
})
