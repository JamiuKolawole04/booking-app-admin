import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

const authContext = createContext(INITIAL_STATE);

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user])

    return (
        <authContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                dispatch
            }}
        >
            {children}

        </authContext.Provider>
    )
}


export { INITIAL_STATE, authContext, AuthContextProvider }