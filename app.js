const express= require('express');
const path=require('path');
const format=require('./utils/m');
const app=express();
const socketio=require('socket.io');
const http= require('http');

const ejsMate = require('ejs-mate');
const ejs = require('ejs');
const {usern,get, space,userl,getr}=require('./utils/roomer');


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
// app.use(express.static());
// app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(__dirname + "/public"));


const server=http.createServer(app);




const io= socketio(server);




app.get('/',(req,res)=>{
    res.render('ex');
})
app.get('/space',(req,res)=>{
    res.render('j');
})

io.on('connection',(socket)=>{



    socket.on('space',({uname,space})=>{

        const user= usern(socket.id,uname,space);

        socket.join(user.space);

        console.log('new user connected');
        socket.emit('message',format('SpaceBot','Welcome to SpaceRoom'));
    
        socket.broadcast.to(user.space).emit('message',format('SpaceBot', `${user.uname}has joined the Room`));

        io.to(user.space).emit('room',{
            space:user.space,
            users:getr(user.space)
        })
    });
   

 

socket.on('chat',(msg)=>{
    const user= get(socket.id);

io.to(user.space).emit('message',format(user.uname,msg));
})
socket.on('disconnect',()=>{
    const user=userl(socket.id);
    if(user){
        io.to(user.space).emit('message',format('SpaceBot',`${user.uname} left the Space`));

    }

    // io.to(user.space).emit('room',{
    //     space:user.space,
    //     users:getr(user.space)
    // })

    
})

    
})
server.listen(3000,()=>{
    console.log("Hi ,WELCOME");
})