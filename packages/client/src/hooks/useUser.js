import React, { createContext, useContext, useReducer, useMemo } from 'react'

const initialState = {
    name: '',
    author: '',
    created: 0,
    characters: [
        {
            name: '',
            description: '',
            color: '',
            paths: [
                {
                    name: '',
                    description: '',
                    start: 0,
                    end: 0,
                },
            ]
        },
    ],
}

export const UserContext = createContext(initialState)

UserContext.displayName = 'UserContext'

const UserReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_SET':
            console.log('loading')
            localStorage.setItem("test", "save")  
            return {
                ...state,
            }
        case 'ADD_CHARACTER':
            console.log(state)
            console.log(action.payload)
            return {
                ...state,
            }
        case 'DELETE_CHARACTER':
            return {
                ...state,
            }
        case 'EDIT_CHARACTER':
            return {
                ...state,
            }
        case 'ADD_PATH':
            return {
                ...state,
            }
        case 'DELETE_PATH':
            return {
                ...state,
            }
        case 'EDIT_PATH':
            return {
                ...state,
            }
        default: 
            return state
    }
}

export const UserProvider = (props) => {
    const [state, dispatch] = useReducer(UserReducer, initialState)

    const initialSet = (payload) => {
        dispatch({ type: 'INITIAL_SET', payload: payload})
    }

    const addCharacter = (payload) => {
        dispatch({ type: 'ADD_CHARACTER', payload: payload})
    }

    const deleteCharacter = (payload) => {
        dispatch({ type: 'DELETE_CHARACTER', payload: payload})
    }

    const editCharacter = (payload) => {
        dispatch({ type: 'EDIT_CHARACTER', payload: payload})
    }

    const addPath = (payload) => {
        dispatch({ type: 'ADD_PATH', payload: payload})
    }

    const deletePath = (payload) => {
        dispatch({ type: 'DELETE_PATH', payload: payload})
    }

    const editPath = (payload) => {
        dispatch({ type: 'EDIT_PATH', payload: payload})
    }

    const saveProgress = () => {
        localStorage.setItem("test", "")  
        // axios call to save a story goes here
    }

    const value = useMemo(
        () => ({
            ...state,
            initialSet,
            addCharacter,
            deleteCharacter,
            editCharacter,
            addPath,
            deletePath,
            editPath,
            saveProgress,
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