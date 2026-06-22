import { useEffect, useState } from "react"
import { api } from "../api"
import { useGame } from "../context/GameContext"
import Loading from "../components/Loading"

export default function Leaderboard() {
    const {scenes} = useGame()
    const [scores, setScores] = useState(null)
    const [sceneId, setSceneId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function init() {
            try {
                const data = await api.getScores()
                setScores(data.scores)
            } catch (error) {
                console.log(error)
            }
            setLoading(false) }
        init()
    }, [])

    useEffect(() => {
        if (scenes?.length && !sceneId) {
            setSceneId(scenes[0].id);
        }
    }, [scenes, sceneId]);



    if (loading || !scenes) return(<Loading />)

    return(<>
        <div className="flex flex-col items-center p-10 mt-10 gap-5">
            <p className="text-3xl font-bold">Leaderboard</p>
            <div className="flex flex-col items-center p-10 bg-white rounded-2xl min-w-2xl">
                <select onChange={(e) => setSceneId(Number(e.target.value))} className="border-b bg-gray-200 rounded text-xl px-1 py-2 ">
                    {scenes.map(({id, name}) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </select>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-zinc-700">
                        <th className="text-left p-2">Rank</th>
                        <th className="text-left p-2">Username</th>
                        <th className="text-left p-2">Time</th>
                        </tr>
                    </thead>

                    <tbody>
                        {scores.filter(score => score.gameId === sceneId).map((score, index) => (
                        <tr key={score.id} className={`border-b border-zinc-300 ${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{score.username}</td>
                            <td className="p-2">{(score.time / 1000).toFixed(2)}s</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    </>)
}