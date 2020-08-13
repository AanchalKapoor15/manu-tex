import { createContext, useContext } from "react";
import { getMaxListeners } from "cluster";

interface authToken {
    token: Token;
    setToken: () => void;
}

interface Token {
    userName: string;
    password: string;
}

const tokens = 
    {
        token: {
            userName: 'aanchal.kapoor878@gmail.com',
            password: 'Password123'
        }
    } as authToken;


export const AuthContext = createContext(tokens);

export function useAuth(){
    return useContext(AuthContext);
}
    