import React, { createContext, useContext, useReducer, useMemo } from 'react'

const initialState = {}

export const UserContext = createContext(initialState)

UserContext.displayName = 'UserContext'

const UserReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
            }
        default: 
            return state
    }
}

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)


    const value = useMemo(
        () => ({
            ...state,
        }),
        [state]
    )

    return <UserContext.Provider value={value} {...props} />
}

const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error('useUser must be used within a UserProvider')
    }
    return context
}

export const ManagedUserContext = ({ children }) => (
    <UserProvider>{children}</UserProvider>
)

export default useUser