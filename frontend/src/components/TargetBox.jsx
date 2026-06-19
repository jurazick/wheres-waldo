export default function TargetBox({handleSubmit = () => {}, characters = []}) {


    return(<>
        <div className={` text-gray-300 text-xs w-20 flex flex-col items-center gap-2`}>
            <div className="h-6 w-6 rounded-full border-teal-500 border-3 border-dashed"></div>
            {characters.map((character, index) => 
                <button key={character.name} className="bg-zinc-800 p-1 cursor-pointer w-15" onClick={() => handleSubmit(index)}>{character.name}</button>
            )}
        </div>
    </>)
}