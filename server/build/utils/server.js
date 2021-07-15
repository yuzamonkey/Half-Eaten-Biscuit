"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import express from 'express';
const apolloConfig_1 = require("./apolloConfig");
//const app = express()
//const { ApolloServer } = require('apollo-server-express')
const { ApolloServer } = require('apollo-server');
// const frontendRoutes = [
//   '/',
//   '/signin',
//   '/signup',
//   '/messages',
//   '/messages/:id',
//   '/jobmarket/queries',
//   '/jobmarket/sendquery',
//   '/jobmarket/myqueries',
// ]
// frontendRoutes.forEach(route => app.use(route, express.static("public")))
// app.get('/health', (_req, res) => {
//   res.send('bueno')
// })
// app.get('/version', (_req, res) => {
//   res.send('0.0.2')
// })
// app.get('/log', (_req, res) => {
//   const log = [
//     '2021/06/25 14.36 add backend testing to pipeline (15.16 does not work, connecting to undefined. Cause?: GitHub Actions does not recognise envvar)',
//     '2021/06/25 15.08 tsCompiler: ES2020 -> ES2019'
//   ]
//   res.send(log)
// })
const server = new ApolloServer(apolloConfig_1.createConfig());
server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`);
    console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
// server.applyMiddleware({ app });
// const PORT = process.env.PORT || 5000
// app.listen({ port: PORT }, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
//   console.log(`Subscriptions ready at ${server.subscriptionsPath}`)
//   console.log(server.subscriptionsPath)
// })
