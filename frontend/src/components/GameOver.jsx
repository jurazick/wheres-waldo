import { useState } from "react"
import { api } from "../api"
import { Link } from "react-router"
import toast from "react-hot-toast"

export default function GameOver({score, roundId}) {
    const [username, setUsername] = useState("")
    const [show, setShow] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(null)

    async function submitScore() {
        setError(null)
        setSubmitting(true)
        try {
            toast.promise(
                async () => await api.submitScore(username, roundId),
                {
                    loading: 'Saving...',
                    success: 'Saved Score!',
                    error: 'Error saving!',
                }
            )
            
            setSubmitted(true)
        } catch (error) {
            setError(error.message)
        }
        setSubmitting(false)
    }

    if (!show) return(<></>)


    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                You WIN!
                </h2>

                <p className="mb-2">
                    Final score: {(score/1000).toFixed(2)}s
                </p>

                <Link className="hover:text-blue-500 text-xl font-bold mb-2" to={'/leaderboard'}>Check leaderboard ➡️</Link>

                {error && (<p>{error}</p>)}

                <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={submitted}
                className="w-full border p-2 rounded my-4"
                />

                <button
                onClick={submitScore}
                className={`w-full bg-green-700 text-white p-2 mb-4 rounded ${(!submitting && !submitted) ? "hover:bg-green-600" : "cursor-not-allowed"}`}
                disabled={submitting || submitted}
                >
                {submitted ? 'Saved' : submitting ? "Saving" : "Save"}
                </button>

                <button
                onClick={() => setShow(false)}
                className="w-full bg-gray-600 text-white p-2 mb-4 rounded hover:bg-gray-500"
                >Close
                </button>
                
                
            </div>
        </div>
    )
}