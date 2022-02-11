import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground
 } from 'apollo-server-core';
import express from 'express';
import http from 'http';

// loading module index
import schema from './module/index.js'

// loading context erors
import context from './helpers/context.js'


import { GraphQLUpload ,graphqlUploadExpress} from 'graphql-upload'
import jwt from 'jsonwebtoken'

;(async function startApolloServer() {
  const app = express();
  
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))

  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    introspection :true,
    context,
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise(resolve => httpServer.listen({ port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
})()
