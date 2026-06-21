import { useEffect, useState } from "react"
import TargetBox from "../components/TargetBox"
import { api } from "../api"
import Character from "../components/Character"
import { useParams } from "react-router"
import { useGame } from "../context/GameContext"
import toast from "react-hot-toast"

function timeString(seconds) {
    const m = parseInt(seconds / 60) 
    const s = seconds - (m * 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2,'0')}`
}

export default function Game() {
    const {sceneId} = useParams()
    const {scenes, loading} = useGame()
    const [box, setBox] = useState({x: 0, y: 0, top: 0, left: 0, show: false})
    const [scene, setScene] = useState(null)
    const [found, setFound] = useState([])
    const [elapsed, setElapsed] = useState(0)

    useEffect(() => {
        try {
            setScene(scenes.find(scene => scene.id === Number(sceneId)))
            setInterval(() => setElapsed(prev => prev+1), 1000)
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
        setBox(prev => ({rect,x, y, top: e.clientY, left: e.clientX, show: !prev.show}))
    }

    function handleSubmit(index) {
        setBox(prev => ({...prev, show: false}))
        if (Math.abs(box.x - scene.characters[index].x) <= 2 && Math.abs(box.y - scene.characters[index].y) <= 3) {
            setFound(prev => [...prev, scene.characters[index].name])
            toast.success(`Found ${scene.characters[index].name}!`)
        } else {
            toast.error(`Thats not ${scene.characters[index].name}!`)
        }
    }

    if (!scene) return(<>Error loading</>)

    return(
        <div className="flex flex-col items-center">
            <h1 className="my-5 text-2xl font-black">{scene.name}</h1>
                <div className="sticky top-0 z-50 bg-white p-4 shadow flex flex-row justify-center gap-5">
                    {scene.characters.map((character) => (
                        <div key={character.name} className="flex flex-col items-center">
                            <div className={`rounded-full border-2 ${found.includes(character.name) ? "border-green-600" : "border-black"}`}>
                                <Character imageUrl={scene.imageUrl} x={character.x} y={character.y} />
                            </div>
                            <p className={`${found.includes(character.name) && "line-through"}`}>{character.name}</p>
                        </div>
                    ))}
                </div>
            
            
            <div className="p-10">
                <img className="cursor-crosshair rounded-xl " onClick={handleClick} src={scene.imageUrl}></img>
                {box.show && (
                    <div className={`absolute`} style={{top: box.top-20 + scrollY, left: box.left-40 + scrollX}}>
                        <TargetBox handleSubmit={handleSubmit} characters={scene.characters} />
                    </div>
                )}
                {found.map(character => {
                    const top = (scene.characters.find(c => c.name === character).y / 100) * box.rect.height + 290
                    const left = (scene.characters.find(c => c.name === character).x / 100) * box.rect.width + 10

                    return(<div key={character} className="absolute rounded-full border-2 border-green-700" style={{top: top, left: left}}>
                        <div className="p-6 rounded-full border-green-300 border-2"></div>
                    </div>
                )})}
            </div>


                <p className="sticky bottom-5 bg-white p-2 mt-2 border-2 text-2xl font-bold rounded-2xl">{timeString(elapsed)}</p>
        </div>
    )
}