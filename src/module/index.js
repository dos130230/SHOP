import { makeExecutableSchema } from '@graphql-tools/schema'
import categoryModule from './categories/index.js'
import productModule from './products/index.js'
import orderModule from './orders/index.js'
import authModule from './auth/index.js'
import statisticModule from './statistics/index.js'
import typeModule from './types/index.js'

export default makeExecutableSchema({
  typeDefs : [
    categoryModule.typeDefs,
    productModule.typeDefs,
    orderModule.typeDefs,
    authModule.typeDefs,
    statisticModule.typeDefs,
    typeModule.typeDefs
  ],
  resolvers : [
    categoryModule.resolvers,
    productModule.resolvers,
    orderModule.resolvers,
    authModule.resolvers,
    statisticModule.resolvers,
    typeModule.resolvers
  ]
})