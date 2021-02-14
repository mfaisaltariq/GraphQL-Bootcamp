import {GraphQLServer} from 'graphql-yoga';
import db from '../../data.json'

// Type Definitions (Schemas)
// type Query {
//     greeting(name: String): String!
//     grades: [Int!]!
//     add(numbers: [Float!]!): Float!
//     me: User!
//     post: Post!
// }

const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
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
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) return db.users;

            return db.users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase());
            });
        },
        posts(parent, args, ctx, info) {
            if (!args.query) return db.posts;

            return db.posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            })
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


        // greeting(parent, args, ctx, info) {
        //     return args.name ? `Hello ${args.name}!` : `Hello!`
        // } ,
        // grades() {
        //     return [98, 90, 91]
        // },
        // add(parent, args, ctx, info) {
        //     if (args.numbers.length === 0) return 0;
            
        //     return args.numbers.reduce((accumulator, currentValue) => {
        //         return accumulator + currentValue;
        //     });
        // },
    },
    Post: {
        author(parent, args, ctx, info) {
            console.log(parent);
            return db.users.find((user) => {
                return user.id === parent.author
            })
        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers});

server.start(() => {
    console.log("Server is up");
})
