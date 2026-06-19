import { useEffect, useState } from "react"
import TargetBox from "../components/TargetBox"
import { api } from "../api"
import Character from "../components/Character"
import { useParams } from "react-router"
import { useGame } from "../context/GameContext"
import toast from "react-hot-toast"


export default function Game() {
    const {sceneId} = useParams()
    const {scenes, loading} = useGame()
    const [box, setBox] = useState({x: 0, y: 0, top: 0, left: 0, show: false})
    const [game, setGame] = useState(null)
    const [found, setFound] = useState([])

    useEffect(() => {
        try {
            setGame(scenes.find(scene => scene.id === Number(sceneId)))
        } catch(err) {
            console.log(err)
        }
        
    }, [scenes, sceneId])

    function handleClick(e) {
        const rect = e.target.getBoundingClientRect();
        const xImage = e.clientX - rect.left
        const yImage = e.clientY - rect.top

        const x = (xImage * 100 / rect.width).toFixed(0)
        const y = (yImage * 100 / rect.height).toFixed(0)
        console.log(`(${x}, ${y})`)
        setBox(prev => ({x, y, top: e.clientY, left: e.clientX, show: !prev.show}))
    }

    function handleSubmit(index) {
        setBox(prev => ({...prev, show: false}))
        if (Math.abs(box.x - game.characters[index].x) <= 2 && Math.abs(box.y - game.characters[index].y) <= 3) {
            setFound(prev => [...prev, game.characters[index].name])
            toast.success(`Found ${game.characters[index].name}!`)
        } else {
            toast.error(`Thats not ${game.characters[index].name}!`)
        }
    }

    if (!game) return(<>Error loading</>)

    return(
        <div className="flex flex-col items-center">
            <h1 className="my-5 text-2xl font-black">Level: {game.name}</h1>
                <div className="sticky top-0 z-50 bg-white p-4 shadow flex flex-row justify-center gap-5">
                    {game.characters.map((character) => (
                        <div key={character.name} className="flex flex-col items-center">
                            <div className={`rounded-full border-2 ${found.includes(character.name) ? "border-green-600" : "border-black"}`}>
                                <Character imageUrl={game.imageUrl} x={character.x} y={character.y} />
                            </div>
                            <p className={`${found.includes(character.name) && "line-through"}`}>{character.name}</p>
                        </div>
                    ))}
                </div>
            
            
            <div className="p-10">
                <img className="cursor-crosshair rounded-xl " onClick={handleClick} src={game.imageUrl}></img>
                {box.show && (
                    <div className={`absolute`} style={{top: box.top-20 + scrollY, left: box.left-40 + scrollX}}>
                        <TargetBox handleSubmit={handleSubmit} characters={game.characters} />
                    </div>
                )}
            </div>


                <p className="sticky bottom-5 bg-white p-2 mt-2 border-2 text-2xl font-bold rounded-2xl">00:00</p>
        </div>
    )
}