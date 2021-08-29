import { createContext } from "react"

export type UserContextType = {
  token: string | null,
  setToken: (c: string) => void,
  sessionId: string | null,
  setSessionId: (c: string) => void,
  userAndGroupIds: string[] | null, 
  setUserAndGroupIds: (a: string[]) => void
}

export const UserContext = createContext<UserContextType>({ 
  token: null, 
  setToken: () => {},
  sessionId: null, 
  setSessionId: () => {},
  userAndGroupIds: null,
  setUserAndGroupIds: () => {}
})
