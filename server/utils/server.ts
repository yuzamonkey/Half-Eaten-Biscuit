import express from 'express';
import { createConfig } from './apolloConfig';

const http = require('http')
const app = express()
const { ApolloServer } = require('apollo-server-express')

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb'}));

const frontendRoutes = [
  '/',
  '/signin',
  '/signup',
  '/messages',
  '/messages/:id',
  '/jobmarket/queries/:id',
  '/jobmarket/queries',
  '/jobmarket/sendquery',
  '/jobmarket/myqueries',
  '/profiles',
  '/profiles/:id',
  '/settings',
  '/creategroup',
  '/createprofile',
  '/:invalidroute'
]

frontendRoutes.forEach(route => app.use(route, express.static("public")))

app.get('/health', (_req, res) => {
  res.send('bueno')
})

app.get('/version', (_req, res) => {
  res.send('0.0.3')
})

app.get('/log', (_req, res) => {
  const log = [
    '2021/06/25 14.36 add backend testing to pipeline (15.16 does not work, connecting to undefined. Cause?: GitHub Actions does not recognise envvar)',
    '2021/06/25 15.08 tsCompiler: ES2020 -> ES2019',
    '2021/08/15 19.38 lots of new components',
    '2021/08/17 13.10 add css to registration pages',
    '2021/08/17 hh.mm filesizelimit',
  ]
  res.send(log)
})

const server = new ApolloServer(createConfig())
// server.listen({ port: process.env.PORT || 4000 }).then(({ url, subscriptionsUrl }: any) => {
//   console.log(`Server ready at ${url}`)
//   console.log(`Subscriptions ready at ${subscriptionsUrl}`)
// })

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

