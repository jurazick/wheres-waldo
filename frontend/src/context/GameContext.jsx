import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";


const GameContext = new createContext(null)


export default function GameProvider({children}) {
    const [scenes, setScenes] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function init(){
            try {
                const data = await api.getGames()
                setScenes(data.games)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        init()
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