import * as admin from "firebase-admin";
import resolvers from "./resolvers/index";
import typeDefs from "./typeDefs/index";
import { ApolloServer } from "apollo-server";
import {config} from 'dotenv';
import { resolve } from 'path';

config({path: resolve(__dirname, '../.env')})
const serviceAccount = require("../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
