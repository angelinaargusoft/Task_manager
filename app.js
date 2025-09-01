require('dotenv').config({path: `${process.cwd()}/.env`})

// const authRouter = require('./route/authRoute')
const taskRoutes = require("./routes/taskRoute")
const projectRoutes = require("./routes/projectRoute")
// const notificationRoutes = require("./route/notificationRoute")
const userRoutes = require("./routes/userRoute")
const memberRoutes = require("./routes/memberRoute")
const authRoutes = require('./routes/authRoute')

const express = require('express')
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
// app.use('/api/notifications', notificationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/members', memberRoutes)

app.get('/', (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Welcome'
    })
})

app.listen(process.env.APP_PORT, ()=>{
    console.log('Server running on port 3000');
})