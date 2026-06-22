import { Link } from "react-router";

export default function Navbar() {
    return(
        <div className="flex flex-row justify-between items-center px-20 p-6 border-b-neutral-400 border-b">
            <div className="flex flex-row items-center gap-2">
                <p className="text-3xl">👀</p>
                <Link to={'/'} className="font-bold text-xl">Where's Waldo?</Link>
            </div>
            <div className="">
                <Link to={'/leaderboard'} className="text-xl font-semibold">Leaderboard</Link>
            </div>
        </div>
    )
}