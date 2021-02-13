import {GraphQLServer} from 'graphql-yoga';

// Type Definitions (Schemas)
const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(num1: Float!, num2: Float!): Float!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID
        title: String!
        body: String!
        published: Boolean!
    }
`

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            return args.name ? `Hello ${args.name}!` : `Hello!`
        } ,
        add(parent, args, ctx, info) {
            return args.num1 + args.num2
        },
        me() {
            return {
                id: '123',
                email: 'faisal@abc.com',
                name: 'faisal',
                age: 25
            }
        },
        post() {
            return {
                id: "123",
                title: "My Post",
                body: "Post Body",
                published: true
            }
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() => {
    console.log("Server is up");
})
