import { createContext, useContext } from 'react'

export type User = {
    id: number
    name: string
}

type AuthContextValue = {
    user: User | null
    login: (name: string) => void
    logout: () => void
}

export const STORAGE_KEY = 'auth-user'

export const AuthContext = createContext<AuthContextValue | undefined>(
    undefined,
)

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth должен использоваться внутри AuthProvider')
    }

    return context
}