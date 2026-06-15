export default function TargetBox({x = 0,y = 0}) {
    return(<>
        <div className={` text-gray-300 w-20 flex flex-col justify-center gap-2`}>
            <button className="bg-zinc-800 p-1 cursor-pointer">Waldo</button>
            <button className="bg-zinc-800 p-1 cursor-pointer">Wizard</button>
            <button className="bg-zinc-800 p-1 cursor-pointer">Odlaw</button>
        </div>
    </>)
}