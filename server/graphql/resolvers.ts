import { AuthenticationError, IResolvers, UserInputError, PubSub } from "apollo-server"
import { IConversation } from "../types/types"

require('dotenv')
const bcrypt = require('bcrypt')

//const MaterializedCategory = require('../models/materializedCategory')
//const ParentCategory = require('../models/parentCategory')

const Category = require('../models/category')
const Jobquery = require('../models/jobquery')
const User = require('../models/user')
const Conversation = require('../models/conversation')
const Group = require('../models/group')
const UserProfile = require('../models/userProfile')

const jwt = require('jsonwebtoken')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const JWT_SECRET = process.env.JWT_SECRET

const pubsub = new PubSub()

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
    me: (_root, _args, context) => {
      //return context.currentUser
      return User.findOne({ _id: context.currentUser._id })
      .populate('jobQueries conversations groups profile')
      .populate({
        path: 'profile',
        populate: {
          path: 'skills',
        }
      })
    },
    allUsers: () => {
      return User.find({})
      .populate('jobQueries conversations groups profile')
      .populate({
        path: 'profile',
        populate: {
          path: 'skills',
        }
      })
    },
    findUser: (_root, args) => {
      console.log("ID", args.id)
      return User.findOne({ _id: args.id })
      .populate('jobQueries conversations groups profile')
      .populate({
        path: 'profile',
        populate: {
          path: 'skills',
        }
      })
    },
    allUserProfiles: (_root) => {
      return UserProfile.find({}).populate('user skills')
    },
    findUserOrGroup: async (_root, args) => {
      const user = await User.findOne({ _id: args.id })
      .populate('jobQueries conversations groups profile')
      .populate({
        path: 'profile',
        populate: {
          path: 'skills',
        }
      })
      const group = await Group.findOne({ _id: args.id }).populate('users')
      return user || group
    },
    allGroups: () => {
      return Group.find({}).populate('users')
    },
    findGroup: (_root, args) => {
      return Group.findOne({ _id: args.id }).populate('users')
    },
    allConversations: () => {
      return Conversation.find({}).populate('users')
    },
    findConversation: (_root, args) => {
      return Conversation.findOne({ _id: args.id })
      .populate('users')
      .populate({
        path: 'messages',
        populate: { path: 'sender' }
      })
    },
    allJobqueries: () => {
      return Jobquery.find({}).populate('user')
    },
    findJobqueries: (_root, args) => {
      return Jobquery.find({ content: args.content }).populate('user')
    },
    allCategories: () => {
      return Category.find({}).populate('parent children')
    },
  },
  User: {
    conversations: async (root) => {
      const conversationIds = root.conversations.map((c: IConversation) => c._id)
      const conversations = await Conversation.find({
        _id: { $in: conversationIds }
      }).populate('users')
      return conversations
    },
  },
  UserOrGroup: {
    __resolveType(obj: { username: any; users: any }, _context: any, _info: any) {
      if (obj.username) return 'User'
      if (obj.users) return 'Group'
      return null;
    }
  },
  Mutation: {
    addCategory: async (_root, args) => {
      const name = args.name
      const parentName = args.parent

      console.log("NAME", name, "PARENT", parentName)

      try {
        const parent = await Category.findOne({ name: parentName })
        const newCategory = new Category({
          name: name,
          parent: parent?._id,
          children: []
        })
        const savedCategory = await newCategory.save()
        if (parent) {
          parent.children = parent.children.concat(savedCategory._id)
          await parent.save()
        }
        return savedCategory

      } catch (error) {
        console.log("ERROR ON ADD CATEGORY")
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUser: async (_root, args) => {
      const username = args.username

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)

      try {
        const userProfile = new UserProfile()
        const savedProfile = await userProfile.save()
        const user = new User({
          username: username,
          passwordHash: passwordHash,
          profile: savedProfile
        })
        const savedUser = await user.save()
        savedProfile.user = savedUser
        await savedProfile.save()
        return savedUser
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    login: async (_root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || await bcrypt.compare(args.password, user.passwordHash) === false) {
        console.log("WRONG CREDENTIALS")
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET), id: user._id }
    },

    createJobquery: async (_root, args, context) => {
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

    createConversation: async (_root, args, context) => {
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
        await currentUser.save()
        receiver.conversations = receiver.conversations.concat(newConversation)
        await receiver.save()
        return savedConversation
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createGroup: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const name = args.name
      console.log("•••NAME", name)
      const userIds = args.users.concat(String(currentUser._id))
      console.log(typeof (currentUser.id))
      console.log("•••IDS", userIds)

      try {
        const newGroup = new Group({
          name: name,
          users: userIds
        })

        console.log("NEW GROUP", newGroup)
        const savedGroup = await newGroup.save()
        await userIds.forEach(async (id: String) => {
          const user = await User.findOne({ _id: id })
          user.groups = user.groups.concat(savedGroup)
          await user.save()
        });
        return savedGroup
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    createUserProfile: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const myId = currentUser.id
      const skills = args.skills
      const about = args.about
      const image = args.image

      console.log("SKILLS ••• ", skills)
      console.log("ABOUT ••• ", about)
      console.log("IMAGE ••• ", image)

      try {
        const newUserProfile = new UserProfile({
          user: myId,
          about: about,
          skills: skills,
          image: image
        })
        const savedUserProfile = await newUserProfile.save()
        currentUser.profile = savedUserProfile
        currentUser.save()
        return savedUserProfile
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    editUserProfile: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const about = args.about
      console.log("ABOUT", about)
      try {
        if (currentUser.profile) {
          const profile = await UserProfile.findOne({ _id: currentUser.profile })
          console.log("FOUND PROFILE", profile)
          profile.about = about
          const savedProfile = await profile.save()
          return savedProfile
        } else {
          console.log("CREATE NEW PROFILE")
          const newProfile = new UserProfile({
            user: currentUser,
            about: about
          })
          const savedProfile = await newProfile.save()
          currentUser.profile = savedProfile
          await currentUser.save()
          return savedProfile
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },

    sendMessage: async (_root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        console.log(`Not authenticated user`)
        throw new AuthenticationError("not authenticated")
      }

      const content = args.body
      //const date = new Date()
      const userId = currentUser.id
      const conversationId = args.conversationId

      try {
        const newMessage = {
          body: content,
          sender: userId
        }

        const conversation = await Conversation.findOne({ _id: conversationId })
        conversation.messages = conversation.messages.concat(newMessage)
        const messageWithId = conversation.messages[conversation.messages.length - 1]
        await conversation.save()
        pubsub.publish('MESSAGE_ADDED', { messageAdded: messageWithId })
        return messageWithId
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  },

  Subscription: {
    messageAdded: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED'])
    }
  }
}

module.exports = resolvers