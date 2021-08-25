export interface IMessage {
  _id: Object
  body: String
  sender: IUser
}

export interface IConversation {
  _id: Object
  users: [IUser]
  messages: [IMessage]
}

export interface IJobAd {
  _id: Object
  content: String
  date: Date
  user: IUser
}

export interface IUser {
  _id: Object
  username: String
  passwordHash: String
  jobAds: [IJobAd]
  conversations: [IConversation]
  profile: UserProfile
}

export interface UserProfile {
  _id: Object
  
}

export interface IToken {
  value: String
}