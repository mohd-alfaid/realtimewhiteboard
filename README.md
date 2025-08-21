# Realtime WhiteBoard
Realtime Whiteboard 🖌️
LIVE LINK:- https://realtimewhiteboard-xi.vercel.app/

A real-time collaborative whiteboard application that allows multiple users to draw together in a shared room. No login or registration is required, making it super easy for anyone to join and start drawing.

✨ Key Features

Freehand Drawing – Draw smoothly using HTML5 Canvas.

Customizable Tools – Adjust stroke width and color (black, red, blue, green).

Clear Canvas – Reset the canvas for all users in the room.

Real-time Cursor Tracking – See each user’s cursor live.

Active User Count – Display the number of active users in the room.

Data Persistence – Room data is stored in MongoDB.

Auto Cleanup – Rooms inactive for 24+ hours are removed automatically.

⚙️ Tech Stack

Frontend – React.js

Backend – Node.js + Express.js

Realtime Communication – Socket.io

Database – MongoDB + Mongoose

Styling – CSS

📂 Project Structure
whiteboard-app/
├── client/
│   └── src/
│       ├── components/
│       │   ├── RoomJoin.js
│       │   ├── Whiteboard.js
│       │   ├── DrawingCanvas.js
│       │   ├── Toolbar.js
│       │   └── UserCursors.js
│       └── App.js
├── server/
│   ├── models/
│   │   └── Room.js
│   ├── routes/
│   │   └── roomRoutes.js
│   ├── socket/
│   │   └── socketHandlers.js
│   └── server.js
├── .env
├── README.md
└── package.json

🛠️ Setup Instructions
Backend Setup

cd server

npm install

Create a .env file:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/


Run the server: node server.js

Frontend Setup

cd client

npm install

Start the app: npm start

🔌 Socket Events
Event Name	Description
join-room	Join a whiteboard room
cursor-move	Real-time cursor tracking
draw-start	Start of a drawing stroke
draw-move	Stroke path data
draw-end	End of a drawing stroke
clear-canvas	Clear the canvas for all users
user-count	Send number of active users

This project demonstrates simple yet effective real-time collaboration using modern web technologies.
