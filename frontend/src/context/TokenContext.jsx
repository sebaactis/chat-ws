import { createContext, useState } from "react";

export const TokenContext = createContext();

// eslint-disable-next-line react/prop-types
const TokenProvider = ({ children    }) => {
    const [accessToken, setAccessToken] = useState(false)

    return (
        <TokenContext.Provider value={{accessToken, setAccessToken}}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider;