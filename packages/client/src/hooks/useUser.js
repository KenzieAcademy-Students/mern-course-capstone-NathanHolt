import React, { createContext, useContext, useReducer, useMemo } from 'react'

const initialState = {
    name: '',
    author: '',
    created: 0,
    characters: [
        // {
        //     name: '',
        //     description: '',
        //     color: '',
        //     paths: [
        //         {
        //             name: '',
        //             description: '',
        //             start: 0,
        //             end: 0,
        //         },
        //     ]
        // },
    ],
}

export const UserContext = createContext(initialState)

UserContext.displayName = 'UserContext'

const findChar = (name) => {
    let result;
    for (let i = 0; i < state.characters.length; i++) {
        if (state.characters[i].name === name) {
            result = i;
        }
    }
    if (!result) {
        return "Character not found"
    }
}

const findPath = () => {

}

const UserReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_SET':
            console.log('loading')
            localStorage.setItem("test", "save")  

            return {
                ...state,
            }
        case 'ADD_CHARACTER':
            const { name, description, color } = action.payload
            let newChar = {
                name: name,
                description: description,
                color: color,
                paths: [],
            }
            state.characters.push(newChar)

            return {
                ...state,
            }
        case 'DELETE_CHARACTER':
            const { name } = action.payload

            // Find the right character and delete it

            return {
                ...state,
            }
        case 'EDIT_CHARACTER':
            const { name, description, color } = action.payload

            // Find the right path and save it

            let editChar = {
                name: name ? name : oldName,
                description: description ? description : oldDescription,
                color: color ? color : oldColor,
                paths: oldPaths,
            }

            // replace editChar with existing character

            return {
                ...state,
            }
        case 'ADD_PATH':
            const { character, name, description, start, end } = action.payload

            let newPath = {
                name: name,
                description: description,
                start: start,
                end: end,
            }

            //state.characters.push(newPath)

            return {
                ...state,
            }
        case 'DELETE_PATH':
            const { character, name } = action.payload

            // Find the right path and delete it

            return {
                ...state,
            }
        case 'EDIT_PATH':
            const { character, name, description, start, end } = action.payload

            // Find the right path and save it

            let editPath = {
                name: name ? name : oldName,
                description: description ? description : oldDescription,
                start: start ? start : newStart,
                end: end ? end : newEnd,
            }

            // replace editPath with the old path

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