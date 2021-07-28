import { createContext } from "react"

export type UserContextType = {
  id: string | null,
  setId: (c: string) => void,
  token: string | null,
  setToken: (c: string) => void,
  sessionId: string | null,
  setSessionId: (c: string) => void
}

export const UserContext = createContext<UserContextType>({ 
  id: null,
  setId: () => {},
  token: null, 
  setToken: () => {},
  sessionId: null, 
  setSessionId: () => {} 
})
