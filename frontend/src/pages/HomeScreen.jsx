import { Link } from "react-router"
import { useGame } from "../context/GameContext"

export default function HomeScreen() {
    const {scenes, loading} = useGame()

    if (loading) return(<>Loading</>)
    return(<>
        <div className="flex flex-col items-center p-10">
            <p>Choose a scene</p>
            <div className="flex flex-row gap-5">
                {scenes.map((scene) => (                    
                    <div key={scene.id} className="border">
                        <img src={scene.imageUrl} />
                        <Link to={`/scenes/${scene.id}`}>{scene.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    </>)
}