import { Link } from "react-router";

export default function Navbar() {
    return(
        <div className="flex flex-row justify-between px-12 p-6 border-b-neutral-400 border-b">
            <div className="">
                <Link to={'/'} className="font-bold text-xl">Where's Waldo?</Link>
            </div>
            <div className="">
                <Link to={'/leaderboard'}>Leaderboard</Link>
            </div>
        </div>
    )
}