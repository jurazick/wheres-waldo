import { useEffect, useState } from "react"
import TargetBox from "../components/TargetBox"
import { api } from "../api"
import Character from "../components/Character"
import { useParams } from "react-router"
import { useGame } from "../context/GameContext"


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
        }
    }

    if (!game) return(<>Error loading</>)

    return(
        <>
            <h1>Level: {game.name}</h1>
            <div className="flex flex-row justify-center gap-5">
                {game.characters.map((character) => (
                    <div key={character.name} className="flex flex-col items-center">
                        <div className={`rounded-full border-2 ${found.includes(character.name) ? "border-green-600" : "border-black"}`}>
                            <Character imageUrl={game.imageUrl} x={character.x} y={character.y} />
                        </div>
                        <p className={`${found.includes(character.name) && "line-through"}`}>{character.name}</p>
                    </div>
                    
                ))}
            </div>
            
            <div className="flex justify-center">
                <img className="cursor-crosshair h-150" onClick={handleClick} src={game.imageUrl}></img>
                {box.show && (
                    <div className={`absolute`} style={{top: box.top-10, left: box.left-40}}>
                        <TargetBox handleSubmit={handleSubmit} characters={game.characters} />
                    </div>
                )}
            </div>
        </>
    )
}