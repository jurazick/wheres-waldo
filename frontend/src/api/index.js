const API_URL = "http://localhost:3000";

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });
    const data = await response.json();

    if (!response.ok) {
        console.log("ERRROR");
        throw new Error(data.error || "Request failed");
    }

    console.log("NO ERRROR");

    return data;
}

export const api = {
    getGames: () => request("/games"),
    validatePosition: (gameId, characterId, x, y) =>
        request(`/games/${gameId}/validate`, {
            method: "POST",
            body: JSON.stringify({ characterId, x, y }),
        }),
    startRound: (gameId) =>
        request("/round/start", {
            method: "POST",
            body: JSON.stringify({ gameId }),
        }),
    finishRound: (roundId) =>
        request("/round/finish", {
            method: "POST",
            body: JSON.stringify({ roundId }),
        }),
    getScores: () => request("/scores"),
    getGameScores: (gameId) => request(`/scores/game/${gameId}`),
    submitScore: (username, roundId) =>
        request("/scores", {
            method: "POST",
            body: JSON.stringify({ username, roundId }),
        }),
};
