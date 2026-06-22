import { useState } from "react"
import { api } from "../api"
import { Link } from "react-router"

export default function GameOver({score, roundId}) {
    const [username, setUsername] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    async function submitScore() {
        setSubmitting(true)
        try {
            await api.submitScore(username, roundId)
            setSubmitted(true)
        } catch (error) {
            console.log(error)
        }
        setSubmitting(false)
    }

    console.log(score)
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-96 shadow-lg">
                <h2 className="text-3xl font-bold mb-4">
                You WIN!
                </h2>

                <p className="mb-2">
                    Final score: {score/100}s
                </p>

                <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                />

                <button
                onClick={submitScore}
                className="w-full bg-green-600 text-white p-2 rounded"
                disabled={submitting || submitted}
                >
                {submitted ? 'Saved' : submitting ? "Saving" : "Save"}
                </button>
                {submitted && (
                    <>
                        <p>Refresh to play again!</p>
                    </>
                )}
            </div>
        </div>
    )
}