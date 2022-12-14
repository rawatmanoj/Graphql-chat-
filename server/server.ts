import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import fs from "fs";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from "ws";
import { useServer } from 'graphql-ws/lib/use/ws';
import resolvers from './src/graphql/resolvers/index';
import connectWithDb from './src/config/db';
import path from "path"
require("./src/Models/Users")
require('dotenv').config()
const typeDefs = fs.readFileSync('./src/graphql/typedefs/schema.graphql', { encoding: 'utf8' });

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);
app.use(express.static('static'))
// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);



// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  cache: "bounded",
  context:(res:any,req:any)=>{},
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

//connect db
// app.get('*',(res:any,req)=>{
// 	res.send(path.join(__dirname,'../static/index.html'))
// })

app.get('*', (req, res) => {
  res.send("<center><p><b>Welcome!</b></p></center>");
});

connectWithDb()

 server.start().then(()=>{
    server.applyMiddleware({ app });

    const PORT = 1337;
    // Now that our HTTP server is fully set up, we can listen to it.
    httpServer.listen(PORT, () => {
      console.log(
        `Server is now running`,
      );
    });
 });
