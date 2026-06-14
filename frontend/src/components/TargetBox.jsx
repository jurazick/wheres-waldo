export default function TargetBox({x = 0,y = 0}) {
    return(<>
        <div className={`bg-zinc-800 text-gray-300`}>
            <p>Target Box</p>
            <p>X: {x}</p>
            <p>Y: {y}</p>
        </div>
    </>)
}