import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";


const GameContext = new createContext(null)


export default function GameProvider({children}) {
    const [scenes, setScenes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.getGames()
        .then(data => {setScenes(data.games)})
        .finally(() => setLoading(false))
    },[])

    return(
        <GameContext.Provider value={{scenes, loading}}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    return useContext(GameContext)
}