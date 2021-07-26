import { createContext } from "react"

export type UserContextType = {
  sessionId: string | null,
  setSessionId: (c: string) => void
}

export const UserContext = createContext<UserContextType>({ 
  sessionId: 'Initial value', 
  setSessionId: () => {} 
})
