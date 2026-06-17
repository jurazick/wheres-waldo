import { useState } from "react"
import wheresWaldoBeach from "../assets/wheres-waldo-beach.jpeg"
import TargetBox from "../components/TargetBox"

const COORDS = {
    "Waldo": [62, 37],
    "Wizard": [27,35],
    "Odlaw": [11, 35]
}



export default function Game() {
    const [box, setBox] = useState({x: 0, y: 0, top: 0, left: 0, show: false})

    function handleClick(e) {
        const rect = e.target.getBoundingClientRect();
        const xImage = e.clientX - rect.left
        const yImage = e.clientY - rect.top

        const x = (xImage * 100 / rect.width).toFixed(0)
        const y = (yImage * 100 / rect.height).toFixed(0)
        console.log(`(${x}, ${y})`)
        setBox(prev => ({x, y, top: e.clientY, left: e.clientX, show: !prev.show}))
    }

    function handleSubmit(character) {
        setBox(prev => ({...prev, show: false}))
        if (Math.abs(box.x - COORDS[character][0]) <= 2 && Math.abs(box.y - COORDS[character][1]) <= 3) {
            console.log(`FOUND ${character}`)
        }
    }

    return(
        <>
            <h1>Find Waldo</h1>
            <div className="bg-amber-400 p-5">
                <img className="cursor-crosshair" onClick={handleClick} src={wheresWaldoBeach}></img>
                {box.show && (
                    <div className={`absolute`} style={{top: box.top-10, left: box.left-40}}>
                        <TargetBox handleSubmit={handleSubmit} characters={Object.keys(COORDS)} />
                    </div>
                )}
            </div>
            
        </>
    )
}