export default function TargetBox({handleSubmit = () => {}, characters = []}) {

    console.log(characters)

    return(<>
        <div className={` text-gray-300 text-xs w-20 flex flex-col items-center gap-2`}>
            <div className="h-6 w-6 border-green-600 border-dashed opacity-75 border-2"></div>
            {characters.map((character) => 
                <button key={character} className="bg-zinc-800 p-1 cursor-pointer w-15" onClick={() => handleSubmit(character)}>{character}</button>
            )}
        </div>
    </>)
}