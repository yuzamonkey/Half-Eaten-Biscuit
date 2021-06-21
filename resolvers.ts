import { AuthenticationError, IResolvers, UserInputError } from "apollo-server"

require('dotenv')
const bcrypt = require('bcrypt')

const Jobquery = require('./models/jobquery')
const User = require('./models/user')
const Conversation = require('./models/conversation')
const jwt = require('jsonwebtoken')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const JWT_SECRET = process.env.JWT_SECRET

const resolvers: IResolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date scalar (Jusa has done this)",
    parseValue(value: Date) {
      return new Date(value) //value from the client
    },
    serialize(value: Date) {
      return value //value sent to client
    },
    parseLiteral(ast: any) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value) //ast value is always in string format
      }
      return null
    }
  }),
  Query: {
    queryCount: () => Jobquery.collection.countDocuments(),
    allQueries: (root, args) => {
      return Jobquery.find({}).populate('user')
    },
    allUsers: (root, args) => {
      return User.find({}).populate('jobQueries')
    },
    findQueries: (root, args) => {
      return Jobquery.find({ content: args.content }).populate('user')
    },
    findUser: (root, args) => {
      console.log("ID", args.id)
      return User.findOne({ _id: args.id })
        .populate('jobQueries')
        .populate('conversations')
    },
    allConversations: (root, args) => {
      return Conversation.find({}).populate('users')
    },
    findConversation: (root, args) => {
      return Conversation.findOne({ _id: args.id })
        .populate('users')
        .populate({
          path: 'messages',
          populate: { path: 'sender' }
        })
    },
    me: (root, args, context) => {
      //return context.currentUser
      return User.findOne({ _id: context.currentUser._id })
        .populate('jobQueries')
        .populate('conversations')
    },
  },
  User: {
    conversations: async (root) => {
      const conversationIds = root.conversations.map((c): any => c._id)
      const conversations = await Conversation.find({
        _id: { $in: conversationIds }
      }).populate('users')
      return conversations
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const username = args.username

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      const user = new User({
        username: username,
        passwordHash: passwordHash
      })
      console.log(`NEW not saved USER: ${user}`)

      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
        console.log("WRONG CREDENTIALS")
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },

    createQuery: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const content = args.content
      const date = new Date()
      const userId = currentUser.id
      console.log("USER ID IN CREATE QUERY RESOLVER", userId)

      const newQuery = new Jobquery({
        content: content,
        date: date,
        user: userId
      })

      console.log(`NEW JOBQUERY: ${newQuery}`)

      try {
        const savedQuery = await newQuery.save()
        currentUser.jobQueries = currentUser.jobQueries.concat(newQuery)
        await currentUser.save()
        return savedQuery
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createConversation: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const currentUserId = currentUser.id
      const receiverId = args.receiverId
      const currentUserName = currentUser.username
      const receiver = await User.findOne({ _id: receiverId })

      console.log("sender", currentUserName, currentUserId)
      console.log("receiver", receiver, receiverId)

      const newConversation = new Conversation({
        users: [currentUser.id, receiverId]
      })

      try {
        const savedConversation = await newConversation.save()
        console.log("SAVED CONVERSATION SUCCESS, ", savedConversation)
        currentUser.conversations = currentUser.conversations.concat(newConversation)
        const savedUser = await currentUser.save()
        receiver.conversations = receiver.conversations.concat(newConversation)
        const savedReceiver = await receiver.save()
        return savedConversation
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    sendMessage: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const content = args.body
      const date = new Date()
      const userId = currentUser.id
      const conversationId = args.conversationId

      try {

        const newMessage = {
          body: content,
          sender: userId
        }

        const conversation = await Conversation.findOne({ _id: conversationId })
        conversation.messages = conversation.messages.concat(newMessage)

        await conversation.save()
        console.log("CONVERSATION MESSAGES NOW", conversation.messages)
        return conversation
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    }

  }
}

module.exports = resolvers