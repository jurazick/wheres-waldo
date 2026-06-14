import { useState } from "react"
import wheresWaldoBeach from "../assets/wheres-waldo-beach.jpeg"
import TargetBox from "../components/TargetBox"

export default function Game() {
    const [box, setBox] = useState({x: 0, y: 0, show: false})



    function handleClick(e) {
        console.log(`(${e.clientX}, ${e.clientY})`)
        setBox(prev => ({x: e.clientX, y: e.clientY, show: !prev.show}))
    }

    return(
        <>
            <h1>Find Waldo</h1>
            <div className="bg-amber-400 p-5">
                <img className="cursor-crosshair" onClick={handleClick} src={wheresWaldoBeach}></img>
                {box.show && (
                    <div className={`absolute`} style={{top: box.y-100, left: box.x-50}}>
                        <TargetBox x={box.x} y={box.y} />
                    </div>
                )}
            </div>
            
        </>
    )
}