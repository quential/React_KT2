import {
    useEffect,
    useState,
    type ReactNode,
} from 'react'

import {
    AuthContext,
    STORAGE_KEY,
    type User,
} from './AuthContext'

type AuthProviderProps = {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_KEY)

        if (!savedUser) return

        try {
            const parsedUser = JSON.parse(savedUser) as User
            setUser(parsedUser)
        } catch {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [])

    const login = (name: string) => {
        const newUser: User = {
            id: Date.now(),
            name: name.trim(),
        }

        setUser(newUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}