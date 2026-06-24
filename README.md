# Readme

Where's Waldo is a phototagging game from The Odin Project built with a React frontend and an express REST API. It can support multiple game scenes containing characters that need to be found as well as a leaderboard system to keep track of players high-scores.

### Data Models (Prisma ORM Schema)

- Game - static data for the scene objects that the game screen reads from
- Character - static data for characters and their positions in a scene
- Round - stores the scene id of an individual game session as well as timestamps for when it was initiated and ended (how long it took for the user to find all characters)
- Score - contains scores of anonymous users, score is derived from the game round data

### Backend

Express server running on nodejs
Modules: express, cors, prisma, pg
The backend structure is simple and straightforward, it is mainly used to send requests to the postgresql db through the Prisma ORM.
Endpoints:

- Scenes
    - GET /games
    - POST /games/:gameId/validate
- Rounds
    - POST /round/start
    - POST /round/finish
- Scores
    - GET /scores
    - GET /scores/game/:gameId
    - POST /scores

### Frontend

React on Vite
Modules: react-dom, tailwindcss, react-hot-toast
The frontend site has 3 main pages for the home screen, game screen, and the leaderboard. React Router is used to define paths and which pages are rendered on those paths. The GameContext wraps around the entire app and it is responsible for fetching all the scene data from the express backend. API calls are made through the index.js file in the api folder which exports all functions that are used to fetch scenes, start game rounds, save scores, etc.

Pages:

- HomeScreen.jsx
    - render scene thumbnails and names that point to corresponding paths with scene ids for the game page
- Game.jsx
    - render the image and character bubbles derived from the scene object
    - send request to backend to start and end rounds
    - validate user's input based on the character positions from the scene object
    - check if all characters are found and show the overlay for users to submit scores
    - react-hot-toast used to provide feedback for user input
- Leaderboard.jsx
    - show dropdown to select scenes
    - send request to get score data from backend
    - render scores for the selected map in a table format
