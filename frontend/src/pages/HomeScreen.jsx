import { useNavigate } from "react-router"
import { useGame } from "../context/GameContext"
import Loading from "../components/Loading"

export default function HomeScreen() {
    const navigate = useNavigate()
    const {scenes, loading} = useGame()

    if (loading) return(<>
    <Loading />
    <p className="text-center animate-pulse">Server wake up initialized, this may take 20-30s...</p>
    </>)
    return(<>
        <div className="flex flex-col items-center p-10">
            <p className="mb-10 text-3xl font-semibold ">Choose a scene</p>
            <div className="grid grid-cols-3 gap-10 mx-20">
                {scenes.map((scene) => (                    
                    <div key={scene.id} className="flex flex-col items-center gap-3">
                        <p className="text-2xl font-bold">{scene.name}</p>
                        <div onClick={() => navigate(`/scenes/${scene.id}`)} className="cursor-pointer border">
                            <div className="group relative aspect-video w-full overflow-hidden">
                                <img src={scene.imageUrl} />
                                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />
                                <button onClick={() => navigate(`/scenes/${scene.id}`)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-green-700 px-3 py-1 text-white text-xl font-bold opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-green-600">Play</button>
                            </div>
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    </>)
}