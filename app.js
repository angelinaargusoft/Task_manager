require('dotenv').config({path: `${process.cwd()}/.env`})

const express = require('express')
const http = require("http");
const socketIo = require("socket.io");


const taskRoutes = require("./routes/taskRoute")
const projectRoutes = require("./routes/projectRoute")
const notificationRoutes = require("./routes/notificationRoute")
const userRoutes = require("./routes/userRoute")
const memberRoutes = require("./routes/memberRoute")
const authRoutes = require('./routes/authRoute')

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Store io in app locals so controllers/services can access it
app.set("io", io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);
  // Optional: join rooms by userId or projectId
  socket.on("join", (userId) => {
    socket.join(userId); // user-specific room
    console.log(`User ${userId} joined their room`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes)

app.get('/', (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome'
    })
})

server.listen(process.env.APP_PORT || 3000, ()=>{
    console.log('Server running on port 3000');
})