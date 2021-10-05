import React, { createContext, useContext, useReducer, useMemo } from 'react'

const initialState = {
    name: '',
    author: '',
    created: 0,
    characters: [
        {
            name: "nathan",
            description: "description",
            color: "color",
            paths: [
                {
                    name: "path",
                    description: "path description",
                    start: 12,
                    end: 14,
                },
                {
                    name: "exodus",
                    description: "path description2",
                    start: 32,
                    end: 44,
                },
            ],
        },
        {
            name: "jeff",
            description: "description2",
            color: "color2",
            paths: [
                {
                    name: "path1",
                    description: "path description",
                    start: 12,
                    end: 14,
                },
                {
                    name: "path2",
                    description: "path description",
                    start: 22,
                    end: 24,
                },
                {
                    name: "path3",
                    description: "path description",
                    start: 32,
                    end: 34,
                },
            ],
        },
    ],
}

export const UserContext = createContext(initialState)

UserContext.displayName = 'UserContext'

const findChar = (name, state) => {
    let result;
    if (!state.characters) return "Character not found"
    for (let i = 0; i < state.characters.length; i++) {
        if (state.characters[i].name === name) {
            result = i;
        }
    }
    if (result % 1 !== 0) return "Character not found"
    return result;
}

const findPath = (name, char, state) => {
    let result
    if (!state.characters[char].paths) return "Character not found"
    for (let i = 0; i < state.characters[char].paths.length; i++) {
        if (state.characters[char].paths[i].name === name) {
            result = i;
        }
    }
    if (result % 1 !== 0) return "Character not found"
    return result;
}

const UserReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_SET':
            const initialState = action.payload

            return initialState
        case 'ADD_CHARACTER':
            let newChar = {
                name: action.payload.name,
                description: action.payload.description,
                color: action.payload.color,
                paths: [],
            }
            state.characters.push(newChar)

            return {
                ...state,
            }
        case 'DELETE_CHARACTER':

            // Find the right character and delete it
            let delCharIndex = findChar(action.payload, state)
            let delCharState 

            if (delCharIndex === "Character not found") {
                delCharState = state
            } else {
                delCharState = state.characters.splice(delCharIndex, 1)
            }
            
            return delCharState;
            
        case 'EDIT_CHARACTER':

            // Find the right path and save it
            let editCharIndex = findChar(action.payload.name, state)

            let editChar = {
                name: action.payload.newName ? action.payload.newName : state.characters[editCharIndex].name,
                description: action.payload.description ? action.payload.description : state.characters[editCharIndex].description,
                color: action.payload.color ? action.payload.color : state.characters[editCharIndex].color,
                paths: state.characters[editCharIndex].paths,
            }

            // replace editChar with existing character
            let editCharState = state.characters.splice(1, editCharIndex, editChar)

            return editCharState
        case 'ADD_PATH':

            const addPathChar = findChar(action.payload.name, state)
            
            let newPath = {
                name: action.payload.title,
                description: action.payload.description,
                start: action.payload.start,
                end: action.payload.end,
            }
            
            state.characters[addPathChar].paths.push(newPath)

            return {
                ...state,
            }
        case 'DELETE_PATH':

            const delPathChar = findChar(action.payload.name, state)
            const delPathIndex = findPath(action.payload.title, delPathChar, state)

            // Find the right path and delete it
            let delPathState 

            if (delPathIndex === "Character not found") {
                delPathState = state
            } else if (delPathChar === "Character not found") {
                delPathState = state
            } else {
                delPathState = state.characters[delPathChar].paths.splice(delPathIndex, 1)
            }

            return delPathState
        case 'EDIT_PATH':

            // Find the right path and save it
            const editPathChar = findChar(action.payload.character, state)
            const pathToEditIndex = findPath(action.payload.oldName, editPathChar, state)

            let editPath = {
                name: action.payload.name ? action.payload.name : state.characters[editPathChar].paths[pathToEditIndex].name,
                description: action.payload.description ? action.payload.description : state.characters[editPathChar].paths[pathToEditIndex].description,
                start: action.payload.start ? action.payload.start : state.characters[editPathChar].paths[pathToEditIndex].start,
                end: action.payload.end ? action.payload.end : state.characters[editPathChar].paths[pathToEditIndex].end,
            }

            // replace editPath with the old path
            let editPathState = state.characters[editPathChar].paths[pathToEditIndex].splice(1, pathToEditIndex, editPath)

            return editPathState
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
        // axios call to save a story goes here
    }

    const returnState = () => {
        return state
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
            returnState,
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